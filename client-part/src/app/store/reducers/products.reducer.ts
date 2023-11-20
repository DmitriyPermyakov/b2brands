import { createReducer, on } from '@ngrx/store'
import * as productActions from '../actions/products.actions'
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'
import { IProduct } from 'src/app/interfaces/product.interface'

export const productsFeatureKey = 'products'

export interface State extends EntityState<IProduct> {}
export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>()

export const initialState: State = adapter.getInitialState({})

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors()

export const reducer = createReducer(
	initialState,
	on(productActions.loadProductsSuccessAction, (state, action) => adapter.setAll(action.products, state)),
	on(productActions.loadProductByIdSuccess, (state, action) => adapter.addOne(action.product, state)),
	on(productActions.upsertProductSuccess, (state, action) => adapter.upsertOne(action.product, state)),
	on(productActions.createProductSuccess, (state, action) => adapter.addOne(action.product, state)),
	on(productActions.deleteProduct, (state, action) => adapter.removeOne(action.id, state))
)
