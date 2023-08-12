import { ClientContacts } from './clientContacts.interface'
import { OrderItem } from './orderItem.interface'

export class ClientOrder {
	id!: string
	contacts!: ClientContacts
	dateOfCreation: Date
	dateOfCompletion: Date
	status: string
	comment: string
	orderItems!: OrderItem[]
}
