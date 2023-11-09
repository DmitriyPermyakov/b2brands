import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as ProductReducer from '../reducers/products.reducer'

export const productFeatureSelector = createFeatureSelector<ProductReducer.State>(ProductReducer.productsFeatureKey)

export const selectAllProducts = createSelector(productFeatureSelector, ProductReducer.selectAll)
