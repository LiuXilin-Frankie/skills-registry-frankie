# Open Skill Registry

A deliberately small, curated registry of open-source Agent Skills hosted on GitHub. This repository stores metadata and installation instructions only; it does not vendor or modify upstream skill files.

## Principles

- GitHub-hosted and open source only.
- Install one named skill without installing the rest of its source repository.
- Support GitHub Copilot, Codex, Claude Code, and Cursor by default.
- Use the open-source [`skills` CLI](https://github.com/vercel-labs/skills) through `npx`.
- Install into the current repository only, never into a user-level directory.

## Skills

| Skill | What it does | Source | Version | License |
| --- | --- | --- | --- | --- |
| [`agents-md`](https://github.com/getsentry/skills/tree/main/skills/agents-md) | Creates and maintains concise, reference-backed `AGENTS.md` and `CLAUDE.md` files. | [`getsentry/skills`](https://github.com/getsentry/skills) | `main` (rolling) | [Apache-2.0](https://github.com/getsentry/skills/blob/main/LICENSE) |
| [`code-simplifier`](https://github.com/getsentry/skills/tree/main/skills/code-simplifier) | Simplifies recently modified code for clarity, consistency, and maintainability while preserving behavior. | [`getsentry/skills`](https://github.com/getsentry/skills) | `main` (rolling) | [Apache-2.0](https://github.com/getsentry/skills/blob/main/LICENSE) |
| [`writing-great-skills`](https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-great-skills) | Reference for writing and editing predictable skills. | [`mattpocock/skills`](https://github.com/mattpocock/skills) | `main` (rolling) | [MIT](https://github.com/mattpocock/skills/blob/main/LICENSE) |
| [`code-review`](https://github.com/mattpocock/skills/tree/main/skills/engineering/code-review) | Reviews code changes against repository standards and the originating specification in parallel. | [`mattpocock/skills`](https://github.com/mattpocock/skills) | `main` (rolling) | [MIT](https://github.com/mattpocock/skills/blob/main/LICENSE) |
| [`setup-matt-pocock-skills`](https://github.com/mattpocock/skills/tree/main/skills/engineering/setup-matt-pocock-skills) | Configures a project's issue tracker and domain documentation for engineering skills such as `code-review`; configures triage labels only when `triage` is installed. | [`mattpocock/skills`](https://github.com/mattpocock/skills) | `main` (rolling) | [MIT](https://github.com/mattpocock/skills/blob/main/LICENSE) |

The machine-readable source of truth is [`skills.json`](./skills.json). A rolling version follows its declared branch; `verifiedAt` records the last manual source check.

See the [skill map](./skill_maps.md) for task-oriented guidance on using these skills. This repository maintains one skill, or one series of skills, for one or more tasks.

## Install

Install or update every registered skill for GitHub Copilot, Codex, Claude Code, and Cursor:

```bash
# Install into the current repository
npm run install:all

# Install into a specific repository
npm run install:all -- --target /path/to/repository

# Preview without changing files
npm run install:all:dry-run
```

The target directory must already exist; quote paths with spaces. Installation is project-scoped, non-interactive, and overwrites existing skill files. Use `-t` as the short form of `--target`.

To install only `code-simplifier`, run this command from the target project directory:

```bash
npx skills add https://github.com/getsentry/skills --skill code-simplifier --agent github-copilot --agent codex --agent claude-code --agent cursor --copy --yes
```

To install only `setup-matt-pocock-skills`, run this command from the target project directory:

```bash
npx skills add https://github.com/mattpocock/skills --skill setup-matt-pocock-skills --agent github-copilot --agent codex --agent claude-code --agent cursor --copy --yes
```

### First use of code-review

Installation makes the setup skill available; it does not run initialization. Before first using `code-review` in a target project, explicitly invoke `setup-matt-pocock-skills` there (for example, `/setup-matt-pocock-skills` in agents supporting slash commands), unless equivalent issue-tracker configuration is already available.

The [upstream setup workflow](https://github.com/mattpocock/skills/blob/main/skills/engineering/setup-matt-pocock-skills/SKILL.md) asks where requirements are tracked, prepares `docs/agents/issue-tracker.md` and `docs/agents/domain.md`, and adds pointers to `AGENTS.md` or `CLAUDE.md`. GitHub uses `gh`, GitLab uses `glab`, and local Markdown is also supported. Triage label setup is skipped when `triage` is not installed. This registry selects setup as one named skill; its bundled templates come with it.

`code-review` also requires an agent capable of running parallel sub-agents. If no spec is available, its workflow permits skipping the Spec review and reporting that omission.

## Agent targets

| Agent | CLI identifier | Project directory | Status |
| --- | --- | --- | --- |
| Codex | `codex` | `.agents/skills` | Required |
| Claude Code | `claude-code` | `.claude/skills` | Required |
| GitHub Copilot | `github-copilot` | `.agents/skills` | Required |
| Cursor | `cursor` | `.agents/skills` | Required |

The machine-readable target configuration is [`agents.json`](./agents.json).

## Admission criteria

A registry entry must:

1. Point to a public GitHub repository with an identifiable open-source license.
2. Point to a directory containing a valid `SKILL.md`.
3. Provide an `npx skills add ... --skill <name>` command that selects only that skill.
4. Work at project scope with GitHub Copilot, Codex, Claude Code, and Cursor.
5. Record a tag or branch and the date on which the source was verified.
6. Preserve the upstream repository, path, version, license, and installation command without copying its skill files here.

To propose a skill, edit `skills.json` and add the corresponding human-readable row and installation example to this README. The one-click installer reads the registry automatically, so no script change is needed.

## Validation

Requires Node.js 18 or newer and has no package dependencies:

```bash
npm run check
```

The check validates the documented file layout, JSON syntax, required registry fields, GitHub-only sources, the four-agent default preset, and the repo-only overwrite policy.

## Security

Skills may contain executable scripts or instructions that invoke tools. Inclusion here confirms source and metadata review, not a security guarantee. Review the upstream skill and its referenced files before installation.

## License

Registry metadata and documentation are available under the MIT License. Each listed skill remains under its upstream license.

Copyright (c) 2026 Open Skill Registry contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
