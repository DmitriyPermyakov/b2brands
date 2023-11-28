import { isDevMode } from '@angular/core'
import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store'
import * as fromProducts from './reducers/products.reducer'
import * as fromOrders from './reducers/orders.reducer'

export interface AppState {
	[fromProducts.productsFeatureKey]: fromProducts.State
	[fromOrders.ordersFeatureKey]: fromOrders.State
}

export const reducers: ActionReducerMap<AppState> = {
	[fromProducts.productsFeatureKey]: fromProducts.reducer,
	[fromOrders.ordersFeatureKey]: fromOrders.reducer,
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : []
