package com.onboardinganimation

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.onboardinganimation.ui.onboarding.OnboardingScreen
import com.onboardinganimation.ui.theme.OnboardingAnimationTheme

/**
 * Port of `App.tsx` / `index.js`: the root simply renders the onboarding screen.
 * `enableEdgeToEdge()` mirrors `"edgeToEdgeEnabled": true` in app.json; the screen
 * itself reads the system-bar insets (RN `useSafeAreaInsets`).
 */
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            OnboardingAnimationTheme {
                OnboardingScreen()
            }
        }
    }
}
