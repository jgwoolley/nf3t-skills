# nf3t-skills

Claude Code plugin marketplace with one plugin, `devbox`: the skills I want in every project.

| Skill | Purpose |
| --- | --- |
| `build-footer` | "Built 3 seconds ago" footer linking to the commit on GitHub/GitLab |
| `privacy-by-default` | Local processing, no third parties, CSP, telemetry opt-outs |
| `use-clis-first` | Use `gh`/`glab`/`docker`/... before web fetch or APIs |
| `verify-web` | Headless Chromium check: screenshot, console errors, external hosts |
| `new-project` | Scaffold with all of the above and Traefik labels |

## Install (once per devbox home volume)

```console
claude plugin marketplace add ~/workspace/ai-skills   # this checkout (the folder keeps its old name)
claude plugin install devbox@nf3t-skills
ln -s ~/workspace/ai-skills/user-claude.md ~/.claude/CLAUDE.md   # standing rules, loaded in every project
```

Edit a skill here, then `claude plugin marketplace update nf3t-skills` (or restart Claude) to pick it up.
`down.sh` deletes the home volume, so repeat the install afterwards.
