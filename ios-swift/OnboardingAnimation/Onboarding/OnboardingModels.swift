import SwiftUI

// Port of `src/screens/onboarding/constants.ts`.

struct CharacterOffset {
    var x: CGFloat
    var y: CGFloat

    static let zero = CharacterOffset(x: 0, y: 0)
}

struct HeadlineWord {
    let text: String
    let offsets: [CharacterOffset]
}

enum HeadlineSegment {
    case words([HeadlineWord])
    case text(String, offsets: [CharacterOffset])
    case avatars(sources: [String], offsets: [CharacterOffset])
}

struct HeadlineLine: Identifiable {
    let id: String
    let segments: [HeadlineSegment]
}

struct ActionButton: Identifiable {
    enum Variant {
        case primary
        case secondary
    }

    let id: String
    let label: String
    let variant: Variant
}

enum OnboardingConstants {
    static let gradientStops: [Gradient.Stop] = [
        .init(color: Color(hex: 0xE0D4F2), location: 0),
        .init(color: Color(hex: 0xFFFFFF), location: 0.55),
        .init(color: Color(hex: 0xE8F5E9), location: 1),
    ]

    static let headlineLines: [HeadlineLine] = [
        HeadlineLine(
            id: "headline-primary",
            segments: [
                .words([
                    HeadlineWord(
                        text: "See",
                        offsets: [
                            CharacterOffset(x: -80, y: 40),
                            CharacterOffset(x: -60, y: 200),
                            CharacterOffset(x: 100, y: 220),
                        ]
                    ),
                    HeadlineWord(
                        text: "what",
                        offsets: [
                            CharacterOffset(x: -120, y: -40),
                            CharacterOffset(x: 140, y: 140),
                            CharacterOffset(x: 170, y: 170),
                            CharacterOffset(x: 190, y: 190),
                        ]
                    ),
                    HeadlineWord(
                        text: "your",
                        offsets: [
                            CharacterOffset(x: 120, y: 160),
                            CharacterOffset(x: 160, y: 220),
                            CharacterOffset(x: -80, y: 180),
                            CharacterOffset(x: 150, y: 240),
                        ]
                    ),
                ]),
            ]
        ),
        HeadlineLine(
            id: "headline-secondary",
            segments: [
                .text(
                    "friends",
                    offsets: [
                        CharacterOffset(x: -80, y: 40),
                        CharacterOffset(x: -60, y: 200),
                        CharacterOffset(x: 100, y: 220),
                        CharacterOffset(x: -120, y: -40),
                        CharacterOffset(x: 140, y: 140),
                        CharacterOffset(x: 170, y: 170),
                        CharacterOffset(x: 190, y: 190),
                    ]
                ),
                .avatars(
                    sources: [
                        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=320&q=80",
                        "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=320&q=80",
                        "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=320&q=80",
                    ],
                    offsets: [
                        CharacterOffset(x: -60, y: 120),
                        CharacterOffset(x: 100, y: 140),
                        CharacterOffset(x: 200, y: 140),
                    ]
                ),
                .text(
                    "want",
                    offsets: [
                        CharacterOffset(x: 120, y: 160),
                        CharacterOffset(x: 160, y: 220),
                        CharacterOffset(x: -80, y: 180),
                        CharacterOffset(x: 150, y: 240),
                    ]
                ),
            ]
        ),
    ]

    static let subtitleText = "Your friends' wish lists are waiting\n— sneak a look and spread the joy!"

    static let actionButtons: [ActionButton] = [
        ActionButton(id: "find-friends", label: "Find Friends", variant: .secondary),
        ActionButton(id: "create-account", label: "Create an account", variant: .primary),
    ]
}
