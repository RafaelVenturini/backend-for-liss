export interface Product {
    sku: string;
    name: string;
    price: number;
    sale: number;
    priority: number;
    colors: Color[];
}

export interface Color {
    id: number;
    color: string;
    stock: boolean;
    newer: boolean;
    reposition: boolean;
    highlight: boolean;
    img: string;
}

export interface ChangerBody {
    table: "catalogo" | "vitrine";
    color?: Color;
    product?: Product;
}

export interface ChangerColor {
    table: "catalogo" | "vitrine";
    color: Color;
}

export interface ChangerProduct {
    table: "catalogo" | "vitrine";
    product: Product;
}