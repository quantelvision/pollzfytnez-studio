# Git conventions

## Commit messages

Conventional Commits, written the way a person on this team would write them.

```
<type>(<scope>): <subject>

<body, wrapped at 72 columns, only when it adds something>
```

- Types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `build`, `chore`, `perf`.
- Scope is optional and names the area: `theme`, `media`, `hero`, `contact`, `layout`.
- Subject: imperative mood, lower case, no trailing full stop, under about 60 characters. "add contact form", never "Added contact form." or "adding contact form".
- Body: say why, not what. The diff already says what. Skip it for obvious changes.

## Rules

- **Never add `Co-Authored-By` trailers, tool credits, or any "generated with" line.** Commits are authored by the developer, full stop.
- No emojis, in the subject or the body. The character rules in docs/coding-standards.md apply here too.
- One logical change per commit. A commit should build and lint on its own.
- Do not commit secrets. `.env*` is ignored, `.env.example` is the committed template.
- Do not amend or force push a commit that has been shared.

## Examples

```
feat(hours): add opening hours section
fix(media): stop caching failed Cloudinary lookups
refactor(sections): apply client review feedback
docs: record the client review decisions
```
