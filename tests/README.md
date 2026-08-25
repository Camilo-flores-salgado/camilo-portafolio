# Tests

Regression tests for the scroll-reveal animation (`.project-reveal`, CLAUDE.md §7). Native Playwright Python, no test runner or extra dependencies — same convention as the `webapp-testing` skill.

## Running

```
npm run test:e2e
```

Starts `next dev` on port 3000, waits for it to be ready, runs all three tests in sequence via `tests/run_all.py`, then tears the server down. Exits non-zero if any test fails.

To run a single test against a server you already have running on `localhost:3000`:

```
python tests/selected_work_reveal.py
```

## What each test checks

- **`selected_work_reveal.py`** — each project fades in on scroll (not visible at `opacity: 1` before entering the viewport). Runs at desktop (1280×800) and the 360px floor, checking the fade span on the first *and* last project (the last one is the one at risk of running out of trailing scroll room for the animation range to resolve).
- **`about_reveal.py`** — same reveal check for the About section, which reuses `.project-reveal`.
- **`contact_reveal.py`** — same reveal check for Contact, the last section on the page (same trailing-scroll-room risk as the last project above).

All three also check the `prefers-reduced-motion` case: content must render fully visible with no animation (CLAUDE.md §7).
