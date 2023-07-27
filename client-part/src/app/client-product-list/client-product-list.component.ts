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
export class ClientProductListComponent implements OnInit {
	products$: Observable<ReadonlyArray<IProduct>>

	constructor(private store: Store) {
		this.store.dispatch(gettingProductAction())
	}

	ngOnInit(): void {
		this.products$ = this.store.pipe(select(productSelector))
	}
}
