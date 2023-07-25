import { ClientContacts } from './clientContacts.interface';
import { OrderItem } from './orderItem.interface';

export class ClientOrder {
  id!: string;
  contacts!: ClientContacts;
  orderItems!: OrderItem[];
}
