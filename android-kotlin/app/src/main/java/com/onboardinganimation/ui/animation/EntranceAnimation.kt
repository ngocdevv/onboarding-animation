package com.onboardinganimation.ui.animation

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.AnimationSpec
import androidx.compose.animation.core.Easing
import androidx.compose.animation.core.CubicBezierEasing
import androidx.compose.animation.core.tween
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.unit.dp

/**
 * The starting state of an entrance animation.
 *
 * Compose equivalent of the CSS-style keyframes used in the React Native source:
 * ```ts
 * animationName: { from: { transform: [{ translateY }, { translateX }, { scale }], opacity }, to: { …identity } }
 * ```
 * Offsets are in dp, exactly like the RN values.
 */
data class EntranceTransform(
    val offsetX: Float = 0f,
    val offsetY: Float = 0f,
    val scale: Float = 1f,
    val alpha: Float = 1f,
) {
    companion object {
        val Identity = EntranceTransform()
    }
}

/** CSS `ease-in-out` */
val EaseInOut: Easing = CubicBezierEasing(0.42f, 0f, 0.58f, 1f)

/**
 * Animates the composable from [from] to its natural state the first time it is composed.
 *
 * @param durationMillis length of the ease-in-out tween (ignored when [animationSpec] is supplied).
 * @param animationSpec custom spec (e.g. a spring) overriding the default tween.
 * @param onFinished called once the entrance animation completes (mirrors Reanimated's `withCallback`).
 */
@Composable
fun Modifier.entrance(
    from: EntranceTransform,
    durationMillis: Int = 800,
    delayMillis: Int = 0,
    animationSpec: AnimationSpec<Float>? = null,
    onFinished: (() -> Unit)? = null,
): Modifier {
    val progress = remember { Animatable(0f) }

    LaunchedEffect(Unit) {
        progress.animateTo(
            targetValue = 1f,
            animationSpec = animationSpec ?: tween(
                durationMillis = durationMillis,
                delayMillis = delayMillis,
                easing = EaseInOut,
            ),
        )
        onFinished?.invoke()
    }

    return this.graphicsLayer {
        val remaining = 1f - progress.value
        // Same composition order as RN's `transform: [{ translateY }, { translateX }, { scale }]`.
        translationX = (from.offsetX * remaining).dp.toPx()
        translationY = (from.offsetY * remaining).dp.toPx()
        val scale = 1f + (from.scale - 1f) * remaining
        scaleX = scale
        scaleY = scale
        alpha = 1f + (from.alpha - 1f) * remaining
    }
}
