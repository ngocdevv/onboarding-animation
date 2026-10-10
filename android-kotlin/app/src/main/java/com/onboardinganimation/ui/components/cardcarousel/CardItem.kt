package com.onboardinganimation.ui.components.cardcarousel

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// Port of `src/components/card-carousel/card-item.tsx`.

/** A soft outline shadow matching the light card shadows in the reference. */
val CARD_ELEVATION = 4.dp
val CARD_SHADOW_COLOR = Color.Black.copy(alpha = 0.25f)

@Composable
fun CardItem(card: CardDescriptor, isLast: Boolean, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .padding(end = if (isLast) 0.dp else CARD_SPACING)
            .size(width = CARD_WIDTH, height = CARD_HEIGHT),
    ) {
        when (card) {
            is CardDescriptor.Shape -> ShapeCard(src = card.src, shape = card.shape, accentColor = card.accentColor)
            is CardDescriptor.Friends -> FriendsCard(title = card.title, highlight = card.highlight, collage = card.collage)
            is CardDescriptor.ListCard -> ListCard(
                title = card.title,
                highlight = card.highlight,
                subtitle = card.subtitle,
                items = card.items,
            )
        }
    }
}
