import SwiftUI

// Port of `src/components/card-carousel/friends-card.tsx`.

struct FriendsCard: View {
    let title: String
    let highlight: String
    let collage: [String]

    var body: some View {
        VStack(spacing: 0) {
            VStack(spacing: 2) {
                Text(title)
                    .font(.system(size: 10, weight: .semibold))
                    .foregroundStyle(Color(hex: 0x9CA3AF))
                Text(highlight)
                    .font(.system(size: 10, weight: .bold))
                    .foregroundStyle(Color(hex: 0x111827))
            }
            .multilineTextAlignment(.center)

            // collageStage
            ZStack {
                collageCard(url: collage[safe: 0], background: Color(hex: 0xEBF4FF), rotation: -12)
                    .padding(EdgeInsets(top: 18, leading: 3, bottom: 0, trailing: 0))
                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)

                collageCard(url: collage[safe: 1], background: Color(hex: 0xFEE2E2), rotation: 8)
                    .padding(EdgeInsets(top: 6, leading: 0, bottom: 0, trailing: 8))
                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topTrailing)

                collageCard(url: collage[safe: 2], background: Color(hex: 0xFFF7ED), rotation: 12)
                    .padding(.bottom, 8)
                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottom)

                bubble(systemImage: "gift", colors: [Color(hex: 0x60A5FA), Color(hex: 0xA855F7)])
                    .padding(EdgeInsets(top: 0, leading: 8, bottom: 8, trailing: 0))
                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomLeading)

                bubble(systemImage: "heart", colors: [Color(hex: 0xF472B6), Color(hex: 0xF97316)])
                    .padding(EdgeInsets(top: 4, leading: 0, bottom: 0, trailing: 6))
                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topTrailing)
            }
            .padding(.top, 12)
        }
        .padding(12)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.white)
        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
    }

    private func collageCard(url: String?, background: Color, rotation: Double) -> some View {
        ZStack {
            background
            if let url {
                RemoteImage(url: url, placeholder: background)
            }
        }
        .frame(width: 50, height: 60)
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
        .rotationEffect(.degrees(rotation))
    }

    private func bubble(systemImage: String, colors: [Color]) -> some View {
        Image(systemName: systemImage)
            .font(.system(size: 12, weight: .medium))
            .foregroundStyle(.white)
            .frame(width: 20, height: 20)
            .background(
                LinearGradient(colors: colors, startPoint: .bottomLeading, endPoint: .topTrailing)
            )
            .clipShape(Circle())
    }
}

extension Array {
    subscript(safe index: Int) -> Element? {
        indices.contains(index) ? self[index] : nil
    }
}

#Preview {
    FriendsCard(
        title: "Gift your",
        highlight: "Friends",
        collage: [
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=320&q=80",
            "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=320&q=80",
            "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=320&q=80",
        ]
    )
    .frame(width: CardLayout.width, height: CardLayout.height)
}
