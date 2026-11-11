# Skill Map

This file maps common tasks to the skills used to perform them. For sources, versions, licenses, and installation commands, use [skills.json](skills.json). Follow the [installation workflow](docs/installation.md) when installing or updating skills.

- Use one primary skill per task.
- Include only frequently performed tasks.

## Task List

1. Maintain agent instruction files
2. Write skills and agent-facing documents
3. Review code changes
4. Simplify code
5. Plot training and evaluation curves
6. Document options trading models
7. Stress-test plans and clarify decisions
8. Learn and assess quantitative concepts
9. Restructure requirements and design documents
10. Audit specification and code consistency

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
- Setup scope: Asks where requirements are tracked, prepares `docs/agents/issue-tracker.md` and `docs/agents/domain.md`, and adds pointers to `AGENTS.md` or `CLAUDE.md` in the target project. Triage labels are skipped when `triage` is not installed. Local Markdown requirements are supported alongside GitHub and GitLab. The registry installs setup as one named skill, including its bundled templates; installation does not run initialization.
- Requirements: Parallel sub-agent support and access to the configured tracker (`gh` for GitHub, `glab` for GitLab, or local Markdown files).
- Notes: Compares changes with both repository standards and the originating specification.
- Missing specification: Skip the Spec review and report that no specification is available.

### 4. Simplify code

