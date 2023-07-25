import { createAction, props } from '@ngrx/store'
import { ProductsActionTypes } from './productsActionTypes'
import { IProduct } from 'src/app/interfaces/product.interface'
import { IBackendErrors } from 'src/app/interfaces/backendErrors.interface'

export const gettingProductAction = createAction(ProductsActionTypes.GETTING_PRODUCTS)

export const gettingProductActionSuccess = createAction(
	ProductsActionTypes.GETTING_PRODUCTS_SUCCESS,
	props<{ products: IProduct[] }>()
)
export const gettingProductActionFailure = createAction(
	ProductsActionTypes.GETTING_PRODUCTS_FAILURE,
	props<{ errors: IBackendErrors }>()
)
