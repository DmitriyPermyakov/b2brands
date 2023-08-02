import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { HttpErrorResponse } from '@angular/common/http'
import { ProductsService } from 'src/app/services/products.service'
import { gettingProductAction, gettingProductActionFailure, gettingProductActionSuccess } from './products.action'
import { catchError, exhaustMap, map, of, tap } from 'rxjs'

@Injectable()
export class GettingProductEffect {
	constructor(private actions$: Actions, private productsService: ProductsService) {}

	gettingProducts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(gettingProductAction),
			exhaustMap(() => {
				return this.productsService.getAll().pipe(map((products) => gettingProductActionSuccess({ products })))
			}),
			catchError((errorResponse: HttpErrorResponse) => {
				return of(gettingProductActionFailure({ errors: errorResponse.error.errors }))
			})
		)
	)

	setErrors$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(gettingProductActionFailure),
				tap(({ errors }) => {
					console.log(errors)
				})
			),
		{ dispatch: false }
	)
}
