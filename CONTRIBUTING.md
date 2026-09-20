# NOVA Gaming — Contributing Guide

**For developers working on NOVA Gaming.**

---

## SETUP (Local Development)

### Prerequisites
- Node.js 20+ (or use `nvm use` if .nvmrc exists)
- pnpm 9+ (recommended) or npm 10+
- Git

### Clone & Install
```bash
git clone https://github.com/angellllkr-eng/novagaming.git
cd novagaming
pnpm install
# or: npm install
```

### Run Dev Server
```bash
pnpm dev
# Runs on http://localhost:3000
# Auto-reloads on file changes (React Fast Refresh)
```

### Build & Test
```bash
# Type-check
pnpm tsc

# Lint
pnpm lint

# Build for production
pnpm build

# Start production server (after build)
pnpm start
```

---

## FILE STRUCTURE

```
novagaming/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage (hero + lobby)
│   ├── layout.tsx                # Root layout
│   ├── account/                  # User account pages
│   ├── game/[gameId]/            # Individual game pages
│   ├── live/                     # Live tables
│   ├── play/                     # Game launch experience
│   ├── rewards/                  # Tier system
│   ├── promotions/               # Promo details
│   ├── safer-gambling/           # Responsible gambling tools
│   └── studio/                   # Game studio info
├── components/
│   ├── lobby/                    # Game grid, rails, quick picks
│   ├── game/                     # Game cards, art, details
│   ├── live/                     # Live table UI
│   ├── promos/                   # Carousel, promo cards
│   ├── auth/                     # Login/signup stubs
│   └── layout/                   # Header, nav, footer
├── lib/
│   ├── data/                     # Mock data (games, tables, studios)
│   ├── api/                      # API client layer (future)
│   └── types.ts                  # Shared TypeScript types
├── public/
│   └── games/                    # Game artwork, images
├── components.json               # shadcn config
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.js            # Tailwind CSS config
├── next.config.mjs               # Next.js config
└── README.md                     # Project overview

DOCS/ (in root):
├── PROJECT_STATE.md              # Current state, known issues
├── TASKS.md                      # Outstanding work register
├── SECURITY.md                   # Security + privacy boundaries
├── DECISIONS.md                  # Tech decisions (why we chose X)
└── CONTRIBUTING.md (this file)   # How to contribute

CONTROL FILES (version controlled):
├── .gitignore                    # Don't commit node_modules, .env, etc.
├── .eslintrc.json                # ESLint rules
├── package.json                  # npm scripts, dependencies
└── tsconfig.json                 # Compiler options
```

---

## DEVELOPMENT WORKFLOW

### 1. Check Branch Status
```bash
git status
git branch -a
```

### 2. Create Feature Branch
```bash
git checkout -b feature/description-of-work
# Example: feature/add-game-filter
```

### 3. Make Changes
- Edit files in `app/`, `components/`, or `lib/`
- Keep changes focused (one feature per branch)
- Write comments for non-obvious logic

### 4. Format & Lint
```bash
# Auto-fix formatting issues
pnpm prettier --write .

# Check linting
pnpm lint

# Type-check
pnpm tsc
```

### 5. Test Locally
```bash
pnpm dev
# Open http://localhost:3000 in browser
# Manually test your feature
```

### 6. Commit
```bash
git add .
git commit -m "feat: add game filter by category

- Filter game grid by selected category
- Persist filter choice in URL params
- Add keyboard shortcut (F) to focus filter input

Fixes #123"
```

### 7. Push & Open PR
```bash
git push origin feature/description-of-work
# Go to GitHub, open PR
# Link to related issue: "Fixes #123"
```

### 8. Review & Merge
- Wait for CI checks to pass (lint, build, type check)
- Wait for code review approval
- Merge to `main` (auto-deploys to Vercel)

---

## CODE STYLE

### TypeScript
```typescript
// ✅ Good
interface GameCard {
  id: string
  title: string
  category: 'Slots' | 'Live' | 'Table'
  isExclusive?: boolean
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return <div className="game-card">{game.title}</div>
}

// ❌ Avoid
const GameCard = ({ game }: any) => {
  return <div>{game.title}</div>
}
```

