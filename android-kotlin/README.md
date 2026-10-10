# OnboardingAnimation — Android (Kotlin / Jetpack Compose)

Native Kotlin + Jetpack Compose port of the React Native onboarding screen in the repo root.

## Requirements

- JDK 17+ (built and verified with Temurin 21)
- Android SDK with platform 37 (`compileSdk = 37`, `minSdk = 26`)
- Gradle 9.6.1 via the wrapper, Android Gradle Plugin 9.4.1 (built-in Kotlin), Compose BOM 2026.09.00, Coil 3

## Run

Open the folder in Android Studio, or from the terminal:

```bash
./gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

If `ANDROID_HOME` is not exported, create `local.properties` with `sdk.dir=/path/to/Android/sdk`.

## Mapping from the React Native source

| React Native                                         | Kotlin                                                        |
| ---------------------------------------------------- | ------------------------------------------------------------- |
| `App.tsx`, `index.js`                                | `MainActivity.kt`                                             |
| `useFonts` (expo-font)                               | `res/font/*.ttf` + `ui/theme/AppFonts.kt`                     |
| `src/screens/onboarding-screen.tsx`                  | `ui/onboarding/OnboardingScreen.kt`                           |
| `src/screens/onboarding/constants.ts`                | `ui/onboarding/OnboardingConstants.kt`                        |
| `.../components/animated-headline.tsx`               | `ui/onboarding/components/AnimatedHeadline.kt`                |
| `.../components/onboarding-actions.tsx`              | `ui/onboarding/components/OnboardingActions.kt`               |
| `src/components/card-carousel/index.tsx`             | `ui/components/cardcarousel/CardCarousel.kt`                  |
| `card-item.tsx` / `shape-card.tsx` / `friends-card.tsx` / `list-card.tsx` | `ui/components/cardcarousel/*.kt`        |
| `types.ts` / `constants.ts` / `utils.ts`             | `CardModels.kt` / `CardConstants.kt` / `CardUtils.kt`         |
| CSS-style `animationName: { from, to }` keyframes    | `ui/animation/EntranceAnimation.kt` (`Modifier.entrance(from)`) |
| Reanimated `withRepeat(withSequence(withTiming…))`   | `Animatable.animateTo(infiniteRepeatable(tween(loopDurationMillis, LinearEasing)))` |
| `expo-linear-gradient`                               | `Brush.verticalGradient` / `Brush.linearGradient`             |
| Skia `Canvas` + `Group clip` + `MakeFromSVGString`   | `Modifier.clip(shape)` + `ui/shapes/SvgPathShape.kt` (Compose `PathParser`) |
| `@expo/vector-icons` Feather `gift` / `heart` / `list` | `res/drawable/ic_feather_*.xml` (Feather paths as vector drawables) |
| `Image source={{ uri }}` / Skia `useImage`           | `ui/components/RemoteImage.kt` (Coil `AsyncImage`)            |
| `useSafeAreaInsets`                                  | `enableEdgeToEdge()` + `Modifier.safeDrawingPadding()`        |

## Notes

- The infinite carousel travel distance uses the real card pitch (`CARD_WIDTH + CARD_SPACING + columnGap`), so the loop restarts without a visible jump.
- The loop duration scales from 16 seconds to about 16.88 seconds to preserve the reference's scrolling speed while accounting for the track gap.
- Entrance animations use the CSS `ease-in-out` cubic Bézier curve. Subtitle line height and card shadows are tuned to the reference video.
- Font resource names must be lowercase: `caveat_brush_regular.ttf`, `piepie_w01_regular.ttf`.
