import SwiftUI

// Port of `src/screens/onboarding-screen.tsx`.

struct OnboardingScreen: View {
    var body: some View {
        VStack(spacing: 0) {
            // FadeInDown.duration(800).springify()
            Text("GIFTER")
                .font(.custom(AppFont.caveatBrush, size: 15))
                .fontWeight(.bold)
                .kerning(1)
                .multilineTextAlignment(.center)
                .entrance(
                    from: EntranceTransform(offset: CGSize(width: 0, height: -25), opacity: 0),
                    animation: .spring(response: 0.8, dampingFraction: 0.5)
                )

            // contentContainer: flex 1, justifyContent "space-evenly", fades in over 800ms.
            VStack(spacing: 0) {
                Spacer(minLength: 0)

                VStack(spacing: 12) {
                    AnimatedHeadline(lines: OnboardingConstants.headlineLines)

                    Text(OnboardingConstants.subtitleText)
                        .font(.system(size: 14, weight: .medium))
                        .foregroundStyle(Color(hex: 0x002434))
                        .multilineTextAlignment(.center)
                        .entrance(
                            from: EntranceTransform(offset: CGSize(width: 0, height: 200), scale: 2),
                            duration: 0.8
                        )
                }

                Spacer(minLength: 0)

                CardCarousel()

                Spacer(minLength: 0)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .entrance(from: EntranceTransform(opacity: 0), duration: 0.8)

            OnboardingActions(buttons: OnboardingConstants.actionButtons)
                .frame(maxWidth: .infinity)
        }
        // paddingTop: top + 20, paddingBottom: bottom + 8 (safe-area insets are kept by the layout,
        // only the gradient extends under them).
        .padding(.top, 20)
        .padding(.bottom, 8)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(
            LinearGradient(
                gradient: Gradient(stops: OnboardingConstants.gradientStops),
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()
        )
    }
}

#Preview {
    OnboardingScreen()
}
