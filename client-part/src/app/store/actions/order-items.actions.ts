import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store'
import { OrderItem } from 'src/app/interfaces/orderItem.interface'

export const loadOrderItemsFromLocalStorage = createAction(
	'[Product card, Customer Orders] Load order items from Local storage'
)
export const loadOrderItems = createAction(
	'[Order items effect] Load order items',
	props<{ orderItems: OrderItem[] }>()
)
export const createOrderItem = createAction(
	'[Product Card Component] Create order item',
	props<{ orderItem: OrderItem }>()
)
export const upsetOrderItem = createAction(
	'[Customer order component] Upsert product',
	props<{ orderItem: OrderItem }>()
)
export const removeOrderItem = createAction('[Customer order component] Remove order item', props<{ id: string }>())
