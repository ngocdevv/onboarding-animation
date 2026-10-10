package com.onboardinganimation.ui.components.cardcarousel

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// Port of `src/components/card-carousel/constants.ts`.

val CARD_WIDTH = 130.dp
val CARD_HEIGHT = 150.dp

/** `marginRight` applied to every card except the last one. */
val CARD_SPACING = 16.dp

/** `columnGap` of the scroll track. */
val TRACK_GAP = 8.dp

/** Distance between the leading edges of two consecutive cards. */
val CARD_PITCH = CARD_WIDTH + CARD_SPACING + TRACK_GAP

private val collageOne = listOf(
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=320&q=80",
    "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=320&q=80",
    "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=320&q=80",
)

private val collageTwo = listOf(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=320&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=320&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80",
)

val SHAPE_CARDS: List<CardDescriptor> = listOf(
    CardDescriptor.Shape(
        id = "shape-2",
        src = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80",
        shape = ShapeType.Rectangle,
        accentColor = Color(0xFFFBCFE8),
    ),
    CardDescriptor.Shape(
        id = "shape-5",
        src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        shape = ShapeType.Rectangle,
        accentColor = Color(0xFFFDBA74),
    ),
    CardDescriptor.Shape(
        id = "shape-rectangle",
        src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
        shape = ShapeType.Scallop,
        accentColor = Color(0xFFBFDBFE),
    ),
)

val CONTENT_CARDS: List<CardDescriptor> = listOf(
    CardDescriptor.Friends(
        id = "friends-1",
        title = "Gift your",
        highlight = "Friends",
        collage = collageOne,
    ),
    CardDescriptor.Friends(
        id = "friends-2",
        title = "Celebrate",
        highlight = "Together",
        collage = collageTwo,
    ),
    CardDescriptor.ListCard(
        id = "list-2",
        title = "Plan gifts",
        highlight = "gifts",
        subtitle = "surprise",
        items = listOf(
            ShoppingItem(label = "Wireless buds", checked = true),
            ShoppingItem(label = "Polaroid cam", checked = true),
            ShoppingItem(label = "Weekend trip", muted = true),
        ),
    ),
)

val CARDS: List<CardDescriptor> = SHAPE_CARDS + CONTENT_CARDS
