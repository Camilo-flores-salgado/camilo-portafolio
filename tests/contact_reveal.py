"""
Regression test for the "Contact" scroll reveal (CLAUDE.md §7).

Contact reuses .project-reveal from Selected Work / About (same animation, no
new keyframes). Same check pattern as selected_work_reveal.py and
about_reveal.py: opacity BEFORE the section enters the viewport, opacity
after scrolling to the very bottom, and the fade span in between.

Contact is now the LAST section on the page (§9, v1 complete), so it's also
the one at risk of the "not enough trailing scroll room for the
animation-range to resolve" bug found twice before.

Run via the webapp-testing skill (or directly against a static file server
serving out/, which is what this project actually ships):
    python tests/contact_reveal.py
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

    contact = page.locator("#contact")
    box = contact.bounding_box()
    if box is None:
        fail(f"[{label}] #contact has no bounding box")

    in_viewport = box["y"] < viewport["height"]
    opacity = float(contact.evaluate("el => getComputedStyle(el).opacity"))
    if not in_viewport and opacity != 0:
        fail(
            f"[{label}] #contact is off-screen (y={box['y']}) but opacity={opacity}, "
            f"expected 0"
        )
    if in_viewport:
        print(f"  [{label}] #contact already partly in initial viewport (y={box['y']}), "
              f"skipping the pre-scroll opacity=0 assertion for this viewport")

    page.keyboard.press("End")
    page.wait_for_timeout(400)
    opacity = float(contact.evaluate("el => getComputedStyle(el).opacity"))
    if opacity < 0.99:
        fail(
            f"[{label}] #contact opacity={opacity} after scrolling to bottom, expected ~1 "
            f"-- likely not enough trailing scroll room for its animation-range to resolve"
        )

    page.evaluate("window.scrollTo(0, 0)")
    max_scroll = page.evaluate(
        "document.documentElement.scrollHeight - document.documentElement.clientHeight"
    )
    step = 20
    first_nonzero = None
    first_one = None
    for s in range(0, max_scroll + step, step):
        page.evaluate(f"window.scrollTo(0, {s})")
        o = float(contact.evaluate("el => getComputedStyle(el).opacity"))
        if o > 0 and first_nonzero is None:
            first_nonzero = s
        if o >= 0.99 and first_one is None:
            first_one = s
            break
    if first_nonzero is None or first_one is None:
        fail(f"[{label}] #contact never reached opacity ~1 while scrolling")
    span = first_one - first_nonzero
    if span < MIN_FADE_SPAN_PX:
        fail(f"[{label}] #contact fade spans only {span}px -- too short to be perceptible")
    if span > MAX_FADE_SPAN_PX:
        fail(f"[{label}] #contact fade spans {span}px -- too long, will feel sluggish")
    print(f"  [{label}] #contact fade span: {span}px")

    page.close()
    ctx.close()

    ctx_reduced = browser.new_context(reduced_motion="reduce", viewport=viewport)
    page = ctx_reduced.new_page()
    page.goto(URL)
    opacity = float(
        page.eval_on_selector("#contact", "el => getComputedStyle(el).opacity")
    )
    if opacity != 1:
        fail(f"[{label}] reduced-motion: #contact opacity={opacity} without scrolling, expected 1")
    page.close()
    ctx_reduced.close()


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        check_viewport(browser, {"width": 1280, "height": 800}, "desktop-1280")
        check_viewport(browser, {"width": 360, "height": 740}, "mobile-360")
        browser.close()
    print("PASS: contact reveal (desktop + 360px floor)")


if __name__ == "__main__":
    main()
