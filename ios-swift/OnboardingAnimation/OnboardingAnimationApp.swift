import SwiftUI

// Mirrors `App.tsx` + `index.js`: the root of the app simply renders the onboarding screen.
// Custom fonts are registered through `UIAppFonts` in Info.plist (the SwiftUI equivalent of `useFonts`).
@main
struct OnboardingAnimationApp: App {
    var body: some Scene {
        WindowGroup {
            OnboardingScreen()
        }
    }
}
