# Agent Skills Hub

> **The Universal Registry of AI Agent Skills**
>
> 🚀 **631+ Skills** for OpenClaw, Claude Code, Gemini, Cursor, Antigravity, and other Agentic Frameworks.

[![npm version](https://img.shields.io/npm/v/agent-skills-hub.svg)](https://www.npmjs.com/package/agent-skills-hub)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Agent Skills Hub** is the central repository for "Agentic Skills"—specialized instructions that teach AI agents how to perform complex tasks, use specific tools, and adhere to project standards.

Whether you are building an autonomous agent with **OpenClaw** or pair-programming with **Claude Code**, this hub provides the knowledge capabilities you need.

---

## 📚 Table of Contents

- [Agent Skills Hub](#agent-skills-hub)
  - [📚 Table of Contents](#-table-of-contents)
  - [🌟 Why Agent Skills Hub?](#-why-agent-skills-hub)
  - [📦 Architecture \& Packages](#-architecture--packages)
  - [🚀 Quick Start](#-quick-start)
    - [Installation](#installation)
  - [💻 Usage Guide](#-usage-guide)
    - [OpenClaw](#openclaw)
    - [Claude Code](#claude-code)
    - [Cursor / VS Code](#cursor--vs-code)
  - [🔎 Skill Catalog](#-skill-catalog)
  - [🛠️ Contributing](#️-contributing)
  - [📄 License](#-license)

---

## 🌟 Why Agent Skills Hub?

AI Agents are powerful generic reasoners, but they often lack **context-specific expertise**. They don't know your deployment protocol, your preferred styling patterns, or the specific syntax for a niche CLI tool.

**Skills bridge this gap.** A skill is a markdown definition (like a `system prompt` plugin) that equips an agent with:

- **Best Practices**: "How to write a production-ready React component."
- **Tool Usage**: "How to use the `kubectl` CLI correctly."
- **Process Knowledge**: "How to create a database migration in this specific repo."

---

## 📦 Architecture & Packages

This project provides a modular architecture to support the diverse ecosystem of AI agents. Skills are organized into **Packages** within the `skills/` directory.

| Package      | Path               | Description                                                                                          |
| :----------- | :----------------- | :--------------------------------------------------------------------------------------------------- |
| **Generic**  | `skills/`          | Universal skills applicable to most coding agents (e.g., specific language patterns, generic tools). |
| **OpenClaw** | `skills/openclaw/` | Specialized skills designed for the [OpenClaw](https://github.com/openclaw/openclaw) agent runtime.  |
| **Legacy**   | `skills/`          | Includes the classic "Antigravity" collection of 600+ skills.                                        |

For a deep dive into the structure, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## 🚀 Quick Start

### Installation

The easiest way to install skills for your agent is using our CLI tool. It detects your environment or allows you to specify a target.

```bash
# Install universally (default: ~/.agent/skills)
npx agent-skills-hub

# Install specifically for Cursor
npx agent-skills-hub --cursor

# Install specifically for Claude Code
npx agent-skills-hub --claude
```

**Alternative: Manual Clone**

```bash
git clone https://github.com/legendaryabhi/agent-skills-hub.git .agent/skills
```

---

## 💻 Usage Guide

Once installed, usage depends on your agent framework.

### OpenClaw

OpenClaw automatically loads skills from the `skills/openclaw` directory if configured.

```bash
# Example interaction
openclaw run "Deploy this app using the @deployment-procedures skill"
```

### Claude Code

Claude Code looks for markdown files in `~/.claude/skills`.

```bash
# In your terminal
>> /load @react-best-practices
>> "Help me refactor this component using the loaded patterns."
```

### Cursor / VS Code

Cursor can index these skills as documentation.

1. Install to `~/.cursor/skills`.
2. In Chat, reference them:
   > "@react-best-practices How should I structure this useEffect hook?"

---

## 🔎 Skill Catalog

We maintain a massive index of over **630+ Skills** spanning multiple domains.

👉 **[BROWSE THE FULL CATALOG (CATALOG.md)](CATALOG.md)**

### Category Highlights

- **Architecture**: `c4-model`, `microservices`, `system-design`
- **Development**: `typescript-expert`, `python-optimization`, `react-patterns`
- **Security**: `pentest-checklist`, `vulnerability-scanner`, `owasp-top-10`
- **Ops & Cloud**: `aws-serverless`, `kubernetes-debug`, `docker-mastery`
- **Business**: `seo-audit`, `marketing-copy`, `startup-analysis`

---

## Contributing

We are building the open standard for agentic skills.

1.  **Fork** the repository.
2.  **Create** your skill in the appropriate package (e.g., `skills/general/my-skill`).
3.  **Define** `SKILL.md` with metadata:
    ```yaml
    ---
    name: my-new-skill
    description: Teaches the agent how to do X.
    ---
    ```
4.  **Submit** a Pull Request.

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

---

## License

MIT © [Agent Skills Hub Community](https://github.com/legendaryabhi/agent-skills-hub)
