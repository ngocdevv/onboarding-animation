package com.onboardinganimation.ui.onboarding.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.onboardinganimation.ui.animation.EntranceTransform
import com.onboardinganimation.ui.animation.entrance
import com.onboardinganimation.ui.components.RemoteImage
import com.onboardinganimation.ui.onboarding.CharacterOffset
import com.onboardinganimation.ui.onboarding.HEADLINE_LINES
import com.onboardinganimation.ui.onboarding.HeadlineLine
import com.onboardinganimation.ui.onboarding.HeadlineSegment
import com.onboardinganimation.ui.onboarding.HeadlineWord
import com.onboardinganimation.ui.theme.AppFonts

// Port of `src/screens/onboarding/components/animated-headline.tsx`.
// Every character (and avatar) flies in from its own offset at 3× scale.

private val DefaultHeadlineTextStyle = TextStyle(
    fontFamily = AppFonts.Piepie,
    fontSize = 28.sp,
    lineHeight = 36.sp,
    color = Color(0xFF002434),
    textAlign = TextAlign.Center,
)

@Composable
fun AnimatedHeadline(
    lines: List<HeadlineLine>,
    modifier: Modifier = Modifier,
    textStyle: TextStyle = DefaultHeadlineTextStyle,
    avatarSize: Dp = 28.dp,
) {
    Column(
        modifier = modifier,
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        lines.forEach { line ->
            Row(verticalAlignment = Alignment.CenterVertically) {
                line.segments.forEach { segment ->
                    when (segment) {
                        is HeadlineSegment.Words -> WordsSegment(segment.words, textStyle)
                        is HeadlineSegment.Text -> TextSegment(segment.text, segment.offsets, textStyle)
                        is HeadlineSegment.Avatars -> AvatarSegment(segment.sources, segment.offsets, avatarSize)
                    }
                }
            }
        }
    }
}

@Composable
private fun WordsSegment(words: List<HeadlineWord>, textStyle: TextStyle) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        words.forEach { word -> TextSegment(word.text, word.offsets, textStyle) }
    }
}

@Composable
private fun TextSegment(text: String, offsets: List<CharacterOffset>, textStyle: TextStyle) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        text.forEachIndexed { index, char ->
            AnimatedCharacter(
                char = char,
                offset = offsets.getOrElse(index) { CharacterOffset.Zero },
                textStyle = textStyle,
            )
        }
    }
}

@Composable
private fun AnimatedCharacter(char: Char, offset: CharacterOffset, textStyle: TextStyle) {
    Text(
        text = char.toString(),
        style = textStyle,
        modifier = Modifier.entrance(
            from = EntranceTransform(offsetX = offset.x, offsetY = offset.y, scale = 3f),
            durationMillis = 800,
        ),
    )
}

@Composable
private fun AvatarSegment(sources: List<String>, offsets: List<CharacterOffset>, avatarSize: Dp) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy((-10).dp),
        modifier = Modifier.padding(horizontal = 2.dp),
    ) {
        sources.forEachIndexed { index, source ->
            val offset = offsets.getOrElse(index) { CharacterOffset.Zero }
            RemoteImage(
                url = source,
                modifier = Modifier
                    .entrance(
                        from = EntranceTransform(offsetX = offset.x, offsetY = offset.y, scale = 3f),
                        durationMillis = 800,
                    )
                    .size(avatarSize)
                    .clip(CircleShape)
                    .border(BorderStroke(1.dp, Color.White), CircleShape),
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun AnimatedHeadlinePreview() {
    AnimatedHeadline(lines = HEADLINE_LINES, modifier = Modifier.padding(16.dp))
}
