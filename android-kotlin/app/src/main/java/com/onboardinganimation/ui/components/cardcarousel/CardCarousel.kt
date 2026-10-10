package com.onboardinganimation.ui.components.cardcarousel

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentWidth
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clipToBounds
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.onboardinganimation.ui.animation.EntranceTransform
import com.onboardinganimation.ui.animation.entrance
import kotlin.math.roundToInt

// Port of `src/components/card-carousel/index.tsx`.
//
// 1. The whole track fades in from the right (FadeInRight, 600 ms).
// 2. Each card slides in from `(index + 1) * 300` dp to the right (800 ms, ease-in-out).
// 3. Once the intro finished, the track scrolls left forever at a constant speed and
//    jumps back to the start after one full set of cards (`withRepeat(withSequence(...))`).

@Composable
fun CardCarousel(modifier: Modifier = Modifier) {
    val shuffledCards = remember { shuffleArray(CARDS) }
    val duplicatedCards = remember(shuffledCards) { duplicateForLooping(shuffledCards) }
    var introAnimationFinished by remember { mutableStateOf(false) }
    val translateX = remember { Animatable(0f) }
    val density = LocalDensity.current

    LaunchedEffect(introAnimationFinished) {
        if (!introAnimationFinished) return@LaunchedEffect

        val travelDistance = with(density) { (CARD_PITCH * shuffledCards.size).toPx() }
        // Keep the demo's speed while including the track gap in the seamless loop distance.
        val loopDurationMillis = (16_000f * CARD_PITCH.value / (CARD_WIDTH + CARD_SPACING).value).roundToInt()
        translateX.snapTo(0f)
        translateX.animateTo(
            targetValue = -travelDistance,
            animationSpec = infiniteRepeatable(
                animation = tween(durationMillis = loopDurationMillis, easing = LinearEasing),
                repeatMode = RepeatMode.Restart,
            ),
        )
    }

    // carouselContainer: width 100%, overflow hidden, paddingVertical 12
    Box(
        modifier = modifier
            .fillMaxWidth()
            .clipToBounds()
            .padding(vertical = 12.dp),
    ) {
        // scrollTrack
        Row(
            horizontalArrangement = Arrangement.spacedBy(TRACK_GAP),
            modifier = Modifier
                .wrapContentWidth(align = Alignment.Start, unbounded = true)
                .entrance(
                    from = EntranceTransform(offsetX = 25f, alpha = 0f),
                    durationMillis = 600,
                    onFinished = { introAnimationFinished = true },
                )
                .graphicsLayer { translationX = translateX.value },
        ) {
            duplicatedCards.forEachIndexed { index, card ->
                Box(
                    modifier = Modifier.entrance(
                        from = EntranceTransform(offsetX = (index + 1) * 300f, alpha = 0f),
                        durationMillis = 800,
                    ),
                ) {
                    CardItem(card = card, isLast = index == duplicatedCards.lastIndex)
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun CardCarouselPreview() {
    CardCarousel()
}
