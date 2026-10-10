import SwiftUI

// Port of `src/components/card-carousel/types.ts`.

enum ShapeType {
    case scallop
    case rounded
    case circle
    case rectangle
}

struct ShapeCardDescriptor {
    let id: String
    let src: String
    let shape: ShapeType
    let accentColor: Color
}

struct FriendsCardDescriptor {
    let id: String
    let title: String
    let highlight: String
    let collage: [String]
}

struct ShoppingItem {
    let label: String
    var checked: Bool = false
    var muted: Bool = false
}

struct ListCardDescriptor {
    let id: String
    let title: String
    let highlight: String
    let subtitle: String
    let items: [ShoppingItem]
}

enum CardDescriptor: Identifiable {
    case shape(ShapeCardDescriptor)
    case friends(FriendsCardDescriptor)
    case list(ListCardDescriptor)

    var id: String {
        switch self {
        case .shape(let card): return card.id
        case .friends(let card): return card.id
        case .list(let card): return card.id
        }
    }
}
