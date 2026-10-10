import SwiftUI

// Port of `src/components/card-carousel/list-card.tsx`.

struct ListCard: View {
    let title: String
    let highlight: String
    let subtitle: String
    let items: [ShoppingItem]

    var body: some View {
        VStack(spacing: 0) {
            // listHeader
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 2) {
                    Text(subtitle.uppercased())
                        .font(.system(size: 11, weight: .medium))
                        .foregroundStyle(.white.opacity(0.6))
                    Text(title)
                        .font(.system(size: 9, weight: .bold))
                        .foregroundStyle(.white.opacity(0.92))
                }

                Spacer(minLength: 0)

                Image(systemName: "list.bullet")
                    .font(.system(size: 12, weight: .medium))
                    .foregroundStyle(.white)
                    .frame(width: 12, height: 12)
                    .padding(6)
                    .background(.white.opacity(0.22))
                    .clipShape(Circle())
            }

            // listItems: flex 1, justifyContent "space-around"
            VStack(spacing: 0) {
                ForEach(Array(items.enumerated()), id: \.offset) { _, item in
                    HStack(spacing: 6) {
                        Circle()
                            .stroke(.white.opacity(0.7), lineWidth: 1)
                            .frame(width: 12, height: 12)
                        Text(item.label)
                            .font(.system(size: 9, weight: .semibold))
                            .foregroundStyle(.white.opacity(item.muted ? 0.45 : 0.95))
                        Spacer(minLength: 0)
                    }
                    .frame(maxHeight: .infinity)
                }
            }
            .padding(.top, 10)
            .frame(maxHeight: .infinity)
        }
        .padding(12)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(
            LinearGradient(
                colors: [Color(hex: 0x85B0F3), Color(hex: 0xDA9FD5), Color(hex: 0xED827D)],
                startPoint: .top,
                endPoint: .bottom
            )
        )
        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
    }
}

#Preview {
    ListCard(
        title: "Plan gifts",
        highlight: "gifts",
        subtitle: "surprise",
        items: [
            ShoppingItem(label: "Wireless buds", checked: true),
            ShoppingItem(label: "Polaroid cam", checked: true),
            ShoppingItem(label: "Weekend trip", muted: true),
        ]
    )
    .frame(width: CardLayout.width, height: CardLayout.height)
}
