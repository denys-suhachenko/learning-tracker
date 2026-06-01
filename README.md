# Learning Tracker

[![CI](https://github.com/denys-suhachenko/learning-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/denys-suhachenko/learning-tracker/actions/workflows/ci.yml)

An open-source self-learning organizer. Manage courses, take rich Markdown notes with LaTeX, revisit material through spaced repetition, and keep a personal knowledge base — all in one place. Built for personal use, free for anyone else who finds it useful.

**Live Demo:** https://learning-tracker-demo.vercel.app/
**Backend API:** https://github.com/denys-suhachenko/learning-tracker-api

### Demo account

Email: `demo-tracker@mail.com`
Password: `password_test`

---

## Features

- **Course management** — create, edit, and delete courses with study areas, descriptions, and status workflow
- **Hierarchical structure** — courses contain modules, modules contain lessons; full CRUD on each level
- **Markdown note editor** — write lesson notes in Markdown with live split-view preview, supports LaTeX math via KaTeX
- **Auto-generated table of contents** — headings in lesson notes are extracted into a clickable sidebar with smooth-scroll anchors
- **View / edit modes** — read-mostly pages stay read-only by default; editing is an explicit, intentional action
- **JWT authentication** — sign-in / sign-up flow with access + refresh tokens and automatic token refresh on 401
- **Type-safe API contract** — TypeScript types generated from the backend's OpenAPI schema
- **Production error tracking** — Sentry integration with source map upload

### In progress

- **Review module** — Anki-style spaced repetition for revisiting lesson material. UI scaffolding is visible in the sidebar; scheduling logic and card generation are the next iteration

---

## Tech Stack

**Frontend**

- React 19 + TypeScript (strict mode)
- Vite as build tool
- Redux Toolkit + RTK Query for state and data fetching
- React Router v7 for routing
- React Hook Form for forms with validation
- Tailwind CSS + shadcn/ui (Radix primitives) for UI
- react-markdown + remark-math + rehype-katex for the note editor

**Backend**

- Django + Django REST Framework
- SimpleJWT for authentication
- drf-spectacular for OpenAPI schema generation
- PostgreSQL (production) / SQLite (development)

**Quality & tooling**

- Vitest + Testing Library + MSW for unit, component, and integration tests
- ESLint + Prettier for code quality
- openapi-typescript for generating frontend types from the backend's OpenAPI schema
- GitHub Actions for CI (lint, typecheck, test on every push and PR)
- Sentry for production error tracking

**Infrastructure**

- Vercel (frontend)
- Railway (backend + database)

---

## Architecture

This section captures key decisions and the reasoning behind them.

### OpenAPI as the source of truth

Instead of maintaining frontend types by hand, the backend generates an OpenAPI schema via `drf-spectacular`, and the frontend generates TypeScript types from that schema using `openapi-typescript`. A `pnpm gen:api` script regenerates `src/shared/api/schema.d.ts` whenever the backend contract changes. This eliminates a class of bugs caused by drift between backend and frontend types.

### CRUD strategy: separate requests over nested writes

The backend supports reading courses with deeply nested modules and lessons, but write operations are flat — each entity has its own endpoint. The frontend mirrors this: creating a lesson is a single `POST /lessons/`, not a nested update of the parent course. This keeps the API contract simple and makes cache invalidation easier to reason about.

### Tag-based cache invalidation

RTK Query uses two tag families: `Courses` (general, refetches the course tree) and `Lessons` (per-id, for point invalidation). Mutations declare which tags they invalidate — for example, creating a lesson invalidates both `Courses` (so the parent course refetches with the new lesson) and `Lessons` (for future per-id queries). This gives precise control over what gets refetched.

### View / edit mode pattern

Editable sections (modules on a course page, content on a lesson page) use a `viewMode` / `editMode` toggle controlled by local state. In view mode, the UI is read-only with an "Edit" button; in edit mode, controls appear inline. This prevents accidental edits on documents that are mostly read.

### Defensive environment configuration

`src/shared/config/env.ts` reads environment variables once and validates the required ones at module load. Missing required variables throw immediately with a clear error message, rather than letting the app boot into a half-working state.

---

## Getting Started

### Prerequisites

- Node.js 22+ (24 LTS recommended)
- pnpm 10+
- A running instance of the [backend API](https://github.com/denys-suhachenko/learning-tracker-api)

### Setup

\`\`\`bash
git clone https://github.com/denys-suhachenko/learning-tracker.git
cd learning-tracker
pnpm install
cp .env.example .env.local # fill in VITE_API_URL and optional Sentry config
pnpm dev
\`\`\`

The app will be available at http://localhost:5173.

### Available scripts

- `pnpm dev` — start the dev server
- `pnpm build` — production build (includes typecheck via `tsc -b`)
- `pnpm lint` — run ESLint
- `pnpm test` — run tests in watch mode
- `pnpm test:run` — run tests once (used by CI)
- `pnpm test:ui` — open Vitest UI
- `pnpm gen:api` — regenerate TypeScript types from the backend's OpenAPI schema

---

## Testing

The test suite uses **Vitest** + **Testing Library** + **MSW**, covering three levels of the pyramid:

- **Unit** — pure utilities (`getErrorMessage` covers all error-shape branches)
- **Component** — UI primitives in isolation (`QueryState` covers all states and the retry interaction; `CourseDetailsForm` covers rendering, typing, and validation)
- **Integration** — full vertical slices through Redux, RTK Query, MSW, React Router, and Sonner (e.g. `CourseFormPage` covers happy create, backend 400 error, and edit-with-prefill flows)

MSW intercepts HTTP requests at the network level, so tests exercise the real RTK Query layer without mocking internal hooks. Integration tests assert on observable behavior (toast appears, navigation happens, content is rendered) rather than on implementation details.

---

## Deployment

- The **frontend** is deployed to Vercel on every merge to `main`. Vercel runs the build, uploads source maps to Sentry, and serves the static bundle from its CDN.
- The **backend** runs on Railway with a managed PostgreSQL database. JWT secrets and Sentry DSN are stored as Railway environment variables.
- **CI** runs on GitHub Actions for every push and pull request to `main` and `dev`: lint → typecheck → tests.

---

## Roadmap

The note-taking vertical is the foundation. Planned next domains:

- **Review module** — spaced repetition cards generated from lesson notes, with a daily review queue
- **Knowledge base** — personal repository of saved articles, book references, uploaded PDFs and documents
- **Study planner** — calendar-style view of what to study today, this week, and later; integrated with review queue and course progress
- **AI assistant (exploratory)** — summarize notes, generate review cards from lesson content, suggest connections between topics

---

## License

[MIT](./LICENSE) — free to use, modify, and share.
