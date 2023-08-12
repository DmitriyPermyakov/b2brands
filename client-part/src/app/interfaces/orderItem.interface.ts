import { IProductColor } from './productColor.interface'

export class OrderItem {
	id!: string
	name!: string
	vendorCode!: string
	color!: IProductColor
	printType!: string
	amount!: number
	price!: number
	status!: string
	comment!: string
}
