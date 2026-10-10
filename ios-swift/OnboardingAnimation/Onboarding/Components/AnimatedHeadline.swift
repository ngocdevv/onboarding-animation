import SwiftUI

// Port of `src/screens/onboarding/components/animated-headline.tsx`.
// Every character (and avatar) flies in from its own offset at 3× scale.

struct AnimatedHeadline: View {
    let lines: [HeadlineLine]
    var font: Font = .custom(AppFont.piepie, size: 28)
    var textColor: Color = Color(hex: 0x002434)
    var lineHeight: CGFloat = 36
    var avatarSize: CGFloat = 28

    var body: some View {
        VStack(spacing: 4) {
            ForEach(lines) { line in
                HStack(spacing: 0) {
                    ForEach(Array(line.segments.enumerated()), id: \.offset) { _, segment in
                        segmentView(segment)
                    }
                }
            }
        }
    }

    @ViewBuilder
    private func segmentView(_ segment: HeadlineSegment) -> some View {
        switch segment {
        case .words(let words):
            HStack(spacing: 4) {
                ForEach(Array(words.enumerated()), id: \.offset) { _, word in
                    characters(of: word.text, offsets: word.offsets)
                }
            }
        case .text(let text, let offsets):
            characters(of: text, offsets: offsets)
        case .avatars(let sources, let offsets):
            AvatarSegment(sources: sources, offsets: offsets, size: avatarSize)
        }
    }

    private func characters(of text: String, offsets: [CharacterOffset]) -> some View {
        HStack(spacing: 0) {
            ForEach(Array(text.enumerated()), id: \.offset) { index, character in
                AnimatedCharacter(
                    character: character,
                    offset: index < offsets.count ? offsets[index] : .zero,
                    font: font,
                    color: textColor,
                    lineHeight: lineHeight
                )
            }
        }
    }
}

private struct AnimatedCharacter: View {
    let character: Character
    let offset: CharacterOffset
    let font: Font
    let color: Color
    let lineHeight: CGFloat

    var body: some View {
        Text(String(character))
            .font(font)
            .foregroundStyle(color)
            .frame(height: lineHeight)
            .entrance(
                from: EntranceTransform(offset: CGSize(width: offset.x, height: offset.y), scale: 3),
                duration: 0.8
            )
    }
}

private struct AvatarSegment: View {
    let sources: [String]
    let offsets: [CharacterOffset]
    let size: CGFloat

    var body: some View {
        HStack(spacing: -10) {
            ForEach(Array(sources.enumerated()), id: \.offset) { index, source in
                RemoteImage(url: source)
                    .frame(width: size, height: size)
                    .clipShape(Circle())
                    .overlay(Circle().stroke(.white, lineWidth: 1))
                    .entrance(
                        from: EntranceTransform(
                            offset: index < offsets.count
                                ? CGSize(width: offsets[index].x, height: offsets[index].y)
                                : .zero,
                            scale: 3
                        ),
                        duration: 0.8
                    )
            }
        }
        .padding(.horizontal, 2)
    }
}

#Preview {
    AnimatedHeadline(lines: OnboardingConstants.headlineLines)
        .padding()
}
