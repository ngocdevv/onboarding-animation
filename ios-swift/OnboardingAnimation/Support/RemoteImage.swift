import SwiftUI

/// Loads an image from a URL and scales it to fill its container.
/// Callers are expected to give it a fixed frame and clip it (`.clipShape`, `.clipped()`),
/// matching `resizeMode="cover"` / Skia `fit="cover"` in the React Native source.
struct RemoteImage: View {
    let url: String
    var placeholder: Color = Color(hex: 0xE5E7EB)

    var body: some View {
        AsyncImage(url: URL(string: url)) { phase in
            switch phase {
            case .success(let image):
                image
                    .resizable()
                    .scaledToFill()
            default:
                placeholder
            }
        }
    }
}
