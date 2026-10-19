# skill maps
This file is the skill map for different tasks.
+ 1 task 1 skill
+ only high-frequency task will be contained

## Task List
1. edit agents
2. write skills
3. review code changes
4. simplify code


### 1. edit agents
- skill: agents-md
- notes: will try to compress the agent.md file into 60 lines firstly. This may loss your original content

### 2. write skills
- skill: writing-great-skills

### 3. review code changes
- skill: code-review
- first-use setup: explicitly run `setup-matt-pocock-skills` once in the target project before review, unless equivalent issue-tracker configuration is already available; installing the skill does not run setup
- setup source: [setup-matt-pocock-skills](https://github.com/mattpocock/skills/blob/main/skills/engineering/setup-matt-pocock-skills/SKILL.md)
- setup scope: configures the issue tracker and domain documentation pointers; triage labels are skipped when `triage` is not installed
- requirements: parallel sub-agent support; access to the configured tracker (`gh` for GitHub, `glab` for GitLab, or local Markdown files)
- notes: compares changes with both repository standards and the originating specification
- no spec: skip the Spec review and report that no spec is available

### 4. simplify code
- skill: code-simplifier
- source: [getsentry/skills](https://github.com/getsentry/skills/blob/main/skills/code-simplifier/SKILL.md)
- notes: improves readability and maintainability while preserving behavior; defaults to recently modified code unless a broader scope is requested
- Python usage: upstream includes JS/TS/React-specific conventions and references `CLAUDE.md`. When using it for Python, explicitly follow the project's Python conventions and tool configuration, disregard language-specific rules that do not apply, and preserve interfaces, exception behavior, and results. Verify changes with the project's relevant checks and tests.
- example prompt: "Use code-simplifier to simplify the Python code changed in this session. Follow this project's Python conventions and tool configuration, ignore JS/TS/React-only rules, and preserve public interfaces, exception behavior, and results."
