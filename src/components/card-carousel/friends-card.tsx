import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { FriendsCardDescriptor } from "./types";

export const FriendsCard = ({ title, highlight, collage }: Omit<FriendsCardDescriptor, "id" | "variant">) => (
    <View style={[styles.cardBase, styles.friendsCard]}>
        <View>
            <Text style={styles.friendsTitleMuted}>{title}</Text>
            <Text style={styles.friendsTitleBold}>{highlight}</Text>
        </View>
        <View style={styles.collageStage}>
            <View style={[styles.collageCard, styles.collageCardBack]}>
                <Image source={{ uri: collage[0] }} style={styles.collageImage} />
            </View>
            <View style={[styles.collageCard, styles.collageCardMiddle]}>
                <Image source={{ uri: collage[1] }} style={styles.collageImage} />
            </View>
            <View style={[styles.collageCard, styles.collageCardFront]}>
                <Image source={{ uri: collage[2] }} style={styles.collageImage} />
            </View>
            <LinearGradient
                colors={["#60A5FA", "#A855F7"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={[styles.bubble, styles.bubbleGift]}
            >
                <Feather name="gift" size={12} color="#FFFFFF" />
            </LinearGradient>
            <LinearGradient
                colors={["#F472B6", "#F97316"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={[styles.bubble, styles.bubbleHeart]}
            >
                <Feather name="heart" size={12} color="#FFFFFF" />
            </LinearGradient>
        </View>
    </View>
);

const styles = StyleSheet.create({
    cardBase: {
        flex: 1,
        borderRadius: 24,
        padding: 12,
        overflow: "hidden",
    },
    friendsCard: {
        backgroundColor: "#FFFFFF",
    },
    friendsTitleMuted: {
        fontSize: 10,
        textAlign: "center",
        color: "#9CA3AF",
        fontWeight: "600",
    },
    friendsTitleBold: {
        fontSize: 10,
        textAlign: "center",
        color: "#111827",
        fontWeight: "700",
        marginTop: 2,
    },
    collageStage: {
        flex: 1,
        position: "relative",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 12,
    },
    collageCard: {
        position: "absolute",
        width: 50,
        height: 60,
        borderRadius: 12,
        overflow: "hidden",
    },
    collageCardBack: {
        top: 18,
        left: 3,
        backgroundColor: "#EBF4FF",
        transform: [{ rotate: "-12deg" }],
    },
    collageCardMiddle: {
        top: 6,
        right: 8,
        backgroundColor: "#FEE2E2",
        transform: [{ rotate: "8deg" }],
    },
    collageCardFront: {
        bottom: 8,
        alignSelf: "center",
        backgroundColor: "#FFF7ED",
        transform: [{ rotate: "12deg" }],
    },
    collageImage: {
        width: "100%",
        height: "100%",
    },
    bubble: {
        position: "absolute",
        width: 20,
        height: 20,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    bubbleGift: {
        bottom: 8,
        left: 8,
    },
    bubbleHeart: {
        top: 4,
        right: 6,
    },
});
