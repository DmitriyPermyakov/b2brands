import { Component, OnInit } from '@angular/core'
import { ClientOrder } from '../interfaces/clientOrder.interface'
import { IProduct } from '../interfaces/product.interface'
import { OrderItem } from '../interfaces/orderItem.interface'

@Component({
	selector: 'app-edit-order',
	templateUrl: './edit-order.component.html',
	styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {
	public isSelectProductVisible: boolean = false
	public editable: boolean = false
	public order: ClientOrder
	ngOnInit(): void {
		this.order = JSON.parse(localStorage.getItem('client-order')) as ClientOrder
	}
	edit(): void {
		this.editable = true
	}

	showProductModal() {
		this.isSelectProductVisible = true
		console.log(this.isSelectProductVisible)
	}
	closeProductModal(value: boolean) {
		this.isSelectProductVisible = value
	}

	addItem(p: IProduct) {
		console.log(p)
		this.isSelectProductVisible = false
		let orderItem: OrderItem = {
			id: 'asdfasf',
			name: p.name,
			vendorCode: p.code,
			color: p.productColors[0],
			printType: p.print[0],
			amount: 1,
			price: p.newPrice,
			status: 'В заказе',
			comment: '',
		}

		this.order.orderItems.push(orderItem)
	}

	cancel(): void {
		this.editable = false
	}
}
