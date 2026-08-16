"""
Regression test for the "About" scroll reveal (CLAUDE.md §7).

About reuses .project-reveal from Selected Work (same animation, no new
keyframes). This checks the exact thing the Selected Work bug taught us to
check: opacity BEFORE the section enters the viewport, not just that
animation-timeline is present.

About is currently the LAST section on the page (Contact isn't built yet),
so it's also the one at risk of the "not enough trailing scroll room for the
animation-range to resolve" bug found in Selected Work's last project.

Run via the webapp-testing skill:
    python .claude/skills/webapp-testing/scripts/with_server.py \
        --server "npm run dev" --port 3000 -- python tests/about_reveal.py
"""

import sys
from playwright.sync_api import sync_playwright

URL = "http://localhost:3000"
MIN_FADE_SPAN_PX = 300
MAX_FADE_SPAN_PX = 1200


def fail(msg):
    print(f"FAIL: {msg}")
    sys.exit(1)


def check_viewport(browser, viewport, label):
    ctx = browser.new_context(reduced_motion="no-preference", viewport=viewport)
    page = ctx.new_page()
    page.goto(URL)
    page.wait_for_load_state("networkidle")

    about = page.locator("#about")
    box = about.bounding_box()
    if box is None:
        fail(f"[{label}] #about has no bounding box")

    # 1. Off-screen at load -> opacity: 0 before it's checked.
    in_viewport = box["y"] < viewport["height"]
    opacity = float(about.evaluate("el => getComputedStyle(el).opacity"))
    if not in_viewport and opacity != 0:
        fail(
            f"[{label}] #about is off-screen (y={box['y']}) but opacity={opacity}, "
            f"expected 0"
        )
    if in_viewport:
        print(f"  [{label}] #about already partly in initial viewport (y={box['y']}), "
              f"skipping the pre-scroll opacity=0 assertion for this viewport")

    # 2. Scroll to the very bottom -> must reach opacity: 1, never stuck.
    page.keyboard.press("End")
    page.wait_for_timeout(400)
    opacity = float(about.evaluate("el => getComputedStyle(el).opacity"))
    # >=0.99, not ==1: sub-pixel scroll rounding can land a hair under 1 even
    # at true max scroll -- see the identical note in selected_work_reveal.py.
    if opacity < 0.99:
        fail(
            f"[{label}] #about opacity={opacity} after scrolling to bottom, expected ~1 "
            f"-- likely not enough trailing scroll room for its animation-range to resolve"
        )

    # 3. Fade must span a real, but not excessive, scroll distance.
    page.evaluate("window.scrollTo(0, 0)")
    max_scroll = page.evaluate(
        "document.documentElement.scrollHeight - document.documentElement.clientHeight"
    )
    step = 20
    first_nonzero = None
    first_one = None
    for s in range(0, max_scroll + step, step):
        page.evaluate(f"window.scrollTo(0, {s})")
        o = float(about.evaluate("el => getComputedStyle(el).opacity"))
        if o > 0 and first_nonzero is None:
            first_nonzero = s
        if o >= 0.99 and first_one is None:
            first_one = s
            break
    if first_nonzero is None or first_one is None:
        fail(f"[{label}] #about never reached opacity ~1 while scrolling")
    span = first_one - first_nonzero
    if span < MIN_FADE_SPAN_PX:
        fail(f"[{label}] #about fade spans only {span}px -- too short to be perceptible")
    if span > MAX_FADE_SPAN_PX:
        fail(f"[{label}] #about fade spans {span}px -- too long, will feel sluggish")
    print(f"  [{label}] #about fade span: {span}px")

    page.close()
    ctx.close()

    # 4. Reduced motion: visible immediately, no scrolling required.
    ctx_reduced = browser.new_context(reduced_motion="reduce", viewport=viewport)
    page = ctx_reduced.new_page()
    page.goto(URL)
    opacity = float(
        page.eval_on_selector("#about", "el => getComputedStyle(el).opacity")
    )
    if opacity != 1:
        fail(f"[{label}] reduced-motion: #about opacity={opacity} without scrolling, expected 1")
    page.close()
    ctx_reduced.close()


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        check_viewport(browser, {"width": 1280, "height": 800}, "desktop-1280")
        check_viewport(browser, {"width": 360, "height": 740}, "mobile-360")
        browser.close()
    print("PASS: about reveal (desktop + 360px floor)")


if __name__ == "__main__":
    main()
