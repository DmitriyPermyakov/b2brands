import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as OrderActions from '../actions/orders.actions'
import { OrdersService } from 'src/app/services/orders.service'
import { catchError, map, mergeMap, of, tap } from 'rxjs'
import { createAction } from '@ngrx/store'

@Injectable()
export class OrdersEffects {
	loadActiveOrders$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(OrderActions.loadActiveOrders),
			mergeMap((action) =>
				this.orderService.getActiveOrders().pipe(
					tap((orders) => console.log(orders)),
					map((orders) => OrderActions.loadActiveOrdersSuccess({ activeOrders: orders })),
					catchError((error) => of(OrderActions.loadActiveOrdersFailure({ error: error })))
				)
			)
		)
	})

	loadOrderById$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(OrderActions.loadOrderById),
			mergeMap((action) =>
				this.orderService.getOrderById(action.id).pipe(
					map((order) => OrderActions.loadOrderByIdSuccess({ order: order })),
					catchError((error) => of(OrderActions.loadOrderByIdFailure({ error: error })))
				)
			)
		)
	})

	createOrder$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(OrderActions.createOrder),
			mergeMap((action) =>
				this.orderService.createOrder(action.order).pipe(
					map((order) => OrderActions.createOrderSuccess({ order: order })),
					catchError((error) => of(OrderActions.createOrderFailure({ error: error })))
				)
			)
		)
	})

	upsertOrder$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(OrderActions.upsertOrder),
			mergeMap((action) =>
				this.orderService.updateOrder(action.order).pipe(
					map((order) => OrderActions.upsertOrderSuccess({ order: order })),
					catchError((error) => of(OrderActions.upsertProductFailure({ error: error })))
				)
			)
		)
	})

	removeOrder$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(OrderActions.deleteOrder),
			mergeMap((action) =>
				this.orderService.removeOrder(action.id).pipe(
					map(() => OrderActions.deleteOrderSuccess()),
					catchError((error) => of(OrderActions.deleteOrderFailure({ error: error })))
				)
			)
		)
	})

	constructor(private actions$: Actions, private orderService: OrdersService) {}
}
