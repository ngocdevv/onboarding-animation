import React from "react";
import { StyleSheet, View } from "react-native";

import { FriendsCard } from "./friends-card";
import { ListCard } from "./list-card";
import { ShapeCard } from "./shape-card";
import { CARD_HEIGHT, CARD_SPACING, CARD_WIDTH } from "./constants";
import { CardDescriptor } from "./types";

type CardItemProps = {
    card: CardDescriptor;
    isLast: boolean;
};

export const CardItem = ({ card, isLast }: CardItemProps) => {
    const containerStyles = [styles.cardWrapper, isLast && styles.cardWrapperLast];

    if (card.variant === "shape") {
        return (
            <View style={containerStyles}>
                <ShapeCard src={card.src} shape={card.shape} accentColor={card.accentColor} />
            </View>
        );
    }

    if (card.variant === "friends") {
        return (
            <View style={containerStyles}>
                <FriendsCard title={card.title} highlight={card.highlight} collage={card.collage} />
            </View>
        );
    }

    return (
        <View style={containerStyles}>
            <ListCard title={card.title} highlight={card.highlight} subtitle={card.subtitle} items={card.items} />
        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginRight: CARD_SPACING,
        shadowColor: "#00000030",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    cardWrapperLast: {
        marginRight: 0,
    },
});
