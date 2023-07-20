import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../interfaces/interfaces';
import { ClientOrdersService } from '../services/client-orders.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css']
})
export class ClientOrdersComponent implements OnInit {
  public orderItems!: OrderItem[];
  
  constructor(private clientOrdersService: ClientOrdersService) {

  }
  ngOnInit(): void {
    this.orderItems = this.clientOrdersService.getOrderFromMemory().orderItems;
  }
  
}
