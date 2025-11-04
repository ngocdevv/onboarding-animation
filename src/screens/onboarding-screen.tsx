import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CardCarousel } from "../components/card-carousel";
import { AnimatedHeadline } from "./onboarding/components/animated-headline";
import { OnboardingActions } from "./onboarding/components/onboarding-actions";
import {
    ACTION_BUTTONS,
    GRADIENT_COLORS,
    GRADIENT_LOCATIONS,
    HEADLINE_LINES,
    SUBTITLE_TEXT,
} from "./onboarding/constants";

const contentFadeInAnimation = {
    animationName: {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },
    animationDuration: "800ms",
    animationTimingFunction: "ease-in-out",
} as const;

const subtitleAnimation = {
    animationName: {
        from: { transform: [{ translateY: 200 }, { translateX: 0 }, { scale: 2 }] },
        to: { transform: [{ translateY: 0 }, { translateX: 0 }, { scale: 1 }] },
    },
    animationDuration: "800ms",
    animationTimingFunction: "ease-in-out",
} as const;

export const OnboardingScreen = () => {
    const { bottom, top } = useSafeAreaInsets();

    return (
        <LinearGradient
            colors={GRADIENT_COLORS}
            locations={GRADIENT_LOCATIONS}
            style={[styles.container, { paddingBottom: bottom + 8, paddingTop: top + 20 }]}
        >
            <Animated.View entering={FadeInDown.duration(800).springify()}>
                <Text style={styles.headerTitle}>GIFTER</Text>
            </Animated.View>

            <Animated.View style={[styles.contentContainer, contentFadeInAnimation as any]}>
                <View style={styles.heroContent}>
                    <AnimatedHeadline lines={HEADLINE_LINES} textStyle={styles.title} />
                    <Animated.Text style={[styles.subtitle, subtitleAnimation as any]}>{SUBTITLE_TEXT}</Animated.Text>
                </View>

                <CardCarousel />
            </Animated.View>

            <OnboardingActions buttons={ACTION_BUTTONS} containerStyle={styles.actions} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerTitle: {
        fontFamily: "CaveatBrush-Regular",
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold",
        letterSpacing: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    heroContent: {
        alignItems: "center",
        rowGap: 12,
    },
    title: {
        fontFamily: "Piepia W01 Regular",
        fontSize: 28,
        color: "#002434",
        textAlign: "center",
        lineHeight: 36,
    },
    subtitle: {
        fontSize: 14,
        color: "#002434",
        textAlign: "center",
        fontWeight: "500",
    },
    actions: {
        width: "100%",
    },
});
