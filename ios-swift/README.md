# OnboardingAnimation — iOS (SwiftUI)

Native Swift/SwiftUI port of the React Native onboarding screen in the repo root.

## Requirements

- Xcode 16+ (built and verified with Xcode 27.1)
- iOS 17.0+ (uses `withAnimation(_:completion:)` and `onChange(of:_:)` two-parameter form)
- No third-party dependencies (images load with `AsyncImage`)

## Run

```bash
open OnboardingAnimation.xcodeproj
```

Pick a simulator and press ⌘R, or from the terminal:

```bash
xcodebuild -project OnboardingAnimation.xcodeproj -scheme OnboardingAnimation \
  -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' build
```

## Mapping from the React Native source

| React Native                                         | Swift                                                |
| ---------------------------------------------------- | ---------------------------------------------------- |
| `App.tsx`, `index.js`                                | `OnboardingAnimationApp.swift`                       |
| `useFonts` (expo-font)                               | `Resources/Fonts` + `Info.plist` → `UIAppFonts`      |
| `src/screens/onboarding-screen.tsx`                  | `Onboarding/OnboardingScreen.swift`                  |
| `src/screens/onboarding/constants.ts`                | `Onboarding/OnboardingModels.swift`                  |
| `.../components/animated-headline.tsx`               | `Onboarding/Components/AnimatedHeadline.swift`       |
| `.../components/onboarding-actions.tsx`              | `Onboarding/Components/OnboardingActions.swift`      |
| `src/components/card-carousel/index.tsx`             | `CardCarousel/CardCarousel.swift`                    |
| `card-item.tsx` / `shape-card.tsx` / `friends-card.tsx` / `list-card.tsx` | `CardCarousel/*.swift`          |
| `types.ts` / `constants.ts` / `utils.ts`             | `CardModels.swift` / `CardConstants.swift` / `CardUtils.swift` |
| CSS-style `animationName: { from, to }` keyframes    | `Support/EntranceAnimation.swift` (`.entrance(from:)`) |
| Reanimated `withRepeat(withSequence(withTiming…))`   | `withAnimation(.linear(duration: 16).repeatForever(autoreverses: false))` |
| `expo-linear-gradient`                               | `LinearGradient`                                     |
| Skia `Canvas` + `Group clip` + `MakeFromSVGString`   | `clipShape` + `Support/SVGPathShape.swift`           |
| `@expo/vector-icons` Feather `gift` / `heart` / `list` | SF Symbols `gift` / `heart` / `list.bullet`        |
| `Image source={{ uri }}`                             | `Support/RemoteImage.swift` (`AsyncImage`)           |

## Notes

- The infinite carousel travel distance uses the real card pitch (`CARD_WIDTH + CARD_SPACING + columnGap`), so the loop restarts without a visible jump.
- Fonts are referenced by PostScript name: `CaveatBrush-Regular` and `PiepieW01-Regular` (the RN source calls the latter "Piepia W01 Regular").
