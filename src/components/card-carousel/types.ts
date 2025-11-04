export type ShapeType = "scallop" | "rounded" | "circle" | "rectangle";

export type ShapeCardDescriptor = {
    id: string;
    variant: "shape";
    src: string | number;
    shape: ShapeType;
    accentColor: string;
};

export type FriendsCardDescriptor = {
    id: string;
    variant: "friends";
    title: string;
    highlight: string;
    collage: string[];
};

export type ShoppingItem = {
    label: string;
    checked?: boolean;
    muted?: boolean;
};

export type ListCardDescriptor = {
    id: string;
    variant: "list";
    title: string;
    highlight: string;
    subtitle: string;
    items: ShoppingItem[];
};

export type CardDescriptor = ShapeCardDescriptor | FriendsCardDescriptor | ListCardDescriptor;
