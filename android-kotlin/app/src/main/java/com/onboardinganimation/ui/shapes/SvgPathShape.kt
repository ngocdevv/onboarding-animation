package com.onboardinganimation.ui.shapes

import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Matrix
import androidx.compose.ui.graphics.Outline
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.graphics.vector.PathParser
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.LayoutDirection

/**
 * A [Shape] built from SVG path data.
 *
 * The React Native version used `Skia.Path.MakeFromSVGString`; Compose ships its own
 * SVG path parser ([PathParser]). The path is normalised to its bounding box and
 * stretched to whatever size the shape is asked to fill.
 */
class SvgPathShape(pathData: String) : Shape {
    private val sourcePath: Path = PathParser().parsePathString(pathData).toPath()
    private val sourceBounds = sourcePath.getBounds()

    override fun createOutline(size: Size, layoutDirection: LayoutDirection, density: Density): Outline {
        if (sourceBounds.width == 0f || sourceBounds.height == 0f) {
            return Outline.Rectangle(size.toRect())
        }

        val path = Path().apply { addPath(sourcePath) }
        val matrix = Matrix().apply {
            // Operations are post-multiplied: translate to the origin first, then scale to `size`.
            scale(size.width / sourceBounds.width, size.height / sourceBounds.height)
            translate(-sourceBounds.left, -sourceBounds.top)
        }
        path.transform(matrix)

        return Outline.Generic(path)
    }

    private fun Size.toRect() = androidx.compose.ui.geometry.Rect(0f, 0f, width, height)
}
