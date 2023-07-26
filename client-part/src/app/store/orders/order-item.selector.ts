import { createFeatureSelector, createSelector } from '@ngrx/store'
import { OrderItem } from 'src/app/interfaces/orderItem.interface'

export const orderItemFeatureSelector = createFeatureSelector<Array<OrderItem>>('orderItems')

export const orderItemSelector = createSelector(orderItemFeatureSelector, (orderItems: Array<OrderItem>) => orderItems)
