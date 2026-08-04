#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registry = JSON.parse(readFileSync(resolve(root, 'skills.json'), 'utf8'));
const agentConfig = JSON.parse(readFileSync(resolve(root, 'agents.json'), 'utf8'));
const agents = agentConfig.presets.default;
const dryRun = process.argv.includes('--dry-run');

function readOption(name, alias) {
  const directIndex = process.argv.findIndex((arg) => arg === name || arg === alias);
  if (directIndex !== -1) {
    const value = process.argv[directIndex + 1];
    if (!value || value.startsWith('-')) throw new Error(`${name} requires a path`);
    return value;
  }

  const prefix = `${name}=`;
  const inline = process.argv.find((arg) => arg.startsWith(prefix));
  return inline?.slice(prefix.length);
}

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`Usage: npm run install:all -- [options]

Options:
  -t, --target <path>  Repository directory to install into (default: current directory)
      --dry-run        Print commands without installing
  -h, --help           Show this help`);
  process.exit(0);
}

const target = resolve(readOption('--target', '-t') ?? process.cwd());

try {
  if (!statSync(target).isDirectory()) throw new Error('not a directory');
} catch {
  throw new Error(`Target repository directory does not exist: ${target}`);
}

if (!Array.isArray(registry.skills) || registry.skills.length === 0) {
  throw new Error('skills.json does not contain any skills');
}

if (!Array.isArray(agents) || agents.length !== 4) {
  throw new Error('agents.json must define exactly four default agents');
}

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const agentArgs = agents.flatMap((agent) => ['--agent', agent]);
const failures = [];

console.log(`Installing ${registry.skills.length} skills for ${agents.join(', ')}`);
console.log(`Target: ${target}`);
console.log('Existing skill files will be overwritten.');

for (const skill of registry.skills) {
  const args = [
    '--yes',
    'skills',
    'add',
    skill.repository,
    '--skill',
    skill.name,
    ...agentArgs,
    '--copy',
    '--yes',
  ];

  console.log(`\n[${skill.name}] ${npx} ${args.join(' ')}`);
  if (dryRun) continue;

  const result = spawnSync(npx, args, {
    cwd: target,
    stdio: 'inherit',
    env: { ...process.env, DISABLE_TELEMETRY: process.env.DISABLE_TELEMETRY ?? '1' },
  });

  if (result.error || result.status !== 0) {
    failures.push({
      name: skill.name,
      reason: result.error?.message ?? `exit code ${result.status ?? 'unknown'}`,
    });
  }
}

if (failures.length > 0) {
  console.error('\nInstallation finished with errors:');
  for (const failure of failures) console.error(`- ${failure.name}: ${failure.reason}`);
  process.exitCode = 1;
} else if (dryRun) {
  console.log('\nDry run completed successfully.');
} else {
  console.log('\nAll skills installed and updated successfully.');
}
