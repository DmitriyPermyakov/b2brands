import { Component, OnInit } from '@angular/core'
import { OrderItem } from '../interfaces/orderItem.interface'

import { Store, select } from '@ngrx/store'
import { Observable, map, switchMap } from 'rxjs'
import { orderItemSelector } from '../store/orders/order-item.selector'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { PhoneValidator } from '../validators/phoneValidator'
import { ClientOrder } from '../interfaces/clientOrder.interface'

@Component({
	selector: 'app-customer-orders',
	templateUrl: './customer-orders.component.html',
	styleUrls: ['./customer-orders.component.css'],
})
export class CustomerOrdersComponent implements OnInit {
	public orderItems$: Observable<ReadonlyArray<OrderItem>>
	public isOrderNotEmpty$: Observable<boolean>
	public form: FormGroup
	public isFormVisible: boolean = false

	constructor(private store: Store) {}
	ngOnInit(): void {
		this.orderItems$ = this.store.pipe(select(orderItemSelector))
		this.isOrderNotEmpty$ = this.store.pipe(select(orderItemSelector)).pipe(map((order) => order.length > 0))
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
			let orderSub = this.orderItems$.pipe(map((el) => [...el])).subscribe((el) => (orderItems = el))

			const clientOrder: ClientOrder = {
				id: '0000-0000-0000-0000',
				contacts: {
					id: '0000-0000-0000',
					name: this.form.value.name,
					phone: this.form.value.phone,
					email: this.form.value.email,
				},
				orderItems: orderItems,
			}

			console.log(clientOrder)
			this.isFormVisible = false
			if (orderSub) orderSub.unsubscribe()
		}
	}

	closeForm(): void {
		this.isFormVisible = false
	}
}
