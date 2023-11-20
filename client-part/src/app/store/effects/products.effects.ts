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

	loadProductById$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActions.loadProductById),
			mergeMap((action) =>
				this.productService.getById(action.id).pipe(
					map((product) => ProductActions.loadProductByIdSuccess({ product: product })),
					catchError((error) => of(ProductActions.loadProductByIdFailure({ error: error })))
				)
			)
		)
	})

	createProduct$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActions.createProduct),
			mergeMap((action) =>
				this.productService.create(action.product).pipe(
					map((product) => ProductActions.createProductSuccess({ product: product })),
					catchError((error) => of(ProductActions.createProductFailure({ error: error })))
				)
			)
		)
	})

	updateProduct$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActions.upsertProduct),
			mergeMap((action) =>
				this.productService.update(action.product).pipe(
					map((product) => ProductActions.upsertProductSuccess({ product: product })),
					catchError((error) => of(ProductActions.upsetProductFailure({ error: error })))
				)
			)
		)
	})

	deleteProduct$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActions.deleteProduct),
			mergeMap((action) =>
				this.productService.remove(action.id).pipe(
					map(() => ProductActions.deleteProductSuccess()),
					catchError((error) => of(ProductActions.deleteProductFailure({ error: error })))
				)
			)
		)
	})

	constructor(private actions$: Actions, private productService: ProductsService) {}
}
