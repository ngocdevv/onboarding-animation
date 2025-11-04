<!-- .github/copilot-instructions.md -->

# Repo-specific Copilot instructions (concise)

Purpose: Help an AI coding assistant be immediately productive in this Expo React Native project.

- Big picture (what matters)
  - This is an Expo React Native app (Expo SDK ~54) with two parallel entry patterns: `App.tsx` (main app) and an Expo Router tree under `app/` (`app/index.tsx`). Changes to navigation or app bootstrapping may live in either place — prefer `App.tsx` for global providers and `app/` for route pages.
  - UI and interactions are animation-heavy (React Native Reanimated + Gesture Handler + Skia). Editing animations will usually touch files under `src/components/` (look for `useSharedValue`, `useAnimatedStyle`, `FadeInUp`, etc.).

- Key files & dirs (start here)
  - `App.tsx` — root providers (SafeArea, gesture handler, fonts loading). Good first place to add global wrappers.
  - `app/index.tsx` — Expo Router sample page (file-based routes). Create new routes under `app/`.
  - `src/components/` — UI building blocks. Notable subfolders: `bottom-tab`, `circle-time`, `time-range`, `header`, `footer`.
  - `src/screens/onboarding-screen.tsx` — example screen (current working file).
  - `constants/theme.ts` — color palette and fonts (source of truth for colors / light-dark behavior).
  - `assets/fonts/` and `assets/images/` — custom fonts and images; fonts loaded in `App.tsx` via `useFonts`.
  - `scripts/reset-project.js` — resets project skeleton; reference before running destructive changes.

- Project conventions and patterns
  - TypeScript path alias: `@/*` maps to `./*` (use imports like `@/components/...`). Check `tsconfig.json`.
  - Component creation: add a directory in `src/components/{Name}/` and export from an `index.tsx` file. Parent files usually import via `@/components/{Name}`.
  - Animations: search for `useSharedValue`, `useAnimatedStyle`, and `FadeInUp` to find animation logic to modify. Haptic feedback uses `expo-haptics` near interaction handlers.
  - Platform-specific code: there are web-specific hooks (`use-color-scheme.web.ts`). Use `Platform.select` where needed.

- Developer workflows & important commands
  - Start dev server: `npm start` (Expo). Platform shortcuts: `npm run ios`, `npm run android`, `npm run web`.
  - Clear Metro cache if debugging bundler issues: `npx expo start --clear`.
  - Linting: `npm run lint` (uses Expo ESLint flat config). Run autofix when suggested by ESLint.
  - Reset template (destructive): `npm run reset-project` — inspect `scripts/reset-project.js` before running.

- Integration points & dependencies to watch
  - Reanimated (v4) + Gesture Handler — animation code frequently uses shared values. Ensure Reanimated Babel plugin is configured if editing animation internals.
  - Expo Router vs `react-navigation`-style imports — prefer file-based routing under `app/` for new pages.
  - Skia (`@shopify/react-native-skia`) used for drawing — changes here affect native rendering and may need native rebuilds.

- Quick examples to guide edits
  - Importing a component: import Footer from '@/components/footer';
  - Finding animation blocks: grep for `useSharedValue` or `FadeInUp` to locate animated components.
  - Changing theme color: edit `constants/theme.ts` and track where tokens are used across `src/components/`.

- Safety notes for AI actions
  - Do not run `npm run reset-project` without explicit user confirmation — it is destructive.
  - Avoid changing Babel/native build configs unless necessary; discuss before modifying `babel.config.js` or native deps.

If anything here is unclear or you want me to include more examples (search patterns, common edit recipes, or tests), tell me which area to expand and I'll iterate.
