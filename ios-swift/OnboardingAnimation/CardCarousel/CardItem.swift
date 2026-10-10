import SwiftUI

// Port of `src/components/card-carousel/card-item.tsx`.

struct CardItem: View {
    let card: CardDescriptor
    let isLast: Bool

    var body: some View {
        Group {
            switch card {
            case .shape(let descriptor):
                ShapeCard(src: descriptor.src, shape: descriptor.shape, accentColor: descriptor.accentColor)
            case .friends(let descriptor):
                FriendsCard(title: descriptor.title, highlight: descriptor.highlight, collage: descriptor.collage)
            case .list(let descriptor):
                ListCard(
                    title: descriptor.title,
                    highlight: descriptor.highlight,
                    subtitle: descriptor.subtitle,
                    items: descriptor.items
                )
            }
        }
        .frame(width: CardLayout.width, height: CardLayout.height)
        // shadowColor "#00000030" × shadowOpacity 0.3, offset (0, 4), radius 4.65
        .shadow(color: .black.opacity(0.19 * 0.3), radius: 4.65, x: 0, y: 4)
        .padding(.trailing, isLast ? 0 : CardLayout.spacing)
    }
}
