package com.onboardinganimation.ui.onboarding

import androidx.compose.ui.graphics.Color

// Port of `src/screens/onboarding/constants.ts`.

data class CharacterOffset(val x: Float, val y: Float) {
    companion object {
        val Zero = CharacterOffset(0f, 0f)
    }
}

data class HeadlineWord(val text: String, val offsets: List<CharacterOffset>)

sealed interface HeadlineSegment {
    data class Words(val words: List<HeadlineWord>) : HeadlineSegment
    data class Text(val text: String, val offsets: List<CharacterOffset>) : HeadlineSegment
    data class Avatars(val sources: List<String>, val offsets: List<CharacterOffset>) : HeadlineSegment
}

data class HeadlineLine(val id: String, val segments: List<HeadlineSegment>)

enum class ActionButtonVariant { Primary, Secondary }

data class ActionButton(val id: String, val label: String, val variant: ActionButtonVariant)

val GRADIENT_COLORS = listOf(Color(0xFFE0D4F2), Color(0xFFFFFFFF), Color(0xFFE8F5E9))
val GRADIENT_LOCATIONS = listOf(0f, 0.55f, 1f)

val HEADLINE_LINES: List<HeadlineLine> = listOf(
    HeadlineLine(
        id = "headline-primary",
        segments = listOf(
            HeadlineSegment.Words(
                words = listOf(
                    HeadlineWord(
                        text = "See",
                        offsets = listOf(
                            CharacterOffset(-80f, 40f),
                            CharacterOffset(-60f, 200f),
                            CharacterOffset(100f, 220f),
                        ),
                    ),
                    HeadlineWord(
                        text = "what",
                        offsets = listOf(
                            CharacterOffset(-120f, -40f),
                            CharacterOffset(140f, 140f),
                            CharacterOffset(170f, 170f),
                            CharacterOffset(190f, 190f),
                        ),
                    ),
                    HeadlineWord(
                        text = "your",
                        offsets = listOf(
                            CharacterOffset(120f, 160f),
                            CharacterOffset(160f, 220f),
                            CharacterOffset(-80f, 180f),
                            CharacterOffset(150f, 240f),
                        ),
                    ),
                ),
            ),
        ),
    ),
    HeadlineLine(
        id = "headline-secondary",
        segments = listOf(
            HeadlineSegment.Text(
                text = "friends",
                offsets = listOf(
                    CharacterOffset(-80f, 40f),
                    CharacterOffset(-60f, 200f),
                    CharacterOffset(100f, 220f),
                    CharacterOffset(-120f, -40f),
                    CharacterOffset(140f, 140f),
                    CharacterOffset(170f, 170f),
                    CharacterOffset(190f, 190f),
                ),
            ),
            HeadlineSegment.Avatars(
                sources = listOf(
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=320&q=80",
                    "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=320&q=80",
                    "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=320&q=80",
                ),
                offsets = listOf(
                    CharacterOffset(-60f, 120f),
                    CharacterOffset(100f, 140f),
                    CharacterOffset(200f, 140f),
                ),
            ),
            HeadlineSegment.Text(
                text = "want",
                offsets = listOf(
                    CharacterOffset(120f, 160f),
                    CharacterOffset(160f, 220f),
                    CharacterOffset(-80f, 180f),
                    CharacterOffset(150f, 240f),
                ),
            ),
        ),
    ),
)

const val SUBTITLE_TEXT = "Your friends' wish lists are waiting\n— sneak a look and spread the joy!"

val ACTION_BUTTONS: List<ActionButton> = listOf(
    ActionButton(id = "find-friends", label = "Find Friends", variant = ActionButtonVariant.Secondary),
    ActionButton(id = "create-account", label = "Create an account", variant = ActionButtonVariant.Primary),
)
