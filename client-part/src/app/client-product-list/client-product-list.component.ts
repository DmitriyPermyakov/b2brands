import { Component, OnDestroy, OnInit } from '@angular/core'
import { IProduct } from '../interfaces/product.interface'
import { Store, select } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { productSelector } from '../store/products/products.selector'
import { gettingProductAction } from '../store/products/products.action'

@Component({
	selector: 'app-client-product-list',
	templateUrl: './client-product-list.component.html',
	styleUrls: ['./client-product-list.component.css'],
})
export class ClientProductListComponent implements OnInit, OnDestroy {
	products$: Observable<ReadonlyArray<IProduct>>
	productsSubscription!: Subscription

	constructor(private store: Store) {
		this.store.dispatch(gettingProductAction())
	}

	ngOnInit(): void {
		// this.productsSubscription = this.store.pipe(select(productSelector)).subscribe((p) => {
		// 	this.products = Array.from(Object.values(p))
		// })
		this.products$ = this.store.pipe(select(productSelector))
	}

	ngOnDestroy(): void {
		if (this.productsSubscription) this.productsSubscription.unsubscribe()
	}
}
