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
        shape: "scallop",
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

const SCALLOPED_BORDER_PATH_DATA =
    "M500.000,300.000 L503.638,305.332 L506.770,310.836 L509.062,316.454 L510.255,322.099 L510.186,327.672 L508.810,333.072 L506.197,338.216 L502.529,343.049 L498.080,347.555 L493.185,351.764 L488.208,355.750 L483.503,359.624 L479.377,363.521 L476.061,367.584 L473.689,371.944 L472.283,376.705 L471.755,381.923 L471.917,387.596 L472.505,393.662 L473.205,400.000 L473.690,406.437 L473.650,412.769 L472.826,418.780 L471.036,424.265 L468.191,429.057 L464.299,433.046 L459.463,436.195 L453.871,438.546 L447.765,440.223 L441.421,441.421 L435.118,442.385 L429.106,443.387 L423.585,444.699 L418.682,446.560 L414.447,449.150 L410.849,452.570 L407.782,456.824 L405.086,461.819 L402.562,467.366 L400.000,473.205 L397.201,479.022 L394.000,484.486 L390.282,489.280 L385.989,493.135 L381.129,495.862 L375.764,497.371 L370.002,497.680 L363.983,496.920 L357.856,495.319 L351.764,493.185 L345.823,490.868 L340.116,488.730 L334.678,487.105 L329.502,486.265 L324.539,486.392 L319.713,487.554 L314.930,489.705 L310.098,492.682 L305.138,496.225 L300.000,500.000 L294.668,503.638 L289.164,506.770 L283.546,509.062 L277.901,510.255 L272.328,510.186 L266.928,508.810 L261.784,506.197 L256.951,502.529 L252.445,498.080 L248.236,493.185 L244.250,488.208 L240.376,483.503 L236.479,479.377 L232.416,476.061 L228.056,473.689 L223.295,472.283 L218.077,471.755 L212.404,471.917 L206.338,472.505 L200.000,473.205 L193.563,473.690 L187.231,473.650 L181.220,472.826 L175.735,471.036 L170.943,468.191 L166.954,464.299 L163.805,459.463 L161.454,453.871 L159.777,447.765 L158.579,441.421 L157.615,435.118 L156.613,429.106 L155.301,423.585 L153.440,418.682 L150.850,414.447 L147.430,410.849 L143.176,407.782 L138.181,405.086 L132.634,402.562 L126.795,400.000 L120.978,397.201 L115.514,394.000 L110.720,390.282 L106.865,385.989 L104.138,381.129 L102.629,375.764 L102.320,370.002 L103.080,363.983 L104.681,357.856 L106.815,351.764 L109.132,345.823 L111.270,340.116 L112.895,334.678 L113.735,329.502 L113.608,324.539 L112.446,319.713 L110.295,314.930 L107.318,310.098 L103.775,305.138 L100.000,300.000 L96.362,294.668 L93.230,289.164 L90.938,283.546 L89.745,277.901 L89.814,272.328 L91.190,266.928 L93.803,261.784 L97.471,256.951 L101.920,252.445 L106.815,248.236 L111.792,244.250 L116.497,240.376 L120.623,236.479 L123.939,232.416 L126.311,228.056 L127.717,223.295 L128.245,218.077 L128.083,212.404 L127.495,206.338 L126.795,200.000 L126.310,193.563 L126.350,187.231 L127.174,181.220 L128.964,175.735 L131.809,170.943 L135.701,166.954 L140.537,163.805 L146.129,161.454 L152.235,159.777 L158.579,158.579 L164.882,157.615 L170.894,156.613 L176.415,155.301 L181.318,153.440 L185.553,150.850 L189.151,147.430 L192.218,143.176 L194.914,138.181 L197.438,132.634 L200.000,126.795 L202.799,120.978 L206.000,115.514 L209.718,110.720 L214.011,106.865 L218.871,104.138 L224.236,102.629 L229.998,102.320 L236.017,103.080 L242.144,104.681 L248.236,106.815 L254.177,109.132 L259.884,111.270 L265.322,112.895 L270.498,113.735 L275.461,113.608 L280.287,112.446 L285.070,110.295 L289.902,107.318 L294.862,103.775 L300.000,100.000 L305.332,96.362 L310.836,93.230 L316.454,90.938 L322.099,89.745 L327.672,89.814 L333.072,91.190 L338.216,93.803 L343.049,97.471 L347.555,101.920 L351.764,106.815 L355.750,111.792 L359.624,116.497 L363.521,120.623 L367.584,123.939 L371.944,126.311 L376.705,127.717 L381.923,128.245 L387.596,128.083 L393.662,127.495 L400.000,126.795 L406.437,126.310 L412.769,126.350 L418.780,127.174 L424.265,128.964 L429.057,131.809 L433.046,135.701 L436.195,140.537 L438.546,146.129 L440.223,152.235 L441.421,158.579 L442.385,164.882 L443.387,170.894 L444.699,176.415 L446.560,181.318 L449.150,185.553 L452.570,189.151 L456.824,192.218 L461.819,194.914 L467.366,197.438 L473.205,200.000 L479.022,202.799 L484.486,206.000 L489.280,209.718 L493.135,214.011 L495.862,218.871 L497.371,224.236 L497.680,229.998 L496.920,236.017 L495.319,242.144 L493.185,248.236 L490.868,254.177 L488.730,259.884 L487.105,265.322 L486.265,270.498 L486.392,275.461 L487.554,280.287 L489.705,285.070 L492.682,289.902 L496.225,294.862 L500.000,300.000 Z";

const createScallopedRectPath = (): SkPath => {
    const scallopedPath = Skia.Path.MakeFromSVGString(SCALLOPED_BORDER_PATH_DATA);

    if (!scallopedPath) {
        return createRoundedRectPath();
    }

    const bounds = scallopedPath.getBounds();

    if (bounds.width === 0 || bounds.height === 0) {
        return createRoundedRectPath();
    }

    // Normalize the original SVG coordinates so the shape starts at (0, 0).
    scallopedPath.offset(-bounds.x, -bounds.y);

    const matrix = Skia.Matrix();
    matrix.scale(CARD_WIDTH / bounds.width, CARD_WIDTH / bounds.height);
    scallopedPath.transform(matrix);

    return scallopedPath;
};


const getPathForShape = (shape: ShapeType): SkPath => {
    switch (shape) {
        case "rounded":
            return createRoundedRectPath();
        case "rectangle":
            return createRectanglePath();
        case "scallop":
            return createScallopedRectPath();
        default:
            return createRoundedRectPath();
    }
};

const ShapeCard = ({ src, shape }: Omit<ShapeCardDescriptor, "id" | "variant">) => {
    const image = useImage(src);
    const shapePath = useMemo(() => getPathForShape(shape), [shape]);

    return (
        <View style={[styles.cardBase, styles.shapeCard, shape !== "scallop" && {
            borderWidth: 4,
            borderColor: "#FFFFFF"
        }]}>
            <Canvas style={[styles.shapeCanvas, shape === "scallop" && { height: CARD_WIDTH }]}>
                {image ? (
                    <Group clip={shapePath}>
                        <SkiaImage image={image} fit="cover" strokeWidth={2} x={0} y={0} width={CARD_WIDTH} height={shape === "scallop" ? CARD_WIDTH : CARD_HEIGHT} />
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
