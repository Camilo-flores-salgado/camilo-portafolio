"""
Regression test for the "Selected work" scroll reveal (CLAUDE.md §7).

Catches the specific bug found in review: an off-screen project rendering at
opacity: 1 before it has scrolled into view (the fade never happens, content
just appears). Checks the pre-scroll state explicitly -- not just that
animation-timeline is present, which passed even while the visible bug was
happening.

Also catches the follow-up bug a code review turned up: the fade span was
only ever checked on the middle project at one viewport, which missed that
the LAST project's animation-range end point can be unreachable (no trailing
scroll room) and that a narrower viewport changes the "contain" range math
(content stacks taller/shorter depending on which project). Runs the full
check at desktop (1280x800) and at the 360px floor (CLAUDE.md §6/§12), and
checks the fade span on the first AND last project, not just the middle one.

Run via the webapp-testing skill:
    python .claude/skills/webapp-testing/scripts/with_server.py \
        --server "npm run dev" --port 3000 -- python tests/selected_work_reveal.py
"""

import sys
from playwright.sync_api import sync_playwright

URL = "http://localhost:3000"
MIN_FADE_SPAN_PX = 300  # below this, the fade resolves within ~one scroll gesture
MAX_FADE_SPAN_PX = 1200  # above this, the fade would feel sluggish, not broken


def fail(msg):
    print(f"FAIL: {msg}")
    sys.exit(1)


def measure_fade_span(page, nth):
    """Scroll from 0 to max and find the scroll distance over which the
    given .project-reveal item's opacity goes from >0 to >=1."""
    page.evaluate("window.scrollTo(0, 0)")
    max_scroll = page.evaluate(
        "document.documentElement.scrollHeight - document.documentElement.clientHeight"
    )
    step = 20
    first_nonzero = None
    first_one = None
    for s in range(0, max_scroll + step, step):
        page.evaluate(f"window.scrollTo(0, {s})")
        opacity = float(
            page.eval_on_selector(
                f"#work .project-reveal:nth-of-type({nth})", "el => getComputedStyle(el).opacity"
            )
        )
        if opacity > 0 and first_nonzero is None:
            first_nonzero = s
        # >=0.99, not >=1: at the exact boundary, computed opacity can land a
        # hair under 1 (e.g. 0.998) depending on sub-pixel scroll rounding.
        # Step 2 already confirms true opacity:1 is reached (native "End" key
        # + a settle wait); this loop only measures the span, so a visually
        # complete threshold is the right one, not exact float equality.
        if opacity >= 0.99 and first_one is None:
            first_one = s
            break
    if first_nonzero is None or first_one is None:
        return None
    return first_one - first_nonzero


def check_viewport(browser, viewport, label):
    # 1. Off-screen projects must start at opacity: 0 before the page is
    #    scrolled -- the exact check that would have caught the "appears
    #    immediately, no fade" bug.
    ctx = browser.new_context(reduced_motion="no-preference", viewport=viewport)
    page = ctx.new_page()
    page.goto(URL)
    page.wait_for_load_state("networkidle")

    # Scoped to #work: About also reuses the .project-reveal class (same
    # animation, no duplicated keyframes) -- an unscoped selector here would
    # count About's section too and throw off "first"/"last" indexing.
    items = page.locator("#work .project-reveal")
    count = items.count()
    if count == 0:
        fail(f"[{label}] no #work .project-reveal elements found")

    for i in range(count):
        el = items.nth(i)
        box = el.bounding_box()
        if box is None:
            fail(f"[{label}] project {i}: no bounding box")
        in_viewport = box["y"] < viewport["height"]
        opacity = float(el.evaluate("el => getComputedStyle(el).opacity"))
        if not in_viewport and opacity != 0:
            fail(
                f"[{label}] project {i} is off-screen (y={box['y']}) but opacity={opacity}, "
                f"expected 0 -- the reveal is not hiding content before it scrolls in"
            )

    # 2. After scrolling to the bottom, every project must end at
    #    opacity: 1 -- content is never permanently stuck invisible. This is
    #    the check that caught the "last item stuck at 0.93" bug.
    page.keyboard.press("End")
    page.wait_for_timeout(400)
    for i in range(count):
        opacity = float(items.nth(i).evaluate("el => getComputedStyle(el).opacity"))
        # >=0.99, not ==1: sub-pixel scroll rounding can land a hair under 1
        # (e.g. 0.9994) even at true max scroll -- visually indistinguishable
        # from fully revealed. A real "not enough room" bug lands far below
        # this (the original bug measured 0.928).
        if opacity < 0.99:
            fail(
                f"[{label}] project {i} opacity={opacity} after scrolling to bottom, expected "
                f"~1 -- likely not enough trailing scroll room for its animation-range to resolve"
            )

    # 3. The fade must span a meaningful, but not excessive, scroll distance.
    #    Checked on the FIRST and LAST project specifically: the first is
    #    typically already partly in view at load, the last is the one that
    #    can run out of trailing scroll room -- both are the edge cases that
    #    hid real bugs before.
    for nth, project_label in [(1, "first"), (count, "last")]:
        span = measure_fade_span(page, nth)
        if span is None:
            fail(f"[{label}] {project_label} project (nth={nth}) never reached opacity 1")
        if span < MIN_FADE_SPAN_PX:
            fail(
                f"[{label}] {project_label} project fade spans only {span}px -- "
                f"too short to be perceptible during normal scrolling"
            )
        if span > MAX_FADE_SPAN_PX:
            fail(
                f"[{label}] {project_label} project fade spans {span}px -- "
                f"too long, will feel sluggish rather than a reveal"
            )
        print(f"  [{label}] {project_label} project fade span: {span}px")

    page.close()
    ctx.close()

    # 4. Reduced motion: no scrolling at all, everything must already be
    #    visible.
    ctx_reduced = browser.new_context(reduced_motion="reduce", viewport=viewport)
    page = ctx_reduced.new_page()
    page.goto(URL)
    items = page.locator("#work .project-reveal")
    for i in range(items.count()):
        opacity = float(items.nth(i).evaluate("el => getComputedStyle(el).opacity"))
        if opacity != 1:
            fail(
                f"[{label}] reduced-motion: project {i} opacity={opacity} without "
                f"scrolling, expected 1"
            )
    page.close()
    ctx_reduced.close()


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        check_viewport(browser, {"width": 1280, "height": 800}, "desktop-1280")
        check_viewport(browser, {"width": 360, "height": 740}, "mobile-360")

        browser.close()

    print("PASS: selected work reveal (desktop + 360px floor)")


if __name__ == "__main__":
    main()
