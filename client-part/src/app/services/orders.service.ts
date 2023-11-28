import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { ClientOrder } from '../interfaces/clientOrder.interface'

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
	constructor() {}

	getActiveOrders(): Observable<ClientOrder[]> {
		let activeOrders: Array<ClientOrder> = []
		activeOrders.push(JSON.parse(localStorage.getItem('client-order')))
		return of(Array.from(activeOrders))
	}

	getOrderById(id: string): Observable<ClientOrder> {
		let order = JSON.parse(localStorage.getItem('client-order'))
		return of(order)
	}

	updateOrder(order: ClientOrder): Observable<ClientOrder> {
		return of(order)
	}
}
