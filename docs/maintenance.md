# Registry Maintenance

## Document ownership

- `README.md` is maintained exclusively by the user. Agents and repository scripts must not edit, regenerate, or automatically synchronize it. Registry changes must not require README updates.
- [AGENTS.md](../AGENTS.md) contains agent rules and required reading for each operation.
- [skills.json](../skills.json) is the authoritative skill registry, including descriptions, sources, versions, licenses, and installation commands. A rolling version follows its declared branch; `verifiedAt` records the last manual source check.
- [skills.md](skills.md) is the human-readable catalog of all current registry entries. Keep it synchronized with `skills.json`; it is not a separate source of truth.
- [agents.json](../agents.json) is the authoritative agent target and installation policy configuration.
- [skill_maps.md](../skill_maps.md) maps frequent tasks to skills and records dependencies, runtime requirements, first-use setup, and usage limitations. This repository maintains one skill, or one series of skills, for one or more tasks.
- [installation.md](installation.md) contains installation, update, sync, preview, migration, and security procedures.
- This document contains admission criteria, maintenance rules, and validation requirements.
- [LICENSE](../LICENSE) contains the registry's MIT license. Each listed skill remains under its upstream license.

## Admission criteria

An entry enabled for installation must:

1. Point to a public GitHub repository with an identifiable open-source license.
2. Point to a directory containing a valid `SKILL.md`.
3. Provide an `npx skills add ... --skill <name>` command that selects only that skill.
4. Work at project scope with GitHub Copilot, Codex, Claude Code, and Cursor.
5. Record a tag or branch and the date on which the source was verified.
6. Preserve the upstream repository, path, version, license, and installation command without copying its skill files here.

### Deferred registrations

A user-requested skill may be recorded while runtime compatibility is unresolved, using `install.enabled: false` and a nonempty `install.blockedReason`. It must still have a public source, identifiable license, valid `SKILL.md`, a named-skill selection command, and verification metadata. This records the selection without admitting it to the active installation list. Document the missing dependencies and compatibility evidence in the catalog and skill map; the selection command is not a claim of runtime readiness.

The installer and preview must skip deferred entries and print the reason. Entries without `install.enabled` remain enabled for backward compatibility. Enable a deferred entry only after it satisfies all admission criteria and the required dependency installation is accounted for; updating a verification date alone is insufficient.

## Maintenance workflow

Before adding, migrating, or removing a skill, review the admission criteria above. Preserve upstream skill files in their source repositories; this registry stores metadata and documentation only.

Update each affected source of truth:

- Update `skills.json` when registry metadata or membership changes. The installer reads the registry automatically, so adding a skill does not require a script change.
- Update `docs/skills.md` whenever skill membership or displayed metadata changes, including descriptions, sources, versions, licenses, and verification dates. Keep the entry count and rows consistent with `skills.json`.
- Update `skill_maps.md` when task mappings, dependencies, runtime requirements, setup, or usage change. Keep entries consistent with the current registry.
- Update `agents.json` when agent targets or installation policy change.
- Update the relevant document under `docs/` when installation or maintenance procedures change, and update pointers in `AGENTS.md` when required reading moves.
- Keep installation examples consistent with the registry. Add examples only when they explain a distinct installation case; do not duplicate the full catalog.
- Do not update `README.md` as part of registry maintenance or validation. Do not require a catalog, commands, or specific sections in it.

## Validation

Requires Node.js 18 or newer and has no package dependencies. Run the repository checks after modifications:

```bash
npm run check
```

The check validates the documented file layout, JSON syntax, required registry fields, GitHub-only sources, the four-agent default preset, and the repo-only overwrite policy.

When the installation list or workflow changes, also run the installation preview:

```bash
npm run install:all:dry-run
```

The file-layout check requires `README.md` to exist but does not inspect or constrain its contents. Keep the layout check in `package.json` consistent with intentional structural changes. Check affected local documentation links after moving files or sections.

The installation preview only prints commands; it does not install or remove skills. Read the [installation workflow and security requirements](installation.md) before running it.
