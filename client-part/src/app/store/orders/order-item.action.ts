import { createAction, props } from '@ngrx/store'
import { OrderItemActionTypes } from './orderItemActionTypes'
import { OrderItem } from 'src/app/interfaces/orderItem.interface'

export const addOrderItemAction = createAction(OrderItemActionTypes.ADD_ITEM, props<{ orderItem: OrderItem }>())

export const removeOrderItemAction = createAction(OrderItemActionTypes.REMOVE_ITEM, props<{ orderItemId: string }>())
export const changeAmountOfOrderItemAction = createAction(
	OrderItemActionTypes.CHANGE_AMOUNT,
	props<{ id: string; amount: number }>()
)
