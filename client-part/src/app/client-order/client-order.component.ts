import { Component, Input, OnInit } from '@angular/core'
import { OrderItem } from '../interfaces/orderItem.interface'
import { Store } from '@ngrx/store'
import { changeAmountOfOrderItemAction, removeOrderItemAction } from '../store/orders/order-item.action'

@Component({
	selector: 'app-client-order',
	templateUrl: './client-order.component.html',
	styleUrls: ['./client-order.component.css'],
})
export class ClientOrderComponent {
	@Input() public productItem!: OrderItem

	constructor(private store: Store) {}

	changeAmount(event: number) {
		let id: string = this.productItem.id
		let amount: number = event
		this.store.dispatch(changeAmountOfOrderItemAction({ id, amount }))
	}

	removeItem() {
		let orderItemId: string = this.productItem.id
		this.store.dispatch(removeOrderItemAction({ orderItemId }))
	}
}
