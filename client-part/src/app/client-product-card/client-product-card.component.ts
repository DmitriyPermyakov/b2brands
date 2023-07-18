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
  
  @ViewChild('colors') colorsRef!: ElementRef;
  @ViewChild('prints') printsRef!: ElementRef;

  public product!: Product;
  public colors!: ProductColor[];
  public prints!: string[];

  private selectedColorIndex: number = 0; 
  private selectedPrintIndex: number = 0;

  private colorsCount: number = 0;
  private printCount: number = 0;
  private productImageColorIndex = 0;

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
    this.colorsCount = this.colorsRef.nativeElement.childElementCount;
    this.printCount = this.printsRef.nativeElement.childElementCount;
    
    this.selectedColorIndex = this.initSelectedIndex(this.colorsCount);
    this.selectedPrintIndex = this.initSelectedIndex(this.printCount);

    this.productImageColorIndex = this.selectedColorIndex;
    console.log(this.selectedPrintIndex);

    this.colorsRef.nativeElement.children[this.selectedColorIndex].classList.add('selected');    
    this.printsRef.nativeElement.children[this.selectedPrintIndex].classList.add('selected');
  }

  private initSelectedIndex(count: number): number {
    if(count <= 0)
      return 0;

    if(count <= 2) {     
      return 0;
    }
    
    if(count >= 6) {      
      return 2;
    }

    return Math.trunc(count / 2) ;    
  }



  onScrollColors(event: WheelEvent) {
    this.onScroll(event, this.colorsRef, this.selectedColorIndex);  
    this.changeImageColor(event);        
  }

  private changeImageColor(event: WheelEvent) {
   
  }

  onScrollPrints(event: WheelEvent) {
    this.onScroll(event, this.printsRef, this.selectedPrintIndex);    
  }

  private onScroll(event: WheelEvent, element: ElementRef, selectedIndex: number) {
    if (event.deltaY < 0) {
      this.onScrollUp(element);      
      this.scrollUpChangeSelectedClass(element, selectedIndex);
    }
    
    if (event.deltaY > 0) {
      this.onScrollDown(element);      
      this.scrollDownChangeSelectedClass(element, selectedIndex);
    }    
  }

  private onScrollUp(scrollElement: ElementRef) {    
    let lastElement = scrollElement.nativeElement.children[scrollElement.nativeElement.childElementCount - 1];    
    scrollElement.nativeElement.insertBefore(lastElement, scrollElement.nativeElement.children[0]);    
  }  


   private onScrollDown(scrollElement: ElementRef) {
    let firstElement = scrollElement.nativeElement.children[0];         
    
    scrollElement.nativeElement.insertBefore(firstElement, scrollElement.nativeElement.children[scrollElement.nativeElement.childElementCount] );    
  }


  private scrollUpChangeSelectedClass(element: ElementRef, index: number) {
    element.nativeElement.children[index - 2]?.classList.remove('hidden');
    element.nativeElement.children[index - 2]?.classList.add('second');
    element.nativeElement.children[index - 1]?.classList.remove('second');
    element.nativeElement.children[index - 1]?.classList.add('first');
    element.nativeElement.children[index]?.classList.remove('first');
    element.nativeElement.children[index]?.classList.add('selected');
    
    element.nativeElement.children[index + 1]?.classList.remove('selected');
    element.nativeElement.children[index + 1]?.classList.add('first');
    element.nativeElement.children[index + 2]?.classList.remove('first');
    element.nativeElement.children[index + 2]?.classList.add('second');
    element.nativeElement.children[index + 3].classList.remove('second');
    element.nativeElement.children[index + 3]?.classList.add('hidden');    
  }

  private scrollDownChangeSelectedClass(element: ElementRef, index: number) {
    element.nativeElement.children[index + 2]?.classList.remove('hidden');
    element.nativeElement.children[index + 2]?.classList.add('second');

    element.nativeElement.children[index + 1]?.classList.remove('second');
    element.nativeElement.children[index + 1]?.classList.add('first');
    

    element.nativeElement.children[index]?.classList.remove('first');
    element.nativeElement.children[index]?.classList.add('selected');
    element.nativeElement.children[index - 1]?.classList.remove('selected');
    element.nativeElement.children[index - 1]?.classList.add('first');
    
    element.nativeElement.children[index - 2]?.classList.remove('first');
    element.nativeElement.children[index - 2]?.classList.add('second');    

    for(let i = 0; i < element.nativeElement.childElementCount; i++) {
      if(i > 4) {
        element.nativeElement.children[i].classList.add('hidden');
      }
    }    
  }

}
