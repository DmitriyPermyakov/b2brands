import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IProduct } from 'src/app/interfaces/product.interface'

export const productFeatureSelector = createFeatureSelector<ReadonlyArray<IProduct>>('products')

export const productSelector = createSelector(productFeatureSelector, (products: ReadonlyArray<IProduct>) => {
	return products
})
