import { Component, DoCheck, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quantiti',
  templateUrl: './quantiti.component.html',
  styleUrls: ['./quantiti.component.css']
})
export class QuantitiComponent implements OnInit{  
  @Input() inputQuantity!:number;
  @Output() public onQuantityChanged: EventEmitter<number> = new EventEmitter<number>()
  public quantity!: number;
 
  ngOnInit() {
    if(!this.inputQuantity)
      this.quantity = 1;
    else 
      this.quantity = this.inputQuantity;
  }

  increase() {
    this.quantity++;    
    this.onQuantityChanged.emit(this.quantity);
  }

  decrease() {
    if(this.quantity > 0) {
      this.quantity--;    
      this.onQuantityChanged.emit(this.quantity);
    }
    return;
  }

  onChange(event: Event) {
    this.onQuantityChanged.emit(this.quantity);
  }  

}
