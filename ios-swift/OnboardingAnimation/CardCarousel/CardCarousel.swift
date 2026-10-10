import SwiftUI

// Port of `src/components/card-carousel/index.tsx`.
//
// 1. The whole track fades in from the right (FadeInRight, 600 ms).
// 2. Each card slides in from `(index + 1) * 300` points to the right (800 ms, ease-in-out).
// 3. Once the intro finished, the track scrolls left forever at a constant speed and
//    jumps back to the start after one full set of cards (`withRepeat(withSequence(...))`).

struct CardCarousel: View {
    @State private var shuffledCards: [CardDescriptor] = shuffleArray(CardCatalog.cards)
    @State private var translateX: CGFloat = 0
    @State private var introAnimationFinished = false

    private var duplicatedCards: [CardDescriptor] {
        duplicateForLooping(shuffledCards)
    }

    var body: some View {
        let cards = duplicatedCards

        // carouselContainer: width 100%, overflow hidden, paddingVertical 12.
        // The track is wider than the screen, so it is drawn as an overlay: the container keeps
        // the proposed width instead of growing to the track's intrinsic size.
        Color.clear
            .frame(height: CardLayout.height)
            .overlay(alignment: .leading) {
                HStack(spacing: CardLayout.trackGap) {
                    ForEach(Array(cards.enumerated()), id: \.offset) { index, card in
                        CardItem(card: card, isLast: index == cards.count - 1)
                            .entrance(
                                from: EntranceTransform(
                                    offset: CGSize(width: CGFloat(index + 1) * 300, height: 0),
                                    opacity: 0
                                ),
                                duration: 0.8
                            )
                    }
                }
                .fixedSize(horizontal: true, vertical: false)
                .offset(x: translateX)
            }
            .padding(.vertical, 12)
            .clipped()
            .entrance(
                from: EntranceTransform(offset: CGSize(width: 25, height: 0), opacity: 0),
                duration: 0.6
            ) {
                introAnimationFinished = true
            }
            .onChange(of: introAnimationFinished) { _, finished in
                if finished {
                    startLooping()
                }
            }
    }

    private func startLooping() {
        let travelDistance = CGFloat(shuffledCards.count) * CardLayout.pitch

        var transaction = Transaction()
        transaction.disablesAnimations = true
        withTransaction(transaction) {
            translateX = 0
        }

        withAnimation(.linear(duration: 16).repeatForever(autoreverses: false)) {
            translateX = -travelDistance
        }
    }
}

#Preview {
    CardCarousel()
}
