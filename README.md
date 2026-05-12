# automatic-changelog-guide

A minimal documentation site that demonstrates how to set up automatic versioning and changelog generation using conventional commits.

## Stack

- **Nuxt 4** — framework
- **@nuxt/content v3** — markdown rendering
- **release-it** — version bumping and changelog generation
- **commitlint** — enforce conventional commit format
- **husky** — git hooks
- **lint-staged** — run linters on staged files only

## How It Works

1. Every commit follows the [Conventional Commits](https://www.conventionalcommits.org) spec, enforced by `commitlint` via a Husky `commit-msg` hook.
2. Before each commit, `lint-staged` runs ESLint and Prettier on changed files.
3. When ready to release, `release-it` reads the commit history, bumps the version in `package.json`, generates `CHANGELOG.md`, and creates a git tag — all automatically.

## Getting Started

```bash
pnpm install
pnpm dev
```

## Release

```bash
# Preview what would happen
pnpm release:dry

# Bump patch / minor / major explicitly
pnpm release:patch
pnpm release:minor
pnpm release:major

# Auto-detect from commits
pnpm release
```

## Commit Format

```
<type>: <description>
```

| Type       | When to use                 |
| ---------- | --------------------------- |
| `feat`     | New feature → minor bump    |
| `fix`      | Bug fix → patch bump        |
| `docs`     | Documentation only          |
| `style`    | Formatting, no logic change |
| `refactor` | Code restructure            |
| `perf`     | Performance improvement     |
| `test`     | Tests                       |
| `build`    | Build system                |
| `ci`       | CI/CD config                |
| `chore`    | Maintenance                 |
| `revert`   | Revert a commit             |

Breaking changes trigger a major bump:

```bash
git commit -m "feat!: redesign API

BREAKING CHANGE: previous endpoints removed"
```

## License

MIT