- Skill: `code-simplifier`
- Source: [getsentry/skills](https://github.com/getsentry/skills/blob/main/skills/code-simplifier/SKILL.md)
- Notes: Improves readability and maintainability while preserving behavior. Defaults to recently modified code unless a broader scope is requested.
- Python usage: Upstream includes JS/TS/React-specific conventions and references `CLAUDE.md`. When using it for Python, explicitly follow the project's Python conventions and tool configuration, disregard language-specific rules that do not apply, and preserve interfaces, exception behavior, and results. Verify changes with the project's relevant checks and tests.
- Example prompt: "Use code-simplifier to simplify the Python code changed in this session. Follow this project's Python conventions and tool configuration, ignore JS/TS/React-only rules, and preserve public interfaces, exception behavior, and results."

### 5. Plot training and evaluation curves

- Skill: `training-curve-plot`
- Source: [LiuXilin-Frankie/training-curve-plot](https://github.com/LiuXilin-Frankie/training-curve-plot/blob/main/SKILL.md)
- Use for: Comparing model training runs, experiment sweeps, and Monitor versus validation metrics in quantitative research workflows.
- Requirements: Python and Matplotlib; Python 3.12 is recommended. Install Python dependencies separately using the upstream [setup instructions](https://github.com/LiuXilin-Frankie/training-curve-plot/blob/main/INSTALL.md#run-the-example).
- Installation: Uses the `skills` CLI with the GitHub source and does not depend on publication of the upstream npm package.
- Notes: Highlights candidates and controls, retains background runs, marks actual selected checkpoints, and exports PNG and SVG. Supply the selection rule and verify matching evaluation samples, windows, horizons, metrics, units, weights, and score/checkpoint sources before comparing baselines. Preserve missing observations as gaps.
- Data scope: The bundled helper renders supplied local JSON; it does not fetch tracker records, rank models, or select checkpoints. Convert CSV and tracker exports first, and keep training jobs and monitors untouched.
- Example prompt: "Use training-curve-plot to compare the runs in metrics.json. Highlight model A and its control, mark the supplied selected checkpoints, compare only baselines with matching evaluation contracts, and export PNG and SVG."

### 6. Document options trading models

- Skill: `quant-trading-model-doc`
- Source: [LiuXilin-Frankie/quant-trading-model-doc](https://github.com/LiuXilin-Frankie/quant-trading-model-doc/blob/main/SKILL.md)
- Use for: Writing new options trading model documents, filling documentation gaps, and updating specifications before changing formulas, calibration parameters, data windows, filters, or fallback rules.
- Requirements: The upstream [requirements](https://github.com/LiuXilin-Frankie/quant-trading-model-doc/blob/main/README.md#requirements) specify Node.js 22.20 or later and npm for installation. The bundled document checker requires Python 3 with no third-party packages. The builder check uses a fresh sub-agent when available, with direct review as the fallback.
- Workflow: Read existing code and authoritative documents, distinguish facts from `PROPOSED` values and `TBD` items, and document data contracts, naming, formulas, calibration, information boundaries, deterministic fallbacks, and validation examples. Scale documentation to the change and re-check information boundaries and fallback rules after each change.
- Approval: Obtain approval of the relevant document in the current conversation before model-affecting changes, unless the user explicitly opts out. Read-only exploration is allowed; a refactor claimed to preserve model output requires a named input sample and matching outputs as evidence.
- Validation: Run `python3 <installed-skill-directory>/scripts/check_doc.py <model-document.md>`, resolve blocking findings, and review semantic completeness. The checker validates structure and local links; passing does not establish model correctness.
- Scope: Model documentation rather than generic software design documents, PRDs, API documentation, or architecture reviews. The skill does not execute trades.
- Example prompt: "Use quant-trading-model-doc to document this option model from its code and authoritative contracts. Cover calibration, prediction-time information boundaries, and fallback rules, identify unknowns, and request document approval before changing model behavior."

### 7. Stress-test plans and clarify decisions

- Skill: `grill-me`, with its required `grilling` dependency.
- Sources: [grill-me](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) and [grilling](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md).
- Use for: Challenging assumptions and clarifying requirements, research plans, evaluation choices, or implementation designs before committing to them.
- Invocation: Explicitly invoke `grill-me` (for example, `/grill-me` in agents supporting slash commands). Upstream disables automatic model invocation for this wrapper with `disable-model-invocation: true`; it delegates to `grilling`.
- Requirements: Both skills must be installed; both are registry entries, so the full-registry installer includes the dependency. The workflow calls for skill invocation and fresh sub-agents to investigate facts available from the environment. Neither skill requires `setup-matt-pocock-skills` or an issue tracker.
- Workflow: Map decisions and their dependencies, ask all currently answerable questions in each round with recommended answers, and wait for the user's responses before asking dependent questions. Research discoverable facts instead of asking the user to supply them.
- Completion: Continue until all decision branches are resolved, then wait for the user's confirmation of shared understanding before acting. The skill does not itself prescribe a specification template or an implementation workflow.
- Example prompt: "Use grill-me to stress-test this options model research plan. Clarify the hypothesis, information boundaries, evaluation metrics, and acceptance criteria. Investigate facts available in the repository, ask me about unresolved decisions, and wait for confirmation of shared understanding before implementation."

### 8. Learn and assess quantitative concepts

- Skill: `socratic-tutor`
- Source: [janestreet/agent_skills](https://github.com/janestreet/agent_skills/blob/master/socratic-tutor/SKILL.md)
- Use for: Structured learning and assessment of probability, statistics, options model concepts, and research methods when the user explicitly asks to be taught, quizzed, or drilled. Use `grill-me` instead when the task is to challenge a research plan or clarify decisions.
- Requirements: A conversational agent that supports `SKILL.md`; no required skill dependencies, bundled scripts, or external services. Relevant tools are optional for checking practical exercises.
- Workflow: Split the topic into subskills, diagnose the starting level with 3-5 questions, track mastery at levels 0-5, and teach one question at a time. Require multiple independent checks before raising levels, interleave review, and finish with a mixed assessment. The default target is 4/5; full mastery targets 5/5.
- Controls: `show progress`, `harder`, `easier`, and `just tell me` adjust the session. `save state` emits a compact progress block; paste it after `resume from:` in a later session to continue. This is manual state transfer, not automatic persistent storage or scheduled review.
- Scope: A general tutoring method, not a supplied quantitative curriculum or trading model. One-off explanation questions should receive normal answers without starting the tutoring loop.
- Provenance: Published by [Jane Street's official GitHub organization](https://github.com/janestreet); its [company website](https://www.janestreet.com/) identifies it as a research-driven trading firm. The public skill does not identify an individual author or establish that author's specific quantitative role.
- Example prompt: "Use socratic-tutor to teach me static no-arbitrage constraints on an option volatility surface. Diagnose my current understanding first, ask one question at a time, and test whether I can independently explain the constraints and identify violations."

### 9. Restructure requirements and design documents

- Skill: `doc-coauthoring`
- Source: [getsentry/skills](https://github.com/getsentry/skills/blob/main/skills/doc-coauthoring/SKILL.md)
- Use for: Co-authoring and reorganizing requirements, technical specifications, research plans, and decision documents after repeated edits. Use `writing-for-agents` for agent instructions and `quant-trading-model-doc` for defining or validating model-specific contracts.
- Workflow: Gather existing context, establish a document structure, refine sections through targeted edits, and test the result with an independent reader for ambiguity, assumptions, contradictions, and missing context. For restructuring, use the existing document as the baseline and scope brainstorming and new content to the user's request.
- Requirements: No required skill dependencies or bundled executable scripts. External document connectors are optional for local Markdown work.
- Compatibility: The registry installer targets GitHub Copilot, Codex, Claude Code, and Cursor. Map upstream `create_file` and `str_replace` references to the active agent's file creation and targeted editing tools. Use local Markdown when artifacts are unavailable. Compatibility was reviewed at the source and installation-mechanism level; the workflow has not been tested end to end in all four agents.
- Reader testing: Use a fresh sub-agent with only the document and reader questions when available. Otherwise use the upstream manual fallback with a separate, fresh conversation. Report deferred reader testing explicitly; self-review is not independent reader testing.
- Preservation requirements (project-specific, not an upstream guarantee): Inventory the original requirements and map each to its new location. Preserve formulas, parameter values, units, constraints, information boundaries, exceptions, rationale, and unresolved items. Merge only semantically equivalent duplicates; list conflicts without silently choosing a requirement. Preserve intended requirements even when current code does not implement them. Verify coverage after restructuring and report unresolved omissions or meaning changes.
- Scope: Document organization and reader comprehension do not establish model correctness. Structural cleanup must preserve model semantics; changes to formulas, calibration, filters, or fallback rules belong to the model documentation workflow.
- Provenance and license: Sentry attributes the skill to Anthropic. At the 2026-11-12 source review, its workflow matched [Anthropic's version](https://github.com/anthropics/skills/blob/main/skills/doc-coauthoring/SKILL.md), with an added attribution section. The registry records [Sentry's Apache-2.0 declaration](https://github.com/getsentry/skills/blob/main/LICENSE), not independent verification of the full upstream authorization chain.
- Example prompt: "Use doc-coauthoring to restructure this options model specification from its existing content. Preserve every requirement, formula, parameter, unit, boundary condition, exception, rationale, and open question. Map original requirements to their new locations, flag conflicts, and run an independent reader check using the tools available in this agent."

### 10. Audit specification and code consistency

- Skill: `spec-to-code-compliance` (deferred; excluded from automatic installation).
- Source: [Trail of Bits](https://github.com/trailofbits/skills/blob/main/plugins/spec-to-code-compliance/skills/spec-to-code-compliance/SKILL.md); [plugin setup](https://github.com/trailofbits/skills/blob/main/plugins/spec-to-code-compliance/README.md).
- Use for: Auditing an authoritative specification against an entire scoped implementation, including formulas, time ordering, invariants, error handling, fallback paths, and behavior absent from the documents. Use `code-review` for routine change-based reviews and `doc-coauthoring` for document restructuring.
- Installation status: The current upstream plugin is version 2.0.2. The registry tracks `main` but disables installation until its dependencies and project-scoped operation across GitHub Copilot, Codex, Claude Code, and Cursor are verified. This is a recorded candidate, not a claim of four-agent compatibility.
- Required runtime: The plugin's sibling `workflows/spec-compliance.js`, sibling `agents/spec-compliance-checker.md`, and a host supporting its workflow orchestration and fresh agents. These siblings are outside the selected skill directory. The directory's `agents/openai.yaml` is display metadata, not the checker implementation. The registry's named-skill copy command does not install the complete plugin; do not treat copying `SKILL.md` as a working installation or silently replace the workflow with inline review.
- Workflow when the full runtime is available: Discover authoritative documents, split their claims into individually checkable requirements, trace each requirement through code in a fresh agent, sweep for undocumented behavior, and have independent agents challenge divergences from both the code and document perspectives. Write `spec-compliance/REPORT.md` and per-requirement evidence files.
- Coverage: Report the source documents, code scope, revisions, requirement count, evidence lines, searches, unresolved ambiguities, unreadable documents, failed checks, and unchecked requirements. The current workflow caps a run at 30 requirements and may select fewer based on its budget; a completed run is not necessarily a complete audit. Record remaining coverage explicitly.
- Quantitative project guidance: Supply approved model specifications and named implementation paths. Check units, rounding, calibration and prediction boundaries, missing data, thresholds, fallback behavior, and supported SQL dialect/version contracts where applicable. Cite requirement text and implementation evidence. Treat disagreements between documents as findings rather than choosing an interpretation silently.
- Review boundary: Produce findings before proposing repairs. Preserve desired requirements that are not implemented; do not rewrite specifications merely to match current code. Model-affecting repairs follow `quant-trading-model-doc` approval requirements. Static alignment review does not prove numerical correctness; use relevant executable examples, regression tests, and version-specific SQL checks to validate behavioral claims.
- License: Upstream declares CC-BY-SA-4.0. Keep that declaration distinct from this registry's MIT license; no upstream skill files are vendored here.
- Example prompt (after runtime setup): "Use spec-to-code-compliance to audit src/model against docs/model-spec.md. Trace formulas, units, information boundaries, fallbacks, and each stated SQL version contract. Report requirement-to-code evidence, undocumented behavior, contradictions, and unchecked scope. Do not change code or specifications."
