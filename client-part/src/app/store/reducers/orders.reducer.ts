import { createReducer, on } from '@ngrx/store'
import * as OrdersAction from '../actions/orders.actions'
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'
import { ClientOrder } from 'src/app/interfaces/clientOrder.interface'

export const ordersFeatureKey = 'orders'

export interface State extends EntityState<ClientOrder> {}

const adapter: EntityAdapter<ClientOrder> = createEntityAdapter<ClientOrder>()

export const { selectAll, selectIds, selectEntities, selectTotal } = adapter.getSelectors()

export const initialState: State = adapter.getInitialState({})

export const reducer = createReducer(
	initialState,
	on(OrdersAction.loadActiveOrdersSuccess, (state, action) => adapter.setAll(action.activeOrders, state)),
	on(OrdersAction.loadCompletedOrdersSuccess, (state, action) => adapter.setAll(action.completedOrders, state)),
	on(OrdersAction.loadOrderByIdSuccess, (state, action) => adapter.addOne(action.order, state)),
	on(OrdersAction.createOrderSuccess, (state, action) => adapter.addOne(action.order, state)),
	on(OrdersAction.upsertOrder, (state, action) => adapter.upsertOne(action.order, state)),
	on(OrdersAction.deleteOrder, (state, action) => adapter.removeOne(action.id, state))
)
