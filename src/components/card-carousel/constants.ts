import {
    CardDescriptor,
    FriendsCardDescriptor,
    ListCardDescriptor,
    ShapeCardDescriptor,
} from "./types";

export const CARD_WIDTH = 130;
export const CARD_HEIGHT = 150;
export const CARD_SPACING = 16;

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

export const SHAPE_CARDS: ShapeCardDescriptor[] = [
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

export const CONTENT_CARDS: CardDescriptor[] = [
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

export const CARDS: CardDescriptor[] = [...SHAPE_CARDS, ...CONTENT_CARDS];
