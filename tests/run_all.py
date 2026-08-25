"""
Runs every regression test in this directory in sequence, against a single
already-running server on localhost:3000. Meant to be invoked through the
webapp-testing skill's server wrapper (see tests/README.md), not run bare --
the individual test scripts assume the dev server is already up.
"""

import subprocess
import sys
from pathlib import Path

TESTS = [
    "selected_work_reveal.py",
    "about_reveal.py",
    "contact_reveal.py",
]

tests_dir = Path(__file__).parent

failed = []
for name in TESTS:
    print(f"=== {name} ===")
    result = subprocess.run([sys.executable, str(tests_dir / name)])
    if result.returncode != 0:
        failed.append(name)

print()
if failed:
    print(f"FAILED: {', '.join(failed)}")
    sys.exit(1)

print(f"All {len(TESTS)} tests passed.")
