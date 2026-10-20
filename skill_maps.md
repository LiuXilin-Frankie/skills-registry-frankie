# Skill Map

This file maps common tasks to the skills used to perform them.

- Use one primary skill per task.
- Include only frequently performed tasks.

## Task List

1. Maintain agent instruction files
2. Write skills and agent-facing documents
3. Review code changes
4. Simplify code

### 1. Maintain agent instruction files

- Skill: `agents-md`
- Notes: First attempts to condense `AGENTS.md` to 60 lines. This may remove some original content.

### 2. Write skills and agent-facing documents

- Skill: `writing-for-agents`
- Notes: Covers skills, `AGENTS.md`, `CLAUDE.md`, and other documents agents read. Skill-specific mechanics are bundled in `SKILL-MECHANICS.md`.

### 3. Review code changes

- Skill: `code-review`
- First-use setup: Explicitly run `setup-matt-pocock-skills` once in the target project before review, unless equivalent issue-tracker configuration is already available. Installing the skill does not run setup.
- Setup source: [setup-matt-pocock-skills](https://github.com/mattpocock/skills/blob/main/skills/engineering/setup-matt-pocock-skills/SKILL.md)
- Setup scope: Configures the issue tracker and domain documentation pointers. Triage labels are skipped when `triage` is not installed.
- Requirements: Parallel sub-agent support and access to the configured tracker (`gh` for GitHub, `glab` for GitLab, or local Markdown files).
- Notes: Compares changes with both repository standards and the originating specification.
- Missing specification: Skip the Spec review and report that no specification is available.

### 4. Simplify code

- Skill: `code-simplifier`
- Source: [getsentry/skills](https://github.com/getsentry/skills/blob/main/skills/code-simplifier/SKILL.md)
- Notes: Improves readability and maintainability while preserving behavior. Defaults to recently modified code unless a broader scope is requested.
- Python usage: Upstream includes JS/TS/React-specific conventions and references `CLAUDE.md`. When using it for Python, explicitly follow the project's Python conventions and tool configuration, disregard language-specific rules that do not apply, and preserve interfaces, exception behavior, and results. Verify changes with the project's relevant checks and tests.
- Example prompt: "Use code-simplifier to simplify the Python code changed in this session. Follow this project's Python conventions and tool configuration, ignore JS/TS/React-only rules, and preserve public interfaces, exception behavior, and results."
