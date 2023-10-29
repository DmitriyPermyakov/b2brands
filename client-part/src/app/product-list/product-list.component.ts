import { Component, OnInit } from '@angular/core'
import { IProduct } from '../interfaces/product.interface'
import { Store, select } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { productSelector } from '../store/products/products.selector'
import { gettingProductAction } from '../store/products/products.action'
import { AuthService } from '../services/auth.service'
import { IsMobileService } from '../services/is-mobile.service'

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
	products$: Observable<ReadonlyArray<IProduct>>

	constructor(private store: Store, public auth: AuthService, public mobileService: IsMobileService) {
		this.store.dispatch(gettingProductAction())
	}

	ngOnInit(): void {
		this.products$ = this.store.pipe(select(productSelector))
	}
}
