import { Component, Input } from '@angular/core'
import { OrderItem } from '../interfaces/orderItem.interface'
import { Store } from '@ngrx/store'

@Component({
	selector: 'app-customer-order',
	templateUrl: './customer-order.component.html',
	styleUrls: ['./customer-order.component.css'],
})
export class CustomerOrderComponent {
	@Input() public productItem!: OrderItem

	constructor(private store: Store) {}

	changeAmount(event: number) {
		let id: string = this.productItem.id
		let amount: number = event
		// this.store.dispatch(changeAmountOfOrderItemAction({ id, amount }))
	}

	removeItem() {
		let orderItemId: string = this.productItem.id
		// this.store.dispatch(removeOrderItemAction({ orderItemId }))
	}
}
