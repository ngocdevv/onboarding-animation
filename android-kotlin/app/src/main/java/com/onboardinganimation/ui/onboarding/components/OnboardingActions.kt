package com.onboardinganimation.ui.onboarding.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.onboardinganimation.ui.animation.EntranceTransform
import com.onboardinganimation.ui.animation.entrance
import com.onboardinganimation.ui.onboarding.ACTION_BUTTONS
import com.onboardinganimation.ui.onboarding.ActionButton
import com.onboardinganimation.ui.onboarding.ActionButtonVariant

// Port of `src/screens/onboarding/components/onboarding-actions.tsx`.

private val ButtonShape = RoundedCornerShape(30.dp)

@Composable
fun OnboardingActions(
    buttons: List<ActionButton>,
    modifier: Modifier = Modifier,
    primaryTextStyle: TextStyle = TextStyle.Default,
    secondaryTextStyle: TextStyle = TextStyle.Default,
    onPress: ((String) -> Unit)? = null,
) {
    Column(
        modifier = modifier
            // createEntranceAnimation(): translateY 100 → 0 over 600 ms
            .entrance(from = EntranceTransform(offsetY = 100f), durationMillis = 600)
            .padding(horizontal = 32.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        buttons.forEach { button ->
            val isPrimary = button.variant == ActionButtonVariant.Primary
            ActionButtonView(
                label = button.label,
                isPrimary = isPrimary,
                textStyle = if (isPrimary) primaryTextStyle else secondaryTextStyle,
                onClick = { onPress?.invoke(button.id) },
            )
        }
    }
}

/** Equivalent of `TouchableOpacity activeOpacity={0.85}`. */
@Composable
private fun ActionButtonView(
    label: String,
    isPrimary: Boolean,
    textStyle: TextStyle,
    onClick: () -> Unit,
) {
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()

    Box(
        contentAlignment = Alignment.Center,
        modifier = Modifier
            .fillMaxWidth()
            .alpha(if (isPressed) 0.85f else 1f)
            .then(
                if (isPrimary) Modifier
                else Modifier.shadow(elevation = 3.dp, shape = ButtonShape, ambientColor = Color.Black.copy(alpha = 0.1f), spotColor = Color.Black.copy(alpha = 0.1f))
            )
            .clip(ButtonShape)
            .background(if (isPrimary) Color(0xFF02B7FE) else Color.White)
            .clickable(interactionSource = interactionSource, indication = null, onClick = onClick)
            .padding(vertical = 18.dp),
    ) {
        Text(
            text = label,
            style = textStyle.merge(
                TextStyle(
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = if (isPrimary) Color.White else Color(0xFF1A1A2E),
                ),
            ),
        )
    }
}

@Preview(showBackground = true)
@Composable
private fun OnboardingActionsPreview() {
    OnboardingActions(buttons = ACTION_BUTTONS, modifier = Modifier.fillMaxWidth().padding(vertical = 16.dp))
}
