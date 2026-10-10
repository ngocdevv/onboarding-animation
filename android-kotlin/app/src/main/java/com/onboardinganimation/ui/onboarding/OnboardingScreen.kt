package com.onboardinganimation.ui.onboarding

import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.onboardinganimation.ui.animation.EntranceTransform
import com.onboardinganimation.ui.animation.entrance
import com.onboardinganimation.ui.components.cardcarousel.CardCarousel
import com.onboardinganimation.ui.onboarding.components.AnimatedHeadline
import com.onboardinganimation.ui.onboarding.components.OnboardingActions
import com.onboardinganimation.ui.theme.AppFonts

// Port of `src/screens/onboarding-screen.tsx`.

@Composable
fun OnboardingScreen(modifier: Modifier = Modifier) {
    val gradient = Brush.verticalGradient(
        colorStops = GRADIENT_LOCATIONS.zip(GRADIENT_COLORS) { location, color -> location to color }.toTypedArray(),
    )

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(gradient),
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                // paddingTop: top + 20, paddingBottom: bottom + 8
                .safeDrawingPadding()
                .padding(top = 20.dp, bottom = 8.dp),
        ) {
            // FadeInDown.duration(800).springify()
            Text(
                text = "GIFTER",
                fontFamily = AppFonts.CaveatBrush,
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 1.sp,
                textAlign = TextAlign.Center,
                color = Color(0xFF002434),
                modifier = Modifier
                    .fillMaxWidth()
                    .entrance(
                        from = EntranceTransform(offsetY = -25f, alpha = 0f),
                        animationSpec = spring(dampingRatio = 0.5f, stiffness = Spring.StiffnessLow),
                    ),
            )

            // contentContainer: flex 1, justifyContent "space-evenly", fades in over 800 ms.
            Column(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxWidth()
                    .entrance(from = EntranceTransform(alpha = 0f), durationMillis = 800),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.SpaceEvenly,
            ) {
                // heroContent
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(12.dp),
                ) {
                    AnimatedHeadline(lines = HEADLINE_LINES)

                    Text(
                        text = SUBTITLE_TEXT,
                        fontSize = 14.sp,
                        lineHeight = 17.sp,
                        fontWeight = FontWeight.Medium,
                        color = Color(0xFF002434),
                        textAlign = TextAlign.Center,
                        modifier = Modifier.entrance(
                            from = EntranceTransform(offsetY = 200f, scale = 2f),
                            durationMillis = 800,
                        ),
                    )
                }

                CardCarousel()
            }

            OnboardingActions(
                buttons = ACTION_BUTTONS,
                modifier = Modifier.fillMaxWidth(),
            )
        }
    }
}

@Preview(showBackground = true, showSystemUi = true)
@Composable
private fun OnboardingScreenPreview() {
    OnboardingScreen()
}
