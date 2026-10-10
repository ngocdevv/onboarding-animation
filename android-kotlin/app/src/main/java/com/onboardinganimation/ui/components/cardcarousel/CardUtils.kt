package com.onboardinganimation.ui.components.cardcarousel

import kotlin.random.Random

// Port of `src/components/card-carousel/utils.ts`.

/** Appends a copy of the list to itself so the track can loop seamlessly. */
fun <T> duplicateForLooping(items: List<T>): List<T> = items + items

/** Fisher–Yates shuffle (returns a new list). */
fun <T> shuffleArray(items: List<T>, random: Random = Random.Default): List<T> {
    val shuffled = items.toMutableList()
    for (index in shuffled.lastIndex downTo 1) {
        val swapIndex = random.nextInt(index + 1)
        val tmp = shuffled[index]
        shuffled[index] = shuffled[swapIndex]
        shuffled[swapIndex] = tmp
    }
    return shuffled
}
