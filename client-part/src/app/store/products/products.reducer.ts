import { createReducer, on } from '@ngrx/store'
import { IProduct } from 'src/app/interfaces/product.interface'
import { gettingProductAction, gettingProductActionSuccess } from './products.action'

const initialState: ReadonlyArray<IProduct> = []

export const gettingProductReducer = createReducer(
	initialState,
	on(gettingProductAction, (state): ReadonlyArray<IProduct> => {
		return state
	}),
	on(gettingProductActionSuccess, (state, { products }): ReadonlyArray<IProduct> => products)
)
