import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Product } from '../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() public product: any;
  @Input() public index: number = 0;

   public colorIndex: number = 6;

  constructor (private router: Router) {
  }
  
  toProductCard() {
    this.router.navigate(['products', this.product.id], this.product);
  }
  
}
