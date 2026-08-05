# Production deployment contract

- Source: `angellllkr-eng/mind-reply-core`
- Branch: `production`
- Project: `obsidian-grid-www`
- Host: Vercel
- Production deploy trigger: merge to `production` after required CI
- Preview deploys: pull requests only
- Domain: one owner-selected live domain, exclusively bound to this project

The existing Docker/SSH and secondary Vercel workflows are migration evidence, not permanent production authorities. Disable them only after the canonical Vercel smoke deploy and rollback test pass.