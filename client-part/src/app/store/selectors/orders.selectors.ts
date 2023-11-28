import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as OrderReducers from '../reducers/orders.reducer'

export const orderFeatureSelector = createFeatureSelector<OrderReducers.State>(OrderReducers.ordersFeatureKey)

export const selectAllOrders = createSelector(orderFeatureSelector, OrderReducers.selectAll)

export const selectOrderById = (id: string) =>
	createSelector(selectAllOrders, (entities) => entities.find((o) => o.id == id))

export const orderExists = (id: string) =>
	createSelector(selectAllOrders, (entities): boolean => {
		return entities.find((o) => o.id == id) == undefined ? false : true
	})

export const ordersCount = createSelector(orderFeatureSelector, OrderReducers.selectTotal)
