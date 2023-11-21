import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as OrderItemsReducer from '../reducers/order-items.reducer'

export const orderItemsFeatureSelector = createFeatureSelector<OrderItemsReducer.State>(
	OrderItemsReducer.orderItemsFeatureKey
)
export const selectAllOrderItems = createSelector(orderItemsFeatureSelector, OrderItemsReducer.selectAll)

export const orderItemsCount = createSelector(orderItemsFeatureSelector, OrderItemsReducer.selectTotal)
