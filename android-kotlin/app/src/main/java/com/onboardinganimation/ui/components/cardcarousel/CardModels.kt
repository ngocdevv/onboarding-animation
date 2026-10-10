package com.onboardinganimation.ui.components.cardcarousel

import androidx.compose.ui.graphics.Color

// Port of `src/components/card-carousel/types.ts`.

enum class ShapeType { Scallop, Rounded, Circle, Rectangle }

data class ShoppingItem(
    val label: String,
    val checked: Boolean = false,
    val muted: Boolean = false,
)

sealed interface CardDescriptor {
    val id: String

    data class Shape(
        override val id: String,
        val src: String,
        val shape: ShapeType,
        val accentColor: Color,
    ) : CardDescriptor

    data class Friends(
        override val id: String,
        val title: String,
        val highlight: String,
        val collage: List<String>,
    ) : CardDescriptor

    data class ListCard(
        override val id: String,
        val title: String,
        val highlight: String,
        val subtitle: String,
        val items: List<ShoppingItem>,
    ) : CardDescriptor
}
