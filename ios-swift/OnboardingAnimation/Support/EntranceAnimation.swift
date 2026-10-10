import SwiftUI

/// The starting state of an entrance animation.
///
/// This is the Swift equivalent of the CSS-style keyframes used in the React Native source:
/// ```ts
/// animationName: { from: { transform: [{ translateY }, { translateX }, { scale }], opacity }, to: { ... identity } }
/// ```
struct EntranceTransform {
    var offset: CGSize = .zero
    var scale: CGFloat = 1
    var opacity: Double = 1

    static let identity = EntranceTransform()
}

private struct EntranceAnimationModifier: ViewModifier {
    let from: EntranceTransform
    let animation: Animation
    let onFinished: (() -> Void)?

    @State private var isSettled = false

    func body(content: Content) -> some View {
        content
            // Same composition order as RN's `transform: [{ translateY }, { translateX }, { scale }]`:
            // scale around the centre first, then translate.
            .scaleEffect(isSettled ? 1 : from.scale)
            .offset(isSettled ? .zero : from.offset)
            .opacity(isSettled ? 1 : from.opacity)
            .onAppear {
                guard !isSettled else { return }
                withAnimation(animation) {
                    isSettled = true
                } completion: {
                    onFinished?()
                }
            }
    }
}

extension View {
    /// Animates the view from `from` to its natural state when it first appears.
    ///
    /// - Parameters:
    ///   - from: Starting offset / scale / opacity.
    ///   - duration: Length of the ease-in-out timing curve (ignored when `animation` is supplied).
    ///   - animation: Custom animation (e.g. a spring) overriding the default ease-in-out curve.
    ///   - onFinished: Called once the entrance animation completes (mirrors Reanimated's `withCallback`).
    func entrance(
        from: EntranceTransform,
        duration: Double = 0.8,
        animation: Animation? = nil,
        onFinished: (() -> Void)? = nil
    ) -> some View {
        modifier(
            EntranceAnimationModifier(
                from: from,
                animation: animation ?? .easeInOut(duration: duration),
                onFinished: onFinished
            )
        )
    }
}
