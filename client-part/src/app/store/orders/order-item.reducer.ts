import { createReducer, on } from '@ngrx/store'
import { addOrderItemAction, changeAmountOfOrderItemAction, removeOrderItemAction } from './order-item.action'
import { OrderItem } from 'src/app/interfaces/orderItem.interface'

const initialState: Array<OrderItem> = []

export const orderItemReducer = createReducer(
	initialState,
	on(addOrderItemAction, (state, { orderItem }) => {
		if (
			state.find(
				(el) =>
					el.vendorCode === orderItem.vendorCode &&
					el.color.value === orderItem.color.value &&
					el.printType === orderItem.printType
			)
		) {
			return state
		}
		return [...state, orderItem]
	}),
	on(changeAmountOfOrderItemAction, (state, { id, amount }) => {
		if (state.find((el) => el.id === id)) {
			let newState = state.map((el) => (el.id === id ? { ...state.find((el) => el.id === id), amount } : el))
			return newState
		}
		return state
	}),
	on(removeOrderItemAction, (state, { orderItemId }) => state.filter((s) => s.id !== orderItemId))
)
