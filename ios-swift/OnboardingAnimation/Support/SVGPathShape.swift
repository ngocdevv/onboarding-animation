import SwiftUI

/// A `Shape` built from SVG path data (`M x,y L x,y … Z`).
///
/// The React Native version used `Skia.Path.MakeFromSVGString`; here we parse the (absolute
/// `M` / `L` / `H` / `V` / `Z`) commands ourselves, normalise the path to its bounding box and
/// stretch it to whatever rect the shape is asked to fill.
struct SVGPathShape: Shape {
    private let sourcePath: Path
    private let sourceBounds: CGRect

    init(svg: String) {
        let path = SVGPathShape.parse(svg)
        sourcePath = path
        sourceBounds = path.boundingRect
    }

    func path(in rect: CGRect) -> Path {
        guard sourceBounds.width > 0, sourceBounds.height > 0 else {
            return RoundedRectangle(cornerRadius: rect.height * 0.26).path(in: rect)
        }

        let transform = CGAffineTransform(translationX: -sourceBounds.minX, y: -sourceBounds.minY)
            .concatenating(CGAffineTransform(scaleX: rect.width / sourceBounds.width, y: rect.height / sourceBounds.height))
            .concatenating(CGAffineTransform(translationX: rect.minX, y: rect.minY))

        return sourcePath.applying(transform)
    }

    // MARK: - Parsing

    private static func parse(_ data: String) -> Path {
        var path = Path()
        var current = CGPoint.zero
        var command: Character = "M"
        var numbers: [CGFloat] = []

        func flush() {
            switch command {
            case "M":
                guard numbers.count >= 2 else { return }
                current = CGPoint(x: numbers[0], y: numbers[1])
                path.move(to: current)
                var index = 2
                while index + 1 < numbers.count {
                    current = CGPoint(x: numbers[index], y: numbers[index + 1])
                    path.addLine(to: current)
                    index += 2
                }
            case "L":
                var index = 0
                while index + 1 < numbers.count {
                    current = CGPoint(x: numbers[index], y: numbers[index + 1])
                    path.addLine(to: current)
                    index += 2
                }
            case "H":
                for x in numbers {
                    current.x = x
                    path.addLine(to: current)
                }
            case "V":
                for y in numbers {
                    current.y = y
                    path.addLine(to: current)
                }
            default:
                break
            }
            numbers.removeAll(keepingCapacity: true)
        }

        var numberBuffer = ""
        func flushNumber() {
            if let value = Double(numberBuffer) {
                numbers.append(CGFloat(value))
            }
            numberBuffer = ""
        }

        for character in data {
            switch character {
            case "M", "L", "H", "V", "Z", "z":
                flushNumber()
                flush()
                if character == "Z" || character == "z" {
                    path.closeSubpath()
                    command = "M"
                } else {
                    command = character
                }
            case ",", " ", "\n", "\t":
                flushNumber()
            case "-":
                flushNumber()
                numberBuffer = "-"
            default:
                numberBuffer.append(character)
            }
        }
        flushNumber()
        flush()

        return path
    }
}
