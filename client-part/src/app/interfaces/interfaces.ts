export interface IProduct {
    id: string,
    name: string,
    code: string,
    description: string,
    print: string[],
    productProps: IProductProperty[],
    productColors: IProductColor[],
    newPrice: number,
    oldPrice: number
}

export interface IProductProperty {
    id: number,
    name: string,
    value: string
}

export interface IProductColor {
    id: string,
    value: string,
    frontSmallUrl: string,
    leftSmallUrl: string,
    bottomSmallUrl: string,
    rightSmallUrl: string
}

export class ClientOrder {
    id!: string;
    contacts!: ClientContacts;
    orderItems!: OrderItem[];
}

export class ClientContacts {
    id!: string;
    name!: string;
    phone!: string;
    email!: string
}

export class OrderItem {
    id!: string;
    name!: string;
    vendorCode!: string;
    color!: IProductColor;
    printType!: string;
    amount!: number;
    price!: number;
    status!: string;
    comment!: string;
}