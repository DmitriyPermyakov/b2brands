import { Injectable } from '@angular/core'
import { ClientOrder } from '../interfaces/clientOrder.interface'
import { ClientContacts } from '../interfaces/clientContacts.interface'
import { OrderItem } from '../interfaces/orderItem.interface'

@Injectable({
	providedIn: 'root',
})
export class ClientOrdersService {
	private clientOrder!: ClientOrder
	private clientContact!: ClientContacts
	private orderPosition!: OrderItem[]
	constructor() {
		this.clientOrder = {
			id: 'id',
			contacts: new ClientContacts(),
			orderItems: [],
		}
	}

	createClientOrder() {}

	addPositionToOrder(orderItem: OrderItem) {
		this.clientOrder.orderItems.push(orderItem)
	}

	getClientOrderById(id: string) {}

	getOrderFromMemory(): ClientOrder {
		return this.clientOrder
	}
}
