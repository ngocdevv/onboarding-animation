package com.onboardinganimation.ui.components.cardcarousel

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
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
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.onboardinganimation.R
import com.onboardinganimation.ui.components.RemoteImage

// Port of `src/components/card-carousel/list-card.tsx`.

private val CardShape = RoundedCornerShape(24.dp)

@Composable
fun ListCard(
    title: String,
    highlight: String,
    subtitle: String,
    items: List<ShoppingItem>,
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
            .background(
                Brush.verticalGradient(
                    colors = listOf(Color(0xFF85B0F3), Color(0xFFDA9FD5), Color(0xFFED827D)),
                ),
            )
            .padding(12.dp),
    ) {
        // listHeader
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.Top,
        ) {
            Column {
                Text(
                    text = subtitle.uppercase(),
                    fontSize = 11.sp,
                    lineHeight = 13.sp,
                    fontWeight = FontWeight.Medium,
                    color = Color.White.copy(alpha = 0.6f),
                )
                Text(
                    text = title,
                    fontSize = 9.sp,
                    lineHeight = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White.copy(alpha = 0.92f),
                    modifier = Modifier.padding(top = 2.dp),
                )
            }
            // listBadge
            Box(
                modifier = Modifier
                    .clip(CircleShape)
                    .background(Color.White.copy(alpha = 0.22f))
                    .padding(6.dp),
            ) {
                Icon(
                    painter = painterResource(R.drawable.ic_feather_list),
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier.size(12.dp),
                )
            }
        }

        // listItems: flex 1, justifyContent "space-around"
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(top = 10.dp),
            verticalArrangement = Arrangement.SpaceAround,
        ) {
            items.forEach { item ->
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(12.dp)
                            .border(1.dp, Color.White.copy(alpha = 0.7f), CircleShape),
                    )
                    Text(
                        text = item.label,
                        fontSize = 9.sp,
                        lineHeight = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = Color.White.copy(alpha = if (item.muted) 0.45f else 0.95f),
                        modifier = Modifier.padding(start = 6.dp),
                    )
                }
            }
        }
    }
}

@Preview
@Composable
private fun ListCardPreview() {
    Box(Modifier.size(CARD_WIDTH, CARD_HEIGHT)) {
        ListCard(
            title = "Plan gifts",
            highlight = "gifts",
            subtitle = "surprise",
            items = listOf(
                ShoppingItem(label = "Wireless buds", checked = true),
                ShoppingItem(label = "Polaroid cam", checked = true),
                ShoppingItem(label = "Weekend trip", muted = true),
            ),
        )
    }
}
