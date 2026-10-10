import Foundation

// Port of `src/components/card-carousel/utils.ts`.

/// Appends a copy of the list to itself so the track can loop seamlessly.
func duplicateForLooping<T>(_ items: [T]) -> [T] {
    items + items
}

/// Fisher–Yates shuffle (returns a new array).
func shuffleArray<T>(_ items: [T]) -> [T] {
    var shuffled = items
    guard shuffled.count > 1 else { return shuffled }

    for index in stride(from: shuffled.count - 1, to: 0, by: -1) {
        let swapIndex = Int.random(in: 0...index)
        shuffled.swapAt(index, swapIndex)
    }

    return shuffled
}