**Rules:**
- Use `interface` for object shapes (not `type`)
- Use `React.FC` for functional components
- Type all props (no `any`)
- Use explicit return types on functions
- Export named exports, not default (easier refactoring)

### Styling
```tsx
// ✅ Use Tailwind classes
<div className="bg-black text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">

// ✅ Use clsx for conditional classes
<div className={clsx(
  'game-card',
  isExclusive && 'exclusive-badge',
  category === 'Slots' && 'bg-purple-600'
)}>

// ❌ Avoid inline styles
<div style={{ backgroundColor: 'black', color: 'white' }}>

// ❌ Avoid arbitrary CSS
<div className="custom-shadow-[0_100px_50px_rgba(...)]">
```

### Component Organization
```tsx
// ✅ Good structure
import React from 'react'
import clsx from 'clsx'

interface Props {
  game: Game
  isHighlighted?: boolean
  onClick?: () => void
}

/**
 * GameCard displays a game in the lobby grid.
 * Shows cover art, title, studio, and exclusive badge if applicable.
 */
export const GameCard: React.FC<Props> = ({
  game,
  isHighlighted,
  onClick,
}) => {
  return (
    <div
      className={clsx('game-card', isHighlighted && 'ring-2')}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* JSX here */}
    </div>
  )
}
```

**Rules:**
- Add JSDoc comment explaining component purpose
- Group props logically in interface
- Use semantic HTML (role, tabIndex for a11y)
- Keep components small (<150 lines)

---

## TESTING

### Before Committing
```bash
# 1. Lint + format
pnpm lint
pnpm prettier --write .

# 2. Type check
pnpm tsc

# 3. Build test
pnpm build

# 4. Manual smoke test (in browser)
pnpm dev
# - Load homepage
# - Click game card
# - Try filter by category
# - Check mobile responsiveness (F12 → device toolbar)
```

### Accessibility Testing
- **Keyboard nav:** Can you Tab through all buttons? Does Focus indicator show?
- **Screen reader:** Try VoiceOver (Mac) or NVDA (Windows). Can it read all content?
- **Color contrast:** Use Chrome DevTools → Inspect → Accessibility tab. Check WCAG AA pass.

### Mobile Testing
```bash
# Emulate mobile in Chrome DevTools
# F12 → Toggle device toolbar (Ctrl+Shift+M)
# Test at: 375px (mobile), 768px (tablet), 1200px (desktop)
```

---

## PULL REQUEST CHECKLIST

