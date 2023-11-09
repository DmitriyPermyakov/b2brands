import { isDevMode } from '@angular/core'
import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store'
import * as fromProducts from './reducers/products.reducer'

export interface AppState {
	[fromProducts.productsFeatureKey]: fromProducts.State
}

export const reducers: ActionReducerMap<AppState> = { [fromProducts.productsFeatureKey]: fromProducts.reducer }

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : []
