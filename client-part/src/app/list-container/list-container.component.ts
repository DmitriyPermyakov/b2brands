import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store, select } from '@ngrx/store'
import * as OrdersActions from '../store/actions/orders.actions'
import * as OrdersSelectors from '../store/selectors/orders.selectors'
import { ClientOrder } from '../interfaces/clientOrder.interface'
import { Observable } from 'rxjs'

@Component({
	selector: 'app-list-container',
	templateUrl: './list-container.component.html',
	styleUrls: ['./list-container.component.css'],
})
export class ListContainerComponent implements OnInit {
	public text: string = ''
	public orders$: Observable<ClientOrder[]>
	constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

	ngOnInit(): void {
		switch (this.activatedRoute.snapshot.routeConfig.path) {
			case 'active-orders':
				this.text = 'active'
				this.store.dispatch(OrdersActions.loadActiveOrders())
				this.orders$ = this.store.pipe(select(OrdersSelectors.selectAllOrders))
				break
			case 'completed-orders':
				this.text = 'completed'
				//dispatch completed
				break
			case 'products':
				this.text = 'products'
				//nothing
				break
		}
	}
}
