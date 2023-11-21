import { createReducer, on } from '@ngrx/store'
import * as OrderItemsActions from '../actions/order-items.actions'
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'
import { OrderItem } from 'src/app/interfaces/orderItem.interface'

export const orderItemsFeatureKey = 'orderItems'

export interface State extends EntityState<OrderItem> {}
const adapter: EntityAdapter<OrderItem> = createEntityAdapter<OrderItem>()

export const initialState: State = adapter.getInitialState({})
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors()

export const reducer = createReducer(
	initialState,
	on(OrderItemsActions.createOrderItem, (state, action) => adapter.addOne(action.orderItem, state)),
	on(OrderItemsActions.upsetOrderItem, (state, action) => adapter.upsertOne(action.orderItem, state)),
	on(OrderItemsActions.removeOrderItem, (state, action) => adapter.removeOne(action.id, state)),
	on(OrderItemsActions.loadOrderItems, (state, action) => adapter.setAll(action.orderItems, state))
)
