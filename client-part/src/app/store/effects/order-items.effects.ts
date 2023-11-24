import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as OrderItemsActions from '../actions/order-items.actions'
import * as OrderItemsSelectors from '../selectors/order-items.selectors'
import { catchError, concatMap, exhaustMap, map, merge, mergeMap, of, switchMap, tap } from 'rxjs'
import { Store, select } from '@ngrx/store'

@Injectable()
export class OrderItemsEffects {
	createOrderItem$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(OrderItemsActions.createOrderItem),
				mergeMap((action) =>
					this.store.pipe(
						select(OrderItemsSelectors.selectAllOrderItems),
						tap((o) => localStorage.setItem('orderItems', JSON.stringify(o)))
					)
				)
			)
		},
		{ dispatch: false }
	)

	deleteOrderItem$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(OrderItemsActions.removeOrderItem),
				mergeMap((action) =>
					this.store.pipe(
						select(OrderItemsSelectors.selectAllOrderItems),
						tap((o) => localStorage.setItem('orderItems', JSON.stringify(o)))
					)
				)
			)
		},
		{ dispatch: false }
	)

	updateOrderItem$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(OrderItemsActions.upsetOrderItem),
				mergeMap((action) =>
					this.store.pipe(
						select(OrderItemsSelectors.selectAllOrderItems),
						tap((o) => localStorage.setItem('orderItems', JSON.stringify(o)))
					)
				)
			)
		},
		{ dispatch: false }
	)

	loadOrderItems$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(OrderItemsActions.loadOrderItemsFromLocalStorage),
			concatMap(() =>
				of(JSON.parse(localStorage.getItem('orderItems'))).pipe(
					map((item) => {
						if (item == null) return []
						else return item
					}),
					map((item) => OrderItemsActions.loadOrderItems({ orderItems: item }))
				)
			)
		)
	})

	constructor(private actions$: Actions, private store: Store) {}
}
