# Project overview

- This is frontend application built with React, TypesScript and Vite.
- Tailwind CSS is used for styling.
- The project follows a feature-based folder structure.
- Pages are located in `src/pages`
- Business features located in `src/features`
- Shared reusable code is located in `src/shared`
- The application entry point is `src/main.tsx`

# General working rules

- Before making changes, inspect the relevant files and nearby components.
- Check `package.json` before running commands or using dependecies.
- For non-trivial tasks, briefly describe the implementation plan first.
- Make the smallest change necessary to complete the task.
- Do not modify unrelated files.
- Do not restructure folders unless explicitly requested.
- Do not install new dependencies without asking first.
- Do not run formatting across the entire project.
- Do not rewrite working code only to change its style.
- Preserve the existing project architecture and naming conventions.

# React rules

- Use functional React components.
- Use TypeScript for components, props, API data, and internal models.
- Avoid the `any` type.
- Define explicit types or interfaces for component props.
- Render repeated UI elements with `map`.
- Do not use array indexes as React keys when stable IDs are available.
- Avoid unnecessary `useEffect`.
- Calculate derived values during render when possible.
- Keep components focused on one clear responsibility.
- Extract a child component only when it improves readability or reuse.
- Follow the export style used by neighboring files.

# Styling rules

- Use Tailwind CSS classes.
- Reuse existing design tokens and utility classes where possible.
- Follow the visual style of neighboring components.
- Avoid inline styles unless there is a clear reason.
- Keep layouts responsive.
- Ensure long text does not break dashboard layouts.
- Use semantic HTML elements.
- Use `button` for clickable actions instead of clickable `div` elements.

# Feature architecture

- Dashboard-specific UI components belong in `src/features/dashboard/ui`.
- Page composition belongs in `src/pages`.
- UI components should not contain API request logic unless the existing architecture already follows that pattern.
- Do not move mock data or business logic between layers without explaining the reason.
- Reuse existing shared components before creating new ones.

# Code quality

- Prefer clear and readable code over clever abstractions.
- Avoid premature abstraction.
- Avoid duplicated JSX when a small data-driven component can be used.
- Use descriptive variable and function names.
- Handle loading, empty, and error states when working with asynchronous data.
- Do not silently ignore TypeScript or ESLint errors.

# Verification

After completing a task:

- List the files that were changed.
- Briefly explain the implementation.
- Run the existing TypeScript, lint, test, or build commands when appropriate.
- Report any errors that could not be fixed.
- Do not claim that a command passed unless it was actually executed.
