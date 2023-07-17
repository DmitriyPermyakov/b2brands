export interface Product {
    id: string,
    name: string,
    code: string,
    description: string,
    print: string[],
    productProps: ProductProperty[],
    productColors: ProductColor[],
    newPrice: string,
    oldPrice: string
}

export interface ProductProperty {
    id: number,
    name: string,
    value: string
}

export interface ProductColor {
    id: number,
    value: string,
    frontSmallUrl: string,
    leftSmallUrl: string,
    bottomSmallUrl: string,
    rightSmallUrl: string
}