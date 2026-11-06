# Standing rules (apply to every project)

- Never commit (or push, tag, amend) changes. Leave edits uncommitted in the working tree; the user commits. Say what changed instead.
- Any website gets the commit-linked "Built <time ago>" footer: use the `build-footer` skill (GitHub or GitLab link).
- Private by default: process in the browser when possible, no third-party requests, telemetry off: use `privacy-by-default`.
- Prefer installed, configured CLIs (`gh`, `glab`, `docker`, ...) over web fetch, raw API calls or MCP: `use-clis-first`.
- Check web work in headless Chromium before calling it done: `verify-web`.
- Local URLs are plain HTTP `http://<project>.localhost` behind the devbox Traefik (one login for all pages); never add TLS or run a second Traefik.
- create a commit.sh file and keep it up to date with a very high level summary of that have been made since last commit.
