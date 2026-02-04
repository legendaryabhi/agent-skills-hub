#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const REPO = 'https://github.com/legendaryabhi/agent-skills-hub.git';
const HOME = process.env.HOME || process.env.USERPROFILE || '';

function resolveDir(p) {
  if (!p) return null;
  const s = p.replace(/^~($|\/)/, HOME + '$1');
  return path.resolve(s);
}

function parseArgs() {
  const a = process.argv.slice(2);
  let pathArg = null;
  let versionArg = null;
  let tagArg = null;
  let cursor = false, claude = false, gemini = false, codex = false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] === '--help' || a[i] === '-h') return { help: true };
    if (a[i] === '--path' && a[i + 1]) { pathArg = a[++i]; continue; }
    if (a[i] === '--version' && a[i + 1]) { versionArg = a[++i]; continue; }
    if (a[i] === '--tag' && a[i + 1]) { tagArg = a[++i]; continue; }
    if (a[i] === '--cursor') { cursor = true; continue; }
    if (a[i] === '--claude') { claude = true; continue; }
    if (a[i] === '--gemini') { gemini = true; continue; }
    if (a[i] === '--codex') { codex = true; continue; }
    if (a[i] === 'install') continue;
  }

  return { pathArg, versionArg, tagArg, cursor, claude, gemini, codex };
}

function defaultDir(opts) {
  if (opts.pathArg) return resolveDir(opts.pathArg);
  if (opts.cursor) return path.join(HOME, '.cursor', 'skills');
  if (opts.claude) return path.join(HOME, '.claude', 'skills');
  if (opts.gemini) return path.join(HOME, '.gemini', 'skills');
  if (opts.codex) {
    const codexHome = process.env.CODEX_HOME;
    if (codexHome) return path.join(codexHome, 'skills');
    return path.join(HOME, '.codex', 'skills');
  }
  return path.join(HOME, '.agent', 'skills');
}

function printHelp() {
  console.log(`
agent-skills-hub — installer

  npx agent-skills-hub [install] [options]

  Clones the skills repo into your agent's skills directory.

Options:
  --cursor    Install to ~/.cursor/skills (Cursor)
  --claude    Install to ~/.claude/skills (Claude Code)
  --gemini    Install to ~/.gemini/skills (Gemini CLI)
  --codex     Install to ~/.codex/skills (Codex CLI)
  --path <dir> Install to <dir> (default: ~/.agent/skills)
  --version <ver>  After clone, checkout tag v<ver> (e.g. 4.6.0 -> v4.6.0)
  --tag <tag>      After clone, checkout this tag (e.g. v4.6.0)

Examples:
  npx agent-skills-hub
  npx agent-skills-hub --cursor
  npx agent-skills-hub --version 4.6.0
  npx agent-skills-hub --path ./my-skills
`);
}

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', ...opts });
  if (r.status !== 0) process.exit(r.status == null ? 1 : r.status);
}

function main() {
  const opts = parseArgs();
  const { tagArg, versionArg } = opts;

  if (opts.help) {
    printHelp();
    return;
  }

  const target = defaultDir(opts);
  if (!target || !HOME) {
    console.error('Could not resolve home directory. Use --path <absolute-path>.');
    process.exit(1);
  }

  if (fs.existsSync(target)) {
    const gitDir = path.join(target, '.git');
    if (fs.existsSync(gitDir)) {
      console.log('Directory already exists and is a git repo. Updating…');
      process.chdir(target);
      run('git', ['pull']);
      return;
    }
    console.error(`Directory exists and is not a git repo: ${target}`);
    console.error('Remove it or use --path to choose another location.');
    process.exit(1);
  }

  const parent = path.dirname(target);
  if (!fs.existsSync(parent)) {
    try {
      fs.mkdirSync(parent, { recursive: true });
    } catch (e) {
      console.error(`Cannot create parent directory: ${parent}`, e.message);
      process.exit(1);
    }
  }

  if (process.platform === 'win32') {
    run('git', ['-c', 'core.symlinks=true', 'clone', REPO, target]);
  } else {
    run('git', ['clone', REPO, target]);
  }

  const ref = tagArg || (versionArg ? (versionArg.startsWith('v') ? versionArg : `v${versionArg}`) : null);
  if (ref) {
    console.log(`Checking out ${ref}…`);
    process.chdir(target);
    run('git', ['checkout', ref]);
  }

  console.log(`\nInstalled to ${target}`);
  console.log('Pick a bundle in docs/BUNDLES.md and use @skill-name in your AI assistant.');
}

main();
