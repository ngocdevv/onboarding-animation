import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ListCardDescriptor } from "./types";

export const ListCard = ({ title, highlight, subtitle, items }: Omit<ListCardDescriptor, "id" | "variant">) => (
    <LinearGradient
        colors={["#85B0F3", "#DA9FD5", "#ED827D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.cardBase, styles.listCard]}
    >
        <View style={styles.listHeader}>
            <View>
                <Text style={styles.listSubtitle}>{subtitle}</Text>
                <Text style={styles.listTitle}>{title}</Text>
            </View>
            <View style={styles.listBadge}>
                <Feather name="list" size={12} color="#FFFFFF" />
            </View>
        </View>
        <View style={styles.listItems}>
            {items.map((item) => (
                <View key={item.label} style={styles.listItem}>
                    <View style={[styles.checkbox]} />
                    <Text style={[styles.listItemLabel, item.muted && styles.listItemLabelMuted]}>
                        {item.label}
                    </Text>
                </View>
            ))}
        </View>
    </LinearGradient>
);

const styles = StyleSheet.create({
    cardBase: {
        flex: 1,
        borderRadius: 24,
        padding: 12,
        overflow: "hidden",
    },
    listCard: {
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    listHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    listSubtitle: {
        color: "rgba(255,255,255,0.6)",
        fontSize: 11,
        fontWeight: "500",
        textTransform: "uppercase",
    },
    listTitle: {
        color: "rgba(255,255,255,0.92)",
        fontSize: 9,
        fontWeight: "700",
        marginTop: 2,
    },
    listBadge: {
        backgroundColor: "rgba(255,255,255,0.22)",
        padding: 6,
        borderRadius: 16,
    },
    listItems: {
        marginTop: 10,
        gap: 8,
        flex: 1,
        justifyContent: "space-around",
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.7)",
        marginRight: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    listItemLabel: {
        color: "rgba(255,255,255,0.95)",
        fontSize: 9,
        fontWeight: "600",
    },
    listItemLabelMuted: {
        color: "rgba(255,255,255,0.45)",
    },
});
