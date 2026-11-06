---
name: build-footer
description: Add the standard "Built 3 seconds ago" footer, linking to the commit on GitHub or GitLab, to any website or web app. Use whenever creating or modifying a website, static site, or web UI.
---

# Build footer

Every website ends with a small footer: **Built <relative time>**, where the text links to the exact commit
(GitHub `/commit/<sha>`, GitLab `/-/commit/<sha>`). It must work with no network calls and no third-party scripts.

## Steps
1. Put `footer.snippet.html` (this skill's directory) at the end of the page `<body>` (or into the layout/template/component).
   It is self-contained: markup, tiny CSS and ~15 lines of JS using `Intl.RelativeTimeFormat`.
2. Fill in the placeholders at **build time**, never at runtime, with `inject.sh`:
   `bash <skill-dir>/inject.sh <built-file.html> [more files...]`
   It replaces `__BUILD_TIME__` (ISO, now), `__COMMIT_SHA__` and `__COMMIT_URL__`.
   Wire it into the project's build script (`package.json` `build` step, Makefile, Dockerfile, CI) so every build refreshes it.
   For frameworks with env/define support, use `bash <skill-dir>/commit-info.sh` (prints `KEY=value` lines) instead.
3. The remote is read from `origin`: ssh and https forms are normalised, credentials are stripped. Host names containing
   `gitlab` use the GitLab URL form, everything else the GitHub form. If there is no remote yet, the link falls back to
   plain text and the sha; say so to the user. The link points at the latest commit that exists, so uncommitted work is not in it.
   Never commit to make the link current: leave that to the user.
4. Check it: `verify-web` skill, confirm the footer text is not a placeholder and the link resolves to a real commit.

Keep the styling minimal and inherit the site's colours. Do not add analytics, fonts or libraries for this.
