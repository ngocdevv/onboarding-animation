import React from "react";
import { ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

import type { CharacterOffset, HeadlineLine, HeadlineSegment, HeadlineWord } from "../constants";

type AnimatedHeadlineProps = {
    lines: HeadlineLine[];
    textStyle: StyleProp<TextStyle>;
    avatarStyle?: StyleProp<ImageStyle>;
    containerStyle?: StyleProp<ViewStyle>;
};

const DEFAULT_OFFSET: CharacterOffset = { x: 0, y: 0 };

const createBaseAnimation = (offset: CharacterOffset) =>
    ({
        animationName: {
            from: {
                transform: [
                    { translateY: offset.y ?? 0 },
                    { translateX: offset.x ?? 0 },
                    { scale: 3 },
                ],
            },
            to: {
                transform: [
                    { translateY: 0 },
                    { translateX: 0 },
                    { scale: 1 },
                ],
            },
        },
        animationDuration: "800ms",
        animationTimingFunction: "ease-in-out",
        animationFillMode: "forwards",
    }) as const;

const AnimatedCharacter = ({
    char,
    offset,
    textStyle,
}: {
    char: string;
    offset: CharacterOffset;
    textStyle: StyleProp<TextStyle>;
}) => (
    <Animated.Text style={[textStyle, createBaseAnimation(offset) as unknown as TextStyle]}>
        {char}
    </Animated.Text>
);

const renderWord = (word: HeadlineWord, textStyle: StyleProp<TextStyle>) => (
    <View key={word.text} style={styles.wordContainer}>
        {Array.from(word.text).map((char, index) => (
            <AnimatedCharacter
                key={`${word.text}-${index}`}
                char={char}
                offset={word.offsets[index] ?? DEFAULT_OFFSET}
                textStyle={textStyle}
            />
        ))}
    </View>
);

const WordsSegment = ({ words, textStyle }: { words: HeadlineWord[]; textStyle: StyleProp<TextStyle> }) => (
    <View style={styles.wordsContainer}>{words.map((word) => renderWord(word, textStyle))}</View>
);

const TextSegment = ({
    text,
    offsets,
    textStyle,
}: {
    text: string;
    offsets: CharacterOffset[];
    textStyle: StyleProp<TextStyle>;
}) => (
    <View style={styles.textSegment}>
        {Array.from(text).map((char, index) => (
            <AnimatedCharacter
                key={`${text}-${index}`}
                char={char}
                offset={offsets[index] ?? DEFAULT_OFFSET}
                textStyle={textStyle}
            />
        ))}
    </View>
);

const AvatarSegment = ({
    offsets,
    avatarStyle,
    sources,
}: {
    offsets: CharacterOffset[];
    avatarStyle?: StyleProp<ImageStyle>;
    sources: ImageSourcePropType[];
}) => (
    <Animated.View style={styles.avatarStack}>
        {sources.map((source, index) => (
            <Animated.Image
                key={`avatar-${index}`}
                source={source}
                resizeMode="cover"
                style={[
                    styles.avatar,
                    avatarStyle,
                    index > 0 && styles.avatarOverlap,
                    createBaseAnimation(offsets[index] ?? DEFAULT_OFFSET) as unknown as ImageStyle,
                ]}
            />
        ))}
    </Animated.View>
);

const renderSegment = (
    segment: HeadlineSegment,
    textStyle: StyleProp<TextStyle>,
    avatarStyle?: StyleProp<ImageStyle>,
) => {
    if (segment.type === "words") {
        return <WordsSegment key="words" words={segment.words} textStyle={textStyle} />;
    }

    if (segment.type === "text") {
        return (
            <TextSegment key={`text-${segment.text}`} text={segment.text} offsets={segment.offsets} textStyle={textStyle} />
        );
    }

    return (
        <AvatarSegment
            key="avatars"
            offsets={segment.offsets}
            avatarStyle={avatarStyle}
            sources={segment.sources}
        />
    );
};

export const AnimatedHeadline = ({ lines, textStyle, avatarStyle, containerStyle }: AnimatedHeadlineProps) => (
    <View style={[styles.container, containerStyle]}>
        {lines.map((line) => (
            <Animated.View key={line.id} style={styles.line}>
                {line.segments.map((segment) => renderSegment(segment, textStyle, avatarStyle))}
            </Animated.View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        rowGap: 4,
    },
    line: {
        flexDirection: "row",
        alignItems: "center",
    },
    wordsContainer: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 4,
    },
    wordContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    textSegment: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatarStack: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 2,
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#fff",
    },
    avatarOverlap: {
        marginLeft: -10,
    },
});
