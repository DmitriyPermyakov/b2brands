import { Component, OnInit } from '@angular/core'
import { OrderItem } from '../interfaces/orderItem.interface'
import { ClientOrdersService } from '../services/client-orders.service'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { orderItemSelector } from '../store/orders/order-item.selector'

@Component({
	selector: 'app-client-orders',
	templateUrl: './client-orders.component.html',
	styleUrls: ['./client-orders.component.css'],
})
export class ClientOrdersComponent implements OnInit {
	public orderItems$: Observable<ReadonlyArray<OrderItem>>

	constructor(private store: Store) {}
	ngOnInit(): void {
		this.orderItems$ = this.store.pipe(select(orderItemSelector))
	}
}
