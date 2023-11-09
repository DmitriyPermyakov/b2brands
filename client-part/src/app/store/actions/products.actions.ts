import { createAction, props } from '@ngrx/store'
import { IProduct } from 'src/app/interfaces/product.interface'

export const loadProductsAction = createAction('[Poduct List Component] Load products')

export const loadProductsSuccessAction = createAction(
	'[Load Product Effect] Load Products Success',
	props<{ products: IProduct[] }>()
)

export const loadProductsFailure = createAction('[Load Products Effect] Load Products Failure', props<{ error: any }>())
