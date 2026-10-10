package com.onboardinganimation.ui.components

import androidx.compose.foundation.background
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import coil3.compose.AsyncImage

/**
 * Loads an image from a URL and crops it to fill its bounds — the equivalent of
 * `<Image resizeMode="cover">` / Skia `fit="cover"` in the React Native source.
 */
@Composable
fun RemoteImage(
    url: String,
    modifier: Modifier = Modifier,
    placeholderColor: Color = Color(0xFFE5E7EB),
) {
    AsyncImage(
        model = url,
        contentDescription = null,
        contentScale = ContentScale.Crop,
        modifier = modifier.background(placeholderColor),
    )
}
