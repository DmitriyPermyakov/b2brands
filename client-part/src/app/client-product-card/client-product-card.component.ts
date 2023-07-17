import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product, ProductColor } from '../interfaces/interfaces';

@Component({
  selector: 'app-client-product-card',
  templateUrl: './client-product-card.component.html',
  styleUrls: ['./client-product-card.component.css']
})
export class ClientProductCardComponent implements OnInit, AfterViewInit {
  @HostListener('mousewheel', ['$event']) onMouseWheel(event: WheelEvent) {
    if(event.deltaY < 0) {
      this.onScrollUp();
    }
    
    if(event.deltaY > 0) {
      this.onScrollDown();
    }
    
  }
  @ViewChild('colors') colorsRef!: ElementRef;

  public product!: Product;
  public colors!: ProductColor[];
  public prints!: string[];

  public selectedColorIndex: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.getById(id)
      .subscribe(p => {
        this.product = p;
        this.colors = p.productColors;
        this.prints = p.print;
      });     
  }

  ngAfterViewInit() {
    this.initColorIndex();
    this.colorsRef.nativeElement.childNodes[this.selectedColorIndex].classList.add('selected');    
    
  }

  initColorIndex() {
    if(this.colors.length <= 0)
      return;

    if(this.colors.length <= 2) {
      this.selectedColorIndex = 0;
      return;
    }
    
    if(this.colors.length >= 6) {
      this.selectedColorIndex = 2;
    }

    this.selectedColorIndex = this.colors.length / 2 ;    
  }

  onScrollUp() {
    let firstElement = this.colorsRef.nativeElement.children[0];    
    let lastElement = this.colorsRef.nativeElement.children[this.colorsRef.nativeElement.childElementCount - 1];
    
    let temp = firstElement.cloneNode(true);
    
    this.colorsRef.nativeElement.replaceChild(lastElement, firstElement);
    this.colorsRef.nativeElement.insertBefore(temp, this.colorsRef.nativeElement.children[1]);    
  }
  

  onScrollDown() {
    let firstElement = this.colorsRef.nativeElement.children[0];    
    let lastElement = this.colorsRef.nativeElement.children[this.colorsRef.nativeElement.childElementCount - 1];
    
    let temp = lastElement.cloneNode(true);
    
    this.colorsRef.nativeElement.replaceChild(firstElement, lastElement);
     this.colorsRef.nativeElement.insertBefore(temp, this.colorsRef.nativeElement.children[this.colorsRef.nativeElement.childElementCount - 1] );    
  }


}
