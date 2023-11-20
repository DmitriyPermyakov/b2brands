import { createAction, props } from '@ngrx/store'
import { IProduct } from 'src/app/interfaces/product.interface'

//********* Load product ***************//

export const loadProductsAction = createAction('[Poduct List Component] Load products')

export const loadProductsSuccessAction = createAction(
	'[Load Product Effect] Load Products Success',
	props<{ products: IProduct[] }>()
)

export const loadProductsFailure = createAction('[Load Products Effect] Load Products Failure', props<{ error: any }>())

//********* Load product by id ***************//

export const loadProductById = createAction('[Product Card Component] Load Product by id', props<{ id: string }>())
export const loadProductByIdSuccess = createAction(
	'[Load Product Effect] Load Product by id success',
	props<{ product: IProduct }>()
)
export const loadProductByIdFailure = createAction(
	'[Load Product Effect] Load Product by id failure',
	props<{ error: any }>()
)

//********* Create Product ***************//

export const createProduct = createAction('[Product Card Component] Create product', props<{ product: IProduct }>())

export const createProductSuccess = createAction(
	'[Product effect] Create product success',
	props<{ product: IProduct }>()
)

export const createProductFailure = createAction('[Product effect] Create product failure', props<{ error: any }>())

//********* Update Product ***************//

export const upsertProduct = createAction('[Product Card Component] Upsert product', props<{ product: IProduct }>())

export const upsertProductSuccess = createAction(
	'[Product effect] Upsert product success',
	props<{ product: IProduct }>()
)

export const upsetProductFailure = createAction('[Product effect] Upset product failure', props<{ error: any }>())

//********* Delete Product ***************//

export const deleteProduct = createAction('[Product Card Component] Delete product', props<{ id: string }>())
export const deleteProductSuccess = createAction('[Product effect] Delete product success')
export const deleteProductFailure = createAction('[Product effect] Delete product failure', props<{ error: any }>())
