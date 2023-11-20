import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as ProductReducer from '../reducers/products.reducer'

export const productFeatureSelector = createFeatureSelector<ProductReducer.State>(ProductReducer.productsFeatureKey)

export const selectAllProducts = createSelector(productFeatureSelector, ProductReducer.selectAll)

export const selectProductById = (id: string) =>
	createSelector(selectAllProducts, (entities) => entities.find((p) => p.id == id))

export const productExists = (id: string) =>
	createSelector(selectAllProducts, (entities): boolean => {
		return entities.find((p) => p.id == id) == undefined ? false : true
	})

export const productCount = createSelector(productFeatureSelector, ProductReducer.selectTotal)
