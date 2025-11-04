import { Feather } from "@expo/vector-icons";
import {
    Canvas,
    Group,
    Skia,
    Image as SkiaImage,
    Path as SkiaPath,
    SkPath,
    useImage,
} from "@shopify/react-native-skia";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";

type ShapeType = "scallop" | "rounded" | "circle" | "rectangle";

type ShapeCardDescriptor = {
    id: string;
    variant: "shape";
    src: string | number;
    shape: ShapeType;
    accentColor: string;
};

type FriendsCardDescriptor = {
    id: string;
    variant: "friends";
    title: string;
    highlight: string;
    collage: string[];
};

type ShoppingItem = {
    label: string;
    checked?: boolean;
    muted?: boolean;
};

type ListCardDescriptor = {
    id: string;
    variant: "list";
    title: string;
    highlight: string;
    subtitle: string;
    items: ShoppingItem[];
};

type CardDescriptor = ShapeCardDescriptor | FriendsCardDescriptor | ListCardDescriptor;

const CARD_WIDTH = 130;
const CARD_HEIGHT = 150;
const CARD_SPACING = 16;

const SHAPE_CARDS: ShapeCardDescriptor[] = [
    {
        id: "shape-2",
        variant: "shape",
        src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80",
        shape: "rectangle",
        accentColor: "#FBCFE8",
    },
    {
        id: "shape-5",
        variant: "shape",
        src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        shape: "rectangle",
        accentColor: "#FDBA74",
    },
    {
        id: "shape-rectangle",
        variant: "shape",
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
        shape: "rectangle",
        accentColor: "#BFDBFE",
    },
];

const collageOne = [
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=320&q=80",
    "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=320&q=80",
    "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=320&q=80",
];

const collageTwo = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=320&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=320&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80",
];

const CONTENT_CARDS: CardDescriptor[] = [
    {
        id: "friends-1",
        variant: "friends",
        title: "Gift your",
        highlight: "Friends",
        collage: collageOne,
    },
    {
        id: "friends-2",
        variant: "friends",
        title: "Celebrate",
        highlight: "Together",
        collage: collageTwo,
    },
    {
        id: "list-2",
        variant: "list",
        title: "Plan gifts",
        highlight: "gifts",
        subtitle: "surprise",
        items: [
            { label: "Wireless buds", checked: true },
            { label: "Polaroid cam", checked: true },
            { label: "Weekend trip", muted: true },
        ],
    },
];

const CARDS: CardDescriptor[] = [...SHAPE_CARDS, ...CONTENT_CARDS];

const duplicateForLooping = <T,>(items: T[]): T[] => [...items, ...items];

const shuffleArray = <T,>(items: T[]): T[] => {
    const shuffled = [...items];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }

    return shuffled;
};

const createRoundedRectPath = (): SkPath => {
    const path = Skia.Path.Make();
    const rrect = Skia.RRectXY({ x: 0, y: 0, width: CARD_WIDTH, height: CARD_HEIGHT }, CARD_HEIGHT * 0.26, CARD_HEIGHT * 0.26);
    path.addRRect(rrect);
    return path;
};

const createRectanglePath = (): SkPath => {
    const path = Skia.Path.Make();
    const cornerRadius = CARD_WIDTH * 0.12;
    const rect = Skia.RRectXY({ x: 0, y: 0, width: CARD_WIDTH, height: CARD_HEIGHT }, cornerRadius, cornerRadius);
    path.addRRect(rect);
    return path;
};


const getPathForShape = (shape: ShapeType): SkPath => {
    switch (shape) {
        case "rounded":
            return createRoundedRectPath();
        case "rectangle":
            return createRectanglePath();
        case "circle":
        default:
            return createRoundedRectPath();
    }
};

const ShapeCard = ({ src, shape }: Omit<ShapeCardDescriptor, "id" | "variant">) => {
    const image = useImage(src);
    const shapePath = useMemo(() => getPathForShape(shape), [shape]);

    return (
        <View style={[styles.cardBase, styles.shapeCard, {
            borderWidth: 4,
            borderColor: "#FFFFFF"
        }]}>
            <Canvas style={styles.shapeCanvas}>
                {image ? (
                    <Group clip={shapePath}>
                        <SkiaImage image={image} fit="cover" strokeWidth={2} x={0} y={0} width={CARD_WIDTH} height={CARD_HEIGHT} />
                    </Group>
                ) : (
                    <SkiaPath path={shapePath} color="#E5E7EB" style="fill" />
                )}
            </Canvas>
        </View>
    );
};

const FriendsCard = ({ title, highlight, collage }: Omit<FriendsCardDescriptor, "id" | "variant">) => (
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

const ListCard = ({ title, highlight, subtitle, items }: Omit<ListCardDescriptor, "id" | "variant">) => (
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
                    <Text style={[styles.listItemLabel, item.muted && styles.listItemLabelMuted]}>{item.label}</Text>
                </View>
            ))}
        </View>
    </LinearGradient>
);

const CardItem = ({ card, isLast }: { card: CardDescriptor; isLast: boolean }) => {
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

export const CardCarousel = () => {
    const translateX = useRef(new Animated.Value(0)).current;
    const shuffledCards = useMemo(() => shuffleArray(CARDS), []);
    const duplicatedCards = useMemo(() => duplicateForLooping(shuffledCards), [shuffledCards]);

    useEffect(() => {
        const travelDistance = shuffledCards.length * (CARD_WIDTH + CARD_SPACING);
        translateX.setValue(0);
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: -travelDistance,
                    duration: 16000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 0,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        );

        animation.start();
        return () => {
            animation.stop();
        };
    }, [shuffledCards, translateX]);

    return (
        <View style={styles.carouselContainer}>
            <Animated.View style={[styles.scrollTrack, { transform: [{ translateX }] }]}>
                {duplicatedCards.map((card, index) => (
                    <CardItem key={`${card.id}-${index}`} card={card} isLast={index === duplicatedCards.length - 1} />
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
    },
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
        left: 10,
        backgroundColor: "#EBF4FF",
        transform: [{ rotate: "-12deg" }],
    },
    collageCardMiddle: {
        top: 6,
        right: 10,
        backgroundColor: "#FEE2E2",
        transform: [{ rotate: "8deg" }],
    },
    collageCardFront: {
        bottom: 6,
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
    listHighlight: {
        color: "#FFFFFF",
        fontSize: 8,
        fontWeight: "700",
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
        justifyContent: "space-around"
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
    checkboxChecked: {
        backgroundColor: "rgba(255,255,255,0.22)",
    },
    checkboxInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
    },
    listItemLabel: {
        color: "rgba(255,255,255,0.95)",
        fontSize: 9,
        fontWeight: "600",
    },
    listItemLabelMuted: {
        color: "rgba(255,255,255,0.45)",
    },
    shapeCard: {
        alignItems: "center",
        justifyContent: "center",
    },
    shapeCanvas: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
    },
});
