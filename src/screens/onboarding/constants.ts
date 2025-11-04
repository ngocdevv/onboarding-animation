import { ImageSourcePropType } from "react-native";

export type CharacterOffset = {
    x: number;
    y: number;
};

export type HeadlineWord = {
    text: string;
    offsets: CharacterOffset[];
};

export type HeadlineSegment =
    | { type: "words"; words: HeadlineWord[] }
    | { type: "text"; text: string; offsets: CharacterOffset[] }
    | { type: "avatars"; sources: ImageSourcePropType[]; offsets: CharacterOffset[] };

export type HeadlineLine = {
    id: string;
    segments: HeadlineSegment[];
};

export type ActionButton = {
    id: string;
    label: string;
    variant: "primary" | "secondary";
};

const AVATAR_IMAGE = require("@/assets/images/avatar.jpg");

export const GRADIENT_COLORS = ["#e0d4f2ff", "#FFFFFF", "#E8F5E9"] as const;
export const GRADIENT_LOCATIONS = [0, 0.55, 1] as const;

export const HEADLINE_LINES: HeadlineLine[] = [
    {
        id: "headline-primary",
        segments: [
            {
                type: "words",
                words: [
                    {
                        text: "See",
                        offsets: [
                            { x: -80, y: 40 },
                            { x: -60, y: 200 },
                            { x: 100, y: 220 },
                        ],
                    },
                    {
                        text: "what",
                        offsets: [
                            { x: -120, y: -40 },
                            { x: 140, y: 140 },
                            { x: 170, y: 170 },
                            { x: 190, y: 190 },
                        ],
                    },
                    {
                        text: "your",
                        offsets: [
                            { x: 120, y: 160 },
                            { x: 160, y: 220 },
                            { x: -80, y: 180 },
                            { x: 150, y: 240 },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "headline-secondary",
        segments: [
            {
                type: "text",
                text: "friends",
                offsets: [
                    { x: -80, y: 40 },
                    { x: -60, y: 200 },
                    { x: 100, y: 220 },
                    { x: -120, y: -40 },
                    { x: 140, y: 140 },
                    { x: 170, y: 170 },
                    { x: 190, y: 190 },
                ],
            },
            {
                type: "avatars",
                sources: [AVATAR_IMAGE, AVATAR_IMAGE, AVATAR_IMAGE],
                offsets: [
                    { x: -60, y: 120 },
                    { x: 100, y: 140 },
                    { x: 200, y: 140 },
                ],
            },
            {
                type: "text",
                text: "want",
                offsets: [
                    { x: 120, y: 160 },
                    { x: 160, y: 220 },
                    { x: -80, y: 180 },
                    { x: 150, y: 240 },
                ],
            },
        ],
    },
];

export const SUBTITLE_TEXT =
    "Your friends' wish lists are waiting\n— sneak a look and spread the joy!";

export const ACTION_BUTTONS: ActionButton[] = [
    { id: "find-friends", label: "Find Friends", variant: "secondary" },
    { id: "create-account", label: "Create an account", variant: "primary" },
];
