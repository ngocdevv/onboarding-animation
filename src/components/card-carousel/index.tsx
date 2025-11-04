import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    cancelAnimation,
    Easing,
    FadeInRight,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

import { CardItem } from "./card-item";
import { CARD_SPACING, CARD_WIDTH, CARDS } from "./constants";
import { duplicateForLooping, shuffleArray } from "./utils";

export const CardCarousel = () => {
    const translateX = useSharedValue(0);
    const shuffledCards = useMemo(() => shuffleArray(CARDS), []);
    const duplicatedCards = useMemo(() => duplicateForLooping(shuffledCards), [shuffledCards]);
    const [introAnimationFinished, setIntroAnimationFinished] = useState(false);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const handleIntroAnimationEnd = useCallback(() => {
        if (!isMountedRef.current) {
            return;
        }
        setIntroAnimationFinished(true);
    }, []);

    const enteringAnimation = useMemo(
        () =>
            FadeInRight.duration(600).withCallback((finished) => {
                "worklet";
                if (finished) {
                    runOnJS(handleIntroAnimationEnd)();
                }
            }),
        [handleIntroAnimationEnd],
    );

    useEffect(() => {
        if (!introAnimationFinished) {
            return;
        }

        const travelDistance = shuffledCards.length * (CARD_WIDTH + CARD_SPACING);
        cancelAnimation(translateX);
        translateX.value = 0;
        translateX.value = withRepeat(
            withSequence(
                withTiming(-travelDistance, {
                    duration: 16000,
                    easing: Easing.linear,
                }),
                withTiming(0, {
                    duration: 0,
                    easing: Easing.linear,
                }),
            ),
            -1,
            false,
        );
        return () => {
            cancelAnimation(translateX);
            translateX.value = 0;
        };
    }, [introAnimationFinished, shuffledCards, translateX]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={styles.carouselContainer}>
            <Animated.View style={[styles.scrollTrack, animatedStyle]} entering={enteringAnimation}>
                {duplicatedCards.map((card, index) => (
                    <Animated.View
                        key={`${card.id}-${index}`}
                        style={{
                            animationName: {
                                from: { opacity: 0, transform: [{ translateX: (index + 1) * 300 }] },
                                to: { opacity: 1, transform: [{ translateX: 0 }] },
                            },
                            animationDuration: "800ms",
                            animationTimingFunction: "ease-in-out",
                            animationFillMode: "forwards",
                        }}
                    >
                        <CardItem card={card} isLast={index === duplicatedCards.length - 1} />
                    </Animated.View>
                ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        width: "100%",
        overflow: "hidden",
        paddingVertical: 12,
    },
    scrollTrack: {
        flexDirection: "row",
        columnGap: 8,
    },
});
