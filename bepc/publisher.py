"""Push site/ to gh-pages branch."""
import subprocess
import sys
from pathlib import Path

SITE_DIR = Path(__file__).parent.parent / "site"


def publish() -> None:
    if not (SITE_DIR / "index.html").exists():
        print("ERROR: site/index.html not found. Run 'bepc generate' first.")
        sys.exit(1)

    cmds = [
        ["git", "add", "--force", "--all"],
        ["git", "commit", "-m", "chore: publish site"],
        ["git", "push", "origin", "HEAD:gh-pages", "--force"],
    ]

    # Work from site/ dir using a temporary index
    env_extra = {"GIT_INDEX_FILE": str(SITE_DIR / ".git-index")}
    import os
    env = {**os.environ, **env_extra}

    # Simpler: use worktree approach via shell
    root = Path(__file__).parent.parent
    script = f"""
set -e
cd {root}
# Build a tree from site/ and push to gh-pages
TREE=$(git -C {root} hash-object -w --stdin < /dev/null)
git -C {root} read-tree --empty
git -C {root} --work-tree={SITE_DIR} add --all
TREE=$(git -C {root} write-tree)
COMMIT=$(git -C {root} commit-tree $TREE -m "chore: publish site")
git -C {root} push origin $COMMIT:refs/heads/gh-pages --force
git -C {root} read-tree HEAD  # restore index
echo "Published to gh-pages"
"""
    result = subprocess.run(["bash", "-c", script], capture_output=False)
    if result.returncode != 0:
        print("Publish failed.")
        sys.exit(1)
