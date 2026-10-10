package com.onboardinganimation.ui.components.cardcarousel

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.onboardinganimation.R
import com.onboardinganimation.ui.components.RemoteImage

// Port of `src/components/card-carousel/friends-card.tsx`.

private val CardShape = RoundedCornerShape(24.dp)
private val CollageShape = RoundedCornerShape(12.dp)

@Composable
fun FriendsCard(
    title: String,
    highlight: String,
    collage: List<String>,
    modifier: Modifier = Modifier,
) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .shadow(
                CARD_ELEVATION,
                CardShape,
                clip = false,
                ambientColor = CARD_SHADOW_COLOR,
                spotColor = CARD_SHADOW_COLOR,
            )
            .clip(CardShape)
            .background(Color.White)
            .padding(12.dp),
    ) {
        Text(
            text = title,
            fontSize = 10.sp,
            lineHeight = 12.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color(0xFF9CA3AF),
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth(),
        )
        Text(
            text = highlight,
            fontSize = 10.sp,
            lineHeight = 12.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF111827),
            textAlign = TextAlign.Center,
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 2.dp),
        )

        // collageStage
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(top = 12.dp),
        ) {
            CollageCard(
                url = collage.getOrNull(0),
                background = Color(0xFFEBF4FF),
                rotation = -12f,
                modifier = Modifier
                    .align(Alignment.TopStart)
                    .offset(x = 3.dp, y = 18.dp),
            )
            CollageCard(
                url = collage.getOrNull(1),
                background = Color(0xFFFEE2E2),
                rotation = 8f,
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .offset(x = (-8).dp, y = 6.dp),
            )
            CollageCard(
                url = collage.getOrNull(2),
                background = Color(0xFFFFF7ED),
                rotation = 12f,
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .offset(y = (-8).dp),
            )

            Bubble(
                iconRes = R.drawable.ic_feather_gift,
                colors = listOf(Color(0xFF60A5FA), Color(0xFFA855F7)),
                modifier = Modifier
                    .align(Alignment.BottomStart)
                    .offset(x = 8.dp, y = (-8).dp),
            )
            Bubble(
                iconRes = R.drawable.ic_feather_heart,
                colors = listOf(Color(0xFFF472B6), Color(0xFFF97316)),
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .offset(x = (-6).dp, y = 4.dp),
            )
        }
    }
}

@Composable
private fun CollageCard(
    url: String?,
    background: Color,
    rotation: Float,
    modifier: Modifier = Modifier,
) {
    Box(
        modifier = modifier
            .size(width = 50.dp, height = 60.dp)
            .rotate(rotation)
            .clip(CollageShape)
            .background(background),
    ) {
        if (url != null) {
            RemoteImage(url = url, modifier = Modifier.fillMaxSize(), placeholderColor = background)
        }
    }
}

/** 20 dp gradient circle with a Feather icon — start {x:0,y:1} → end {x:1,y:0}. */
@Composable
private fun Bubble(
    iconRes: Int,
    colors: List<Color>,
    modifier: Modifier = Modifier,
    size: Dp = 20.dp,
) {
    Box(
        contentAlignment = Alignment.Center,
        modifier = modifier
            .size(size)
            .clip(CircleShape)
            .background(
                Brush.linearGradient(
                    colors = colors,
                    start = Offset(0f, Float.POSITIVE_INFINITY),
                    end = Offset(Float.POSITIVE_INFINITY, 0f),
                ),
            ),
    ) {
        Icon(
            painter = painterResource(iconRes),
            contentDescription = null,
            tint = Color.White,
            modifier = Modifier.size(12.dp),
        )
    }
}

@Preview
@Composable
private fun FriendsCardPreview() {
    Box(Modifier.size(CARD_WIDTH, CARD_HEIGHT)) {
        FriendsCard(
            title = "Gift your",
            highlight = "Friends",
            collage = listOf(
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=320&q=80",
                "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=320&q=80",
                "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=320&q=80",
            ),
        )
    }
}
