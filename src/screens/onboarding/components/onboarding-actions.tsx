import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

import type { ActionButton } from "../constants";

type OnboardingActionsProps = {
    buttons: ActionButton[];
    containerStyle?: StyleProp<ViewStyle>;
    primaryTextStyle?: StyleProp<TextStyle>;
    secondaryTextStyle?: StyleProp<TextStyle>;
    onPress?: (id: string) => void;
};

const createEntranceAnimation = () =>
    ({
        animationName: {
            from: { transform: [{ translateY: 100 }, { translateX: 0 }, { scale: 1 }] },
            to: { transform: [{ translateY: 0 }, { translateX: 0 }, { scale: 1 }] },
        },
        animationDuration: "600ms",
        animationTimingFunction: "ease-in-out",
    }) as const;

export const OnboardingActions = ({
    buttons,
    containerStyle,
    primaryTextStyle,
    secondaryTextStyle,
    onPress,
}: OnboardingActionsProps) => (
    <Animated.View style={[styles.container, containerStyle, createEntranceAnimation() as unknown as ViewStyle]}>
        {buttons.map((button) => {
            const isPrimary = button.variant === "primary";
            return (
                <TouchableOpacity
                    key={button.id}
                    style={[styles.buttonBase, isPrimary ? styles.primaryButton : styles.secondaryButton]}
                    activeOpacity={0.85}
                    onPress={() => onPress?.(button.id)}
                >
                    <Text
                        style={[
                            styles.buttonTextBase,
                            isPrimary ? styles.primaryText : styles.secondaryText,
                            isPrimary ? primaryTextStyle : secondaryTextStyle,
                        ]}
                    >
                        {button.label}
                    </Text>
                </TouchableOpacity>
            );
        })}
    </Animated.View>
);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 32,
        gap: 8,
    },
    buttonBase: {
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    secondaryButton: {
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    primaryButton: {
        backgroundColor: "#02B7FE",
        position: "relative",
        overflow: "hidden",
    },
    buttonTextBase: {
        fontSize: 14,
        fontWeight: "600",
    },
    secondaryText: {
        color: "#1a1a2e",
    },
    primaryText: {
        color: "#fff",
    },
});
