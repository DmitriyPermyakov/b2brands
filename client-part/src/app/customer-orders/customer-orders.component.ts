import { Component, OnInit } from '@angular/core'
import { OrderItem } from '../interfaces/orderItem.interface'

import { Store, select } from '@ngrx/store'
import { Observable, isEmpty, map, switchMap, tap } from 'rxjs'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { PhoneValidator } from '../validators/phoneValidator'
import { ClientOrder } from '../interfaces/clientOrder.interface'
import * as OrderItemsSelector from '../store/selectors/order-items.selectors'
import * as OrderItemsAction from '../store/actions/order-items.actions'

@Component({
	selector: 'app-customer-orders',
	templateUrl: './customer-orders.component.html',
	styleUrls: ['./customer-orders.component.css'],
})
export class CustomerOrdersComponent implements OnInit {
	public orderItems$: Observable<OrderItem[]>
	public isOrderNotEmpty$: Observable<boolean>
	public form: FormGroup
	public isFormVisible: boolean = false

	constructor(private store: Store) {}
	ngOnInit(): void {
		this.store.dispatch(OrderItemsAction.loadOrderItemsFromLocalStorage())

		this.isOrderNotEmpty$ = this.store.pipe(
			select(OrderItemsSelector.orderItemsCount),
			map((c) => c > 0)
		)

		this.orderItems$ = this.store.pipe(select(OrderItemsSelector.selectAllOrderItems))

		this.form = new FormGroup({
			name: new FormControl('', Validators.required),
			phone: new FormControl('', [Validators.required, PhoneValidator.phoneValidator]),
			email: new FormControl('', Validators.email),
		})
	}

	approveOrder(): void {
		this.isFormVisible = true
	}
	submit() {
		if (this.form.valid) {
			let orderItems: OrderItem[] = []
			let orderSub = this.orderItems$.subscribe((orders) => (orderItems = orders))

			const clientOrder: ClientOrder = {
				id: '0000-0000-0000-0000',
				contacts: {
					id: '0000-0000-0000',
					name: this.form.value.name,
					phone: this.form.value.phone,
					email: this.form.value.email,
				},
				// #TODO: fix dates
				dateOfCreation: new Date(Date.now()),
				dateOfCompletion: new Date(Date.now()),
				status: 'В заказе',
				comment: 'Сделать как можно быстрее',
				orderItems: orderItems,
			}

			console.log(clientOrder)
			this.isFormVisible = false
			localStorage.setItem('client-order', JSON.stringify(clientOrder))
			if (orderSub) orderSub.unsubscribe()
		}
	}

	closeForm(): void {
		this.isFormVisible = false
	}
}
