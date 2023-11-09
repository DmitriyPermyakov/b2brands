import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as ProductActions from '../actions/products.actions'
import { ProductsService } from 'src/app/services/products.service'
import { catchError, map, mergeMap, of, tap } from 'rxjs'

@Injectable()
export class ProductsEffects {
	loadProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActions.loadProductsAction),
			mergeMap((action) =>
				this.productService.getAll().pipe(
					tap((p: any) => console.log('p', p)),
					map((products) => ProductActions.loadProductsSuccessAction({ products: products })),
					catchError((error) => of(ProductActions.loadProductsFailure({ error: error })))
				)
			)
		)
	})
	constructor(private actions$: Actions, private productService: ProductsService) {}
}
