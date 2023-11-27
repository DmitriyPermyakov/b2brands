import { Component, Input, OnInit } from '@angular/core'
import { OrderItem } from '../interfaces/orderItem.interface'
import { Store } from '@ngrx/store'
import * as OrderItemsActions from '../store/actions/order-items.actions'
import { FormControl, FormGroup } from '@angular/forms'
import { IsMobileService } from '../services/is-mobile.service'

@Component({
	selector: 'app-customer-order',
	templateUrl: './customer-order.component.html',
	styleUrls: ['./customer-order.component.css'],
})
export class CustomerOrderComponent implements OnInit {
	@Input() public productItem!: OrderItem

	public form: FormGroup
	public isMobile: boolean = false

	constructor(private store: Store, private mobileService: IsMobileService) {
		this.isMobile = this.mobileService.isMobile
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			amount: new FormControl(this.productItem.amount),
		})

		this.form.get('amount').valueChanges.subscribe((event) => this.changeAmount(event))
	}

	changeAmount(amountValue: number) {
		let orderItem = Object.assign({}, this.productItem)
		orderItem = { ...orderItem, amount: amountValue }
		console.log(orderItem)
		this.store.dispatch(OrderItemsActions.upsetOrderItem({ orderItem: orderItem }))
	}

	removeItem() {
		let orderItemId: string = this.productItem.id
		this.store.dispatch(OrderItemsActions.removeOrderItem({ id: orderItemId }))
	}
}
