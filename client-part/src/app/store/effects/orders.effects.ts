import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as OrderActions from '../actions/orders.actions'
import { OrdersService } from 'src/app/services/orders.service'
import { catchError, map, mergeMap, of, tap } from 'rxjs'

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

	constructor(private actions$: Actions, private orderService: OrdersService) {}
}
