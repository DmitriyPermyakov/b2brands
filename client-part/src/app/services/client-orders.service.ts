import { Injectable } from '@angular/core';
import { ClientContacts, ClientOrder, OrderItem } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientOrdersService {
  private clientOrder!: ClientOrder; 
  private clientContact!: ClientContacts;
  private orderPosition!: OrderItem[];
  constructor() { 
    this.clientOrder = {
      id: 'id',
      contacts: new ClientContacts,
      orderItems: []
    };
  }

  createClientOrder() {

  }

  addPositionToOrder(orderItem: OrderItem) {
    this.clientOrder.orderItems.push(orderItem);
  }
  

  getClientOrderById(id: string) {
    
  }

  getOrderFromMemory(): ClientOrder {
    return this.clientOrder;
  }
}
