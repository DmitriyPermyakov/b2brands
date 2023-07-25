import { IProductColor } from './productColor.interface'
import { IProductProperty } from './productProperty.interface'

export interface IProduct {
	id: string
	name: string
	code: string
	description: string
	print: string[]
	productProps: IProductProperty[]
	productColors: IProductColor[]
	newPrice: number
	oldPrice: number
}
