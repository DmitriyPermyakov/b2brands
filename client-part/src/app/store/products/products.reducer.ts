import { createReducer, on } from '@ngrx/store'
import { IProduct } from 'src/app/interfaces/product.interface'
import { gettingProductAction, gettingProductActionSuccess } from './products.action'

const initialState: IProduct[] = []

export const gettingProductReducer = createReducer(
	initialState,
	on(gettingProductAction, (state): IProduct[] => {
		return state
	}),
	on(gettingProductActionSuccess, (state, { products }): IProduct[] => ({
		...state,
		...products,
	}))
)
