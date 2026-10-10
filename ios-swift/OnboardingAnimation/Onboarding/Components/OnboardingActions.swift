import SwiftUI

// Port of `src/screens/onboarding/components/onboarding-actions.tsx`.

struct OnboardingActions: View {
    let buttons: [ActionButton]
    var onPress: ((String) -> Void)? = nil

    var body: some View {
        VStack(spacing: 8) {
            ForEach(buttons) { button in
                Button {
                    onPress?(button.id)
                } label: {
                    Text(button.label)
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundStyle(button.variant == .primary ? .white : Color(hex: 0x1A1A2E))
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 18)
                        .background(button.variant == .primary ? Color(hex: 0x02B7FE) : .white)
                        .clipShape(RoundedRectangle(cornerRadius: 30, style: .continuous))
                        .shadow(
                            color: button.variant == .secondary ? .black.opacity(0.1) : .clear,
                            radius: 8,
                            x: 0,
                            y: 2
                        )
                }
                .buttonStyle(OpacityButtonStyle(activeOpacity: 0.85))
            }
        }
        .padding(.horizontal, 32)
        .entrance(from: EntranceTransform(offset: CGSize(width: 0, height: 100)), duration: 0.6)
    }
}

/// Equivalent of `TouchableOpacity` with `activeOpacity`.
struct OpacityButtonStyle: ButtonStyle {
    var activeOpacity: Double = 0.85

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .opacity(configuration.isPressed ? activeOpacity : 1)
            .animation(.easeOut(duration: 0.15), value: configuration.isPressed)
    }
}

#Preview {
    OnboardingActions(buttons: OnboardingConstants.actionButtons)
}
