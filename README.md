# Open Skill Registry

A deliberately small, curated registry of open-source Agent Skills hosted on GitHub. This repository stores metadata and installation instructions only; it does not vendor or modify upstream skill files.

## Principles

- GitHub-hosted and open source only.
- Install one named skill without installing the rest of its source repository.
- Support Codex, Claude Code, and GitHub Copilot; optionally support Cursor.
- Use the open-source [`skills` CLI](https://github.com/vercel-labs/skills) through `npx`.
- Install into the current repository only, never into a user-level directory.

## Skills

| Skill | What it does | Source | Version | License |
| --- | --- | --- | --- | --- |
| [`agents-md`](https://github.com/getsentry/skills/tree/main/skills/agents-md) | Creates and maintains concise, reference-backed `AGENTS.md` and `CLAUDE.md` files. | [`getsentry/skills`](https://github.com/getsentry/skills) | `main` (rolling) | [Apache-2.0](https://github.com/getsentry/skills/blob/main/LICENSE) |
| [`writing-great-skills`](https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-great-skills) | Reference for writing and editing predictable skills. | [`mattpocock/skills`](https://github.com/mattpocock/skills) | `main` (rolling) | [MIT](https://github.com/mattpocock/skills/blob/main/LICENSE) |

The machine-readable source of truth is [`skills.json`](./skills.json). A rolling version follows its declared branch; `verifiedAt` records the last manual source check.

look [skill_map](./skill_map.md) file for how to use these skills. this repo will only maintain 1 skill/ 1 series skills for 1 or several tasks.

## Install

### `agents-md`

Interactive project installation:

```bash
npx skills add https://github.com/getsentry/skills --skill agents-md
```

Install for the three required agents:

```bash
npx skills add https://github.com/getsentry/skills \
  --skill agents-md \
  --agent codex \
  --agent claude-code \
  --agent github-copilot \
  --copy \
  --yes
```

Install for the required agents plus Cursor:

```bash
npx skills add https://github.com/getsentry/skills \
  --skill agents-md \
  --agent codex \
  --agent claude-code \
  --agent github-copilot \
  --agent cursor \
  --copy \
  --yes
```

### `writing-great-skills`

Interactive project installation:

```bash
npx skills add https://github.com/mattpocock/skills --skill writing-great-skills
```

Install for the three required agents:

```bash
npx skills add https://github.com/mattpocock/skills \
  --skill writing-great-skills \
  --agent codex \
  --agent claude-code \
  --agent github-copilot \
  --copy \
  --yes
```

Install for the required agents plus Cursor:

```bash
npx skills add https://github.com/mattpocock/skills \
  --skill writing-great-skills \
  --agent codex \
  --agent claude-code \
  --agent github-copilot \
  --agent cursor \
  --copy \
  --yes
```

The `skills` CLI uses project scope by default. Registry commands must not include `-g` or `--global`. `--copy` avoids relying on repository symlinks across operating systems.

## Agent targets

| Agent | CLI identifier | Project directory | Status |
| --- | --- | --- | --- |
| Codex | `codex` | `.agents/skills` | Required |
| Claude Code | `claude-code` | `.claude/skills` | Required |
| GitHub Copilot | `github-copilot` | `.agents/skills` | Required |
| Cursor | `cursor` | `.agents/skills` | Optional |

The machine-readable target configuration is [`agents.json`](./agents.json).

## Admission criteria

A registry entry must:

1. Point to a public GitHub repository with an identifiable open-source license.
2. Point to a directory containing a valid `SKILL.md`.
3. Provide an `npx skills add ... --skill <name>` command that selects only that skill.
4. Work at project scope with Codex, Claude Code, and GitHub Copilot.
5. Record a tag or branch and the date on which the source was verified.
6. Preserve the upstream repository, path, version, license, and installation command without copying its skill files here.

To propose a skill, edit `skills.json` and add the corresponding human-readable row and installation example to this README. Keep the repository limited to the four documented files.

## Validation

Requires Node.js 18 or newer and has no package dependencies:

```bash
npm run check
```

The check validates the four-file layout, JSON syntax, required registry fields, GitHub-only sources, known agent presets, and the repo-only installation policy.

## Security

Skills may contain executable scripts or instructions that invoke tools. Inclusion here confirms source and metadata review, not a security guarantee. Review the upstream skill and its referenced files before installation.

## License

Registry metadata and documentation are available under the MIT License. Each listed skill remains under its upstream license.

Copyright (c) 2026 Open Skill Registry contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
