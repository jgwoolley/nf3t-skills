---
name: use-clis-first
description: Prefer installed, authenticated CLIs (gh, glab, docker, dotnet, mvn, gradle, pnpm, playwright) over web fetching, raw API calls, scraping or MCP for the same job. Use before reaching for WebFetch, curl against an API, or a browser when a CLI could do it.
---

# CLIs first

If a CLI that covers the task is installed and configured, use it. Order of preference:
**configured CLI → CLI with a missing login (ask the user to log in) → MCP/API → web fetch.**

| Task | Use |
| --- | --- |
| GitHub issues, PRs, releases, CI runs, repo info, raw API | `gh` (`gh pr view`, `gh run watch`, `gh api`) |
| GitLab MRs, issues, pipelines | `glab` (`glab mr view`, `glab ci status`, `glab api`) |
| Containers, logs, networks | `docker`, `docker compose` |
| Build/test | `mvn`, `gradle`, `dotnet`, `pnpm`/`npm` as the project defines |
| Look at a running web page | `verify-web` skill (headless Chromium via Playwright) |

Check once per session: `gh auth status`, `glab auth status`. If a tool is unauthenticated, tell the user to run
`! gh auth login` / `! glab auth login` instead of falling back to unauthenticated scraping.
Pick `gh` or `glab` from the `origin` remote host. Never put tokens in URLs or commit them.
