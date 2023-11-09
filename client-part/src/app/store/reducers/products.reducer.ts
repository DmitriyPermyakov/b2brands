import { createReducer, on } from '@ngrx/store'
import * as productActions from '../actions/products.actions'
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'
import { IProduct } from 'src/app/interfaces/product.interface'

export const productsFeatureKey = 'products'

export interface State extends EntityState<IProduct> {
	products: IProduct[] | null
}
export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>()

export const initialState: State = adapter.getInitialState({
	products: [],
})

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors()
export const reducer = createReducer(
	initialState,
	on(productActions.loadProductsSuccessAction, (state, action) => {
		return adapter.setAll(action.products, state)
	})
)
