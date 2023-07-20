import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IProduct } from '../interfaces/interfaces';

@Component({
  selector: 'app-client-product-list',
  templateUrl: './client-product-list.component.html',
  styleUrls: ['./client-product-list.component.css']
})
export class ClientProductListComponent implements OnInit {
  products: IProduct[] = [];
  
  constructor(private productService:ProductsService) {

  }

  ngOnInit() {
    this.productService.getAll().subscribe(p => {
      this.products = p;
      console.log(p);
    });
  }
}
