# Deployment unification checklist

- [ ] Vercel project is `obsidian-grid-www` or an approved canonical name.
- [ ] Git source is `angellllkr-eng/mind-reply-core` only.
- [ ] Production branch is `production` only.
- [ ] Remove Docker/SSH production automation after successful cutover.
- [ ] Remove Vercel projects and domain bindings for non-canonical repos.
- [ ] Move production variables to Vercel encrypted environment variables.
- [ ] Rotate any credential that existed in more than one deploy surface.
- [ ] Set DNS TTL low before cutover.
- [ ] Point the chosen live domain exclusively to the canonical Vercel project.
- [ ] Validate HTTPS, analytics, auth, payments, health, and monitoring.
- [ ] Rollback: revert `production`, then restore the previous DNS target if required.
- [ ] Keep old deployment frozen for 7 days before deletion.

Owner sign-off is required before DNS, secrets, visibility, archive, or deletion changes.