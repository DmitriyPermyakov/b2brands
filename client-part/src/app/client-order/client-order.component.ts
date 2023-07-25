import { Component, Input } from '@angular/core';
import { OrderItem } from '../interfaces/orderItem.interface';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.css'],
})
export class ClientOrderComponent {
  @Input() public productItem!: OrderItem;
}
