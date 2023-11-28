import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store'
import { ClientOrder } from 'src/app/interfaces/clientOrder.interface'

//********* Load active orders ***************//

export const loadActiveOrders = createAction('[List container component] Load active orders')

export const loadActiveOrdersSuccess = createAction(
	'[Orders effect] Load active orders success',
	props<{ activeOrders: ClientOrder[] }>()
)

export const loadActiveOrdersFailure = createAction(
	'[Orders effect] Load active orders failure',
	props<{ error: any }>()
)

//********* Load completed orders ***************//

export const loadCompletedOrders = createAction('[List container component] Load completed orders')

export const loadCompletedOrdersSuccess = createAction(
	'[Orders effect] Load completed orders success',
	props<{ completedOrders: ClientOrder[] }>()
)

export const loadCompletedOrdersFailure = createAction(
	'[Orders effect] Load completed orders failure',
	props<{ error: any }>()
)

//********* Load orders by id ***************//

export const loadOrderById = createAction('[Admin order component] Load order by id', props<{ id: string }>())

export const loadOrderByIdSuccess = createAction(
	'[Order effect] Load order by id success',
	props<{ order: ClientOrder }>()
)

export const loadOrderByIdFailure = createAction('[Order effect] Load order by id failure', props<{ error: any }>())

//********* Create order ***************//

export const createOrder = createAction('[Edit order component] Create order', props<{ order: ClientOrder }>())
export const createOrderSuccess = createAction('[Order effect] Create order success', props<{ order: ClientOrder }>())
export const createOrderFailure = createAction('[Order effect] Create order failure', props<{ error: any }>())

//********* Upsert orders ***************//

export const upsertOrder = createAction('[Edit order component] Upsert order', props<{ order: ClientOrder }>())

export const upsertOrderSuccess = createAction('[Order effect] Upsert product success', props<{ order: ClientOrder }>())

export const upsertProductFailure = createAction('[Order effect] Upsert product failure', props<{ error: any }>())

//********* Remove orders ***************//

export const deleteOrder = createAction('[Edit order component] Remove order', props<{ id: string }>())

export const deleteOrderSuccess = createAction('[Order effect] Remove order success')

export const deleteOrderFailure = createAction('[Order effect] Remove order failure', props<{ error: any }>())
