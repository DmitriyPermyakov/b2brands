import { Component, Input, OnInit } from '@angular/core'
import { ClientOrder } from '../interfaces/clientOrder.interface'

@Component({
	selector: 'app-admin-order',
	templateUrl: './admin-order.component.html',
	styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent implements OnInit {
	@Input() order: ClientOrder
	@Input() number: number
	public totalPrice: number

	ngOnInit(): void {
		this.totalPrice = this.order.orderItems.reduce((sum, item) => {
			return (sum = item.amount * item.price)
		}, 0)
	}
}
