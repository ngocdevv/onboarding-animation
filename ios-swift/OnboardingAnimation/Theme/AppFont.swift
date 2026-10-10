import SwiftUI

/// PostScript names of the bundled fonts (see Resources/Fonts and Info.plist → UIAppFonts).
enum AppFont {
    /// `CaveatBrush-Regular.ttf`
    static let caveatBrush = "CaveatBrush-Regular"
    /// `PiepieW01-Regular.ttf` (named "Piepia W01 Regular" in the React Native source)
    static let piepie = "PiepieW01-Regular"
}

extension Color {
    /// `Color(hex: 0x002434)` — convenience for the hex colours used throughout the RN styles.
    init(hex: UInt32, opacity: Double = 1) {
        let red = Double((hex >> 16) & 0xFF) / 255
        let green = Double((hex >> 8) & 0xFF) / 255
        let blue = Double(hex & 0xFF) / 255
        self.init(red: red, green: green, blue: blue, opacity: opacity)
    }
}
