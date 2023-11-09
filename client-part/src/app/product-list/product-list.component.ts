import { Component, OnInit } from '@angular/core'
import { IProduct } from '../interfaces/product.interface'
import { Store, select } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { IsMobileService } from '../services/is-mobile.service'
import * as ProductActions from '../store/actions/products.actions'
import * as ProductSelectors from '../store/selectors/products.selectors'
import { AppState } from '../store'

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
	products$: Observable<IProduct[]>

	constructor(private store: Store<AppState>, public auth: AuthService, public mobileService: IsMobileService) {}

	ngOnInit(): void {
		this.store.dispatch(ProductActions.loadProductsAction())
		this.products$ = this.store.pipe(select(ProductSelectors.selectAllProducts))
	}
}
