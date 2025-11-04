# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **Expo React Native** application targeting iOS, Android, and Web platforms. The app appears to be a purchase/payment template with a circular time selection interface, bottom navigation, and animated components.

## Quick Start

### Development Server
```bash
# Start Expo development server (default)
npm start

# Platform-specific commands
npm run ios          # iOS simulator/device
npm run android      # Android emulator/device
npm run web          # Web browser
```

### Code Quality
```bash
npm run lint         # Run ESLint with Expo configuration
```

### Project Reset
```bash
npm run reset-project  # Reset project to blank state
```

## Architecture

### Entry Points
- **Main App**: `App.tsx` - Root component with gesture handler, safe area provider, and font loading
- **Router App**: `app/index.tsx` - Sample Expo Router page (file-based routing structure)

### Component Structure
```
/src/components/
├── bottom-tab/       # Bottom navigation with 5 tabs (home, payments, project, messages, team)
├── circle-time/      # Circular draggable time slider with Reanimated
├── footer/           # Footer component
├── header/           # Header with avatar and settings
├── queued/           # Queued items component
└── time-range/       # Time range selection component
```

### Directory Layout
```
/constants/
└── theme.ts          # Color palette (light/dark mode) and font definitions

/hooks/
├── use-color-scheme.ts      # Theme hook
└── use-color-scheme.web.ts  # Web-specific theme hook

/assets/
├── fonts/            # Custom fonts (SF-Pro-Rounded-Bold.otf)
└── images/           # App images (avatars, icons)

/scripts/
└── reset-project.js  # Project reset utility
```

### Key Technologies
- **Expo SDK 54** with React Native 0.81.5
- **Expo Router** (file-based routing in `/app`)
- **React Native Reanimated** for animations (FadeInUp, shared values)
- **Expo Linear Gradient** for visual effects
- **React Native Gesture Handler** for touch interactions
- **@gorhom/bottom-sheet** for bottom sheet components
- **@shopify/react-native-skia** for high-performance drawing
- **Expo Haptics** for tactile feedback

## Development Configuration

### TypeScript
- Strict mode enabled in `tsconfig.json`
- Path mapping: `@/*` maps to `./*` (e.g., `@/components` → `./components`)
- Extends Expo's base TypeScript configuration

### Code Style
- **ESLint**: Expo config with flat config format (`eslint.config.js`)
- **VSCode Settings**: Auto-fix, organize imports, and sort members on save
- **Recommended Extension**: Expo VSCode Tools (`expo.vscode-expo-tools`)

### Expo Configuration
- **App Name**: PurchaseTemplate
- **Bundle Identifier**: purchasetemplate
- **New Architecture**: Enabled
- **React Compiler**: Enabled (experimental)
- **Edge-to-Edge**: Enabled on Android
- **Supports Tablet**: iOS

## Key Implementation Patterns

### 1. Font Loading
Custom fonts loaded via `useFonts` hook:
```typescript
const [fontsLoaded] = useFonts({
  'SF-Pro-Rounded-Bold': require('./assets/fonts/SF-Pro-Rounded-Bold.otf'),
});
```

### 2. Animated Components
Components use React Native Reanimated with shared values:
```typescript
const selectedDuration = useSharedValue(5);
// Animated.View entering={FadeInUp.duration(600)}
```

### 3. Safe Areas
All screen edges handled with `useSafeAreaInsets`:
```typescript
const { top, bottom } = useSafeAreaInsets();
```

### 4. Icons
Using `@expo/vector-icons`:
- FontAwesome for header icons
- AntDesign for bottom tab icons

### 5. Color Scheme
Theme colors defined in `/constants/theme.ts` with light/dark mode support.

## Development Tips

### Running Tests
- No test runner configured (no Jest, Detox, or testing library found)
- Consider adding testing setup if needed

### Debugging
- Use `npx expo start --clear` to clear Metro cache if needed
- Shake device/emulator to open Expo DevTools
- Check Metro bundler logs for build errors

### Platform-Specific Code
- Platform-specific hooks: `use-color-scheme.ts` vs `use-color-scheme.web.ts`
- Platform.select() used for font definitions in theme.ts

## Common Tasks

### Adding a New Component
1. Create directory in `/src/components/{ComponentName}/`
2. Export component in `index.tsx`
3. Import and use in relevant parent component

### Adding a New Route
1. Create file in `/app/` directory for Expo Router
2. Use `expo-router` navigation (`useRouter`, `usePathname`)

### Modifying Theme
1. Update colors/fonts in `/constants/theme.ts`
2. Colors use standard React Native color values
3. Fonts use Platform.select for OS-specific defaults

### Resetting Project
Run `npm run reset-project` - This will either move or delete existing app structure and create a blank template.

## Dependencies

### Major Dependencies
- `react`: 19.1.0
- `react-native`: 0.81.5
- `expo`: ~54.0.20
- `@react-navigation/native`: ^7.1.8
- `react-native-reanimated`: ~4.1.1

### Development Dependencies
- `typescript`: ~5.9.2
- `eslint`: ^9.25.0
- `eslint-config-expo`: ~10.0.0

## Known Quirks

1. **Dual Structure**: The repo has both traditional `App.tsx` structure and Expo Router structure in `/app/`. Main app uses `App.tsx`.

2. **Custom Fonts**: SF-Pro-Rounded-Bold font is loaded manually - ensure font file exists in `/assets/fonts/`.

3. **Animation Heavy**: Components use React Native Reanimated extensively - ensure proper understanding of shared values and animated styles.

4. **Platform Paths**: TypeScript path mapping `@/*` → `./*` means imports can use `@/` prefix from anywhere.