Before requesting review:
- [ ] Branch is up-to-date with `main` (rebase if needed)
- [ ] No console errors or warnings
- [ ] Lint passes (`pnpm lint`)
- [ ] Types pass (`pnpm tsc`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Tested manually (homepage, game detail, mobile)
- [ ] Commit message is clear and references issue
- [ ] No secrets, API keys, or environment variables in code
- [ ] No large files added (keep images <500KB)
- [ ] Accessibility maintained (focus states, semantic HTML, alt text for images)

---

## CODE REVIEW EXPECTATIONS

**What reviewers look for:**
- Does this match the design system (Tailwind, shadcn)?
- Is the code typed correctly?
- Are there any performance issues (unnecessary renders, large bundle additions)?
- Is it accessible (keyboard nav, screen reader friendly)?
- Is the commit message clear?
- Are new dependencies justified?

**How to receive feedback:**
- Don't take it personally; it's about the code quality
- Respond to feedback with changes or discussion
- Push updates to the same branch (no new PR needed)
- Request re-review once changes made

---

## COMMON TASKS

### Add a New Page
```bash
# Create file in app/
# Example: app/leaderboard/page.tsx

export default function LeaderboardPage() {
  return <div>Leaderboard content</div>
}

# Done! Route is now accessible at /leaderboard
```

### Add a New Component
```bash
# Create file in components/
# Example: components/leaderboard/leaderboard-table.tsx

import React from 'react'

interface LeaderboardTableProps {
  players: Array<{ rank: number; name: string; score: number }>
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  players,
}) => {
  return (
    <table>
      {/* Table rows */}
    </table>
  )
}
```

### Add a Game to Mock Data
```bash
# Edit lib/data/games.ts
# Add to games array:

{
  id: 'new-game-123',
  title: 'New Game Title',
  studio: 'Studio Name',
  category: 'Slots',
  image: '/games/new-game.png',
  rtp: 96.5,
  volatility: 'medium',
  isNew: true,
  isFeatured: false,
  isExclusive: false,
  jackpot: null,
}

# New game appears in grid automatically
```

### Update Styling
```bash
# Edit app/globals.css or component's className prop
# Use Tailwind classes (no custom CSS unless necessary)

# Example: Make game cards taller on mobile
# Old: className="game-card h-64"
# New: className="game-card h-56 md:h-64"
```

---

## DEBUGGING

### Browser Console Errors
```bash
# Look for red errors in DevTools Console (F12)
# Check if related to your changes
# If new error, fix or ask for help in PR review
```

### Type Errors
```bash
pnpm tsc
# Shows all TypeScript errors with line numbers
# Fix type mismatches before committing
```

### Build Failures
```bash
pnpm build
# If build fails, check error message
# Common: Unused imports, type mismatches, missing exports
# Fix and try again
```

### Performance Issues
```bash
# Measure:
pnpm build
# Check build output for large chunks

# Use Lighthouse (Chrome DevTools → Lighthouse tab)
# Target: 90+ on all metrics
```

---

## DEPLOYMENT

### Staging
```bash
# Automatic on PR merge to staging branch (if configured)
# Preview available at: https://novagaming-staging.vercel.app
# Test here before production merge
```

### Production
```bash
# Automatic on PR merge to main branch
# Live at: https://novagaming.com (once domain assigned)
# Watch for errors in real-time monitoring dashboard
```

### Rollback
```bash
# If production breaks:
# 1. Go to Vercel dashboard
# 2. Click "Deployments"
# 3. Find last stable deployment
# 4. Click "Promote to Production"
```

---

## GETTING HELP

- **Questions about architecture?** → Read PROJECT_STATE.md + DECISIONS.md
- **Stuck on a bug?** → Create GitHub issue with: what you tried, error message, code snippet
- **Want feedback early?** → Create draft PR, invite review
- **Security concern?** → Email security@novagaming.local (or see SECURITY.md)

---

## PERFORMANCE GUIDELINES

### Bundle Size
- Keep build size < 200KB (gzipped)
- Lazy-load game grids (use dynamic() for below-the-fold components)
- Don't import unused dependencies

### Rendering
- Avoid inline object/function creation in render (memoize with useMemo)
- Use React.memo for expensive components
- Profile with Chrome DevTools → Performance tab

### Images
- Always use `next/image` (auto-optimization)
- Provide srcSet for responsive images
- Use WebP format in public/ folder

---

## FINAL CHECKLIST

Before pushing to main:
```
Code Quality:
  ✅ Runs locally without errors
  ✅ Lint passes
  ✅ Types pass
  ✅ Build succeeds
  ✅ No console warnings

Testing:
  ✅ Feature tested manually
  ✅ Mobile responsiveness checked
  ✅ Accessibility checked (keyboard, focus)

Documentation:
  ✅ Commit message is clear
  ✅ Complex logic has comments
  ✅ New components have JSDoc

Security:
  ✅ No secrets in code
  ✅ No sensitive data logged
  ✅ Input validated if needed

Performance:
  ✅ No unused imports
  ✅ No console.log() in production code
  ✅ Images optimized
```

---

**Questions?** Create a GitHub discussion or ping the team in Slack.  
**Found a bug?** Open an issue with: Steps to reproduce, Expected vs. Actual, Env info.  
**Have an idea?** Open a discussion or feature request.

Happy coding! 🎮
