import SwiftUI

// Port of `src/components/card-carousel/constants.ts`.

enum CardLayout {
    static let width: CGFloat = 130
    static let height: CGFloat = 150
    /// `marginRight` applied to every card except the last one.
    static let spacing: CGFloat = 16
    /// `columnGap` of the scroll track.
    static let trackGap: CGFloat = 8
    /// Distance between the leading edges of two consecutive cards.
    static let pitch: CGFloat = width + spacing + trackGap
}

enum CardCatalog {
    private static let collageOne = [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=320&q=80",
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=320&q=80",
        "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=320&q=80",
    ]

    private static let collageTwo = [
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=320&q=80",
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=320&q=80",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80",
    ]

    static let shapeCards: [CardDescriptor] = [
        .shape(ShapeCardDescriptor(
            id: "shape-2",
            src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80",
            shape: .rectangle,
            accentColor: Color(hex: 0xFBCFE8)
        )),
        .shape(ShapeCardDescriptor(
            id: "shape-5",
            src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
            shape: .rectangle,
            accentColor: Color(hex: 0xFDBA74)
        )),
        .shape(ShapeCardDescriptor(
            id: "shape-rectangle",
            src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
            shape: .scallop,
            accentColor: Color(hex: 0xBFDBFE)
        )),
    ]

    static let contentCards: [CardDescriptor] = [
        .friends(FriendsCardDescriptor(
            id: "friends-1",
            title: "Gift your",
            highlight: "Friends",
            collage: collageOne
        )),
        .friends(FriendsCardDescriptor(
            id: "friends-2",
            title: "Celebrate",
            highlight: "Together",
            collage: collageTwo
        )),
        .list(ListCardDescriptor(
            id: "list-2",
            title: "Plan gifts",
            highlight: "gifts",
            subtitle: "surprise",
            items: [
                ShoppingItem(label: "Wireless buds", checked: true),
                ShoppingItem(label: "Polaroid cam", checked: true),
                ShoppingItem(label: "Weekend trip", muted: true),
            ]
        )),
    ]

    static let cards: [CardDescriptor] = shapeCards + contentCards
}
