import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { IProduct, IProductColor, OrderItem } from '../interfaces/interfaces';
import { fromEvent, debounceTime, Subscription } from 'rxjs';
import { switchMap } from 'rxjs';
import { ClientOrdersService } from '../services/client-orders.service';

@Component({
  selector: 'app-client-product-card',
  templateUrl: './client-product-card.component.html',
  styleUrls: ['./client-product-card.component.css']
})
export class ClientProductCardComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  
  @ViewChild('colors') colorsRef!: ElementRef;
  @ViewChild('prints') printsRef!: ElementRef;
  @ViewChild('prevBtn') prevColorBtnRef!: ElementRef;
  @ViewChild('nextBtn') nextColorBtnRef!: ElementRef;

  public product!: IProduct;
  public productColor!: IProductColor;
  // public productColor: ProductColor = { 
  //   id: 1,
  //   value: "#33ff00",
  //   frontSmallUrl: "../../assets/caps/front.png",
  //   leftSmallUrl: "../../assets/caps/left.png",
  //   bottomSmallUrl: "../../assets/caps/back.png",
  //   rightSmallUrl: "../../assets/caps/right.png"
  // };
  public prints!: string[];

  

  private selectedColorIndex: number = 0; 
  private selectedPrintIndex: number = 0;

  private colorsCount: number = 0;
  private printCount: number = 0;
  private productAmount: number = 0;

  private changeImageOnScrollSub!: Subscription;
  private changeImageOnClickSub!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, 
    private productService: ProductsService, 
    private clientOrdersService: ClientOrdersService) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.getById(id)
      .subscribe(p => {
        this.product = p;                
      });    
  }

  ngAfterContentInit(): void {
    this.colorsCount = this.product.productColors.length;
    this.printCount = this.product.print.length;

    this.selectedColorIndex = this.initSelectedIndex(this.colorsCount);
    this.selectedPrintIndex = this.initSelectedIndex(this.printCount);  

    this.productColor = this.product.productColors[this.selectedColorIndex];
  }

  ngAfterViewInit() {  
    this.initColorsStartClasses(this.colorsRef, this.selectedColorIndex);
    this.initPrintStartClasses(this.printsRef, this.selectedPrintIndex);
    
    this.setColorValueAttribute(this.colorsRef);

    this.changeImageOnScroll();
    this.changeImageOnClick(this.prevColorBtnRef);
    this.changeImageOnClick(this.nextColorBtnRef);
  }

  ngOnDestroy(): void {
    if(this.changeImageOnScrollSub)
      this.changeImageOnScrollSub.unsubscribe();

    if(this.changeImageOnClickSub)
      this.changeImageOnClickSub.unsubscribe();
  }

  public addToCart() {
    let print = this.getSelectedTypeOfPrint();
    let orderItem: OrderItem = {
      id: "id",
      name: this.product.name,
      vendorCode: this.product.code,
      color: this.productColor,
      printType: print,
      price: this.product.newPrice,
      amount: this.productAmount,
      status: "В заказе",
      comment: ""
    }

    this.clientOrdersService.addPositionToOrder(orderItem);
  }
  
  public onScrollColors(event: WheelEvent) {    
    this.onScroll(event, this.colorsRef, this.selectedColorIndex);       
    
  }  

  public onScrollPrints(event: WheelEvent) {
    this.onScroll(event, this.printsRef, this.selectedPrintIndex);    
    
  }

  public previousColor() {
    this.onScrollUp(this.colorsRef);
    this.scrollUpChangeSelectedClass(this.colorsRef, this.selectedColorIndex);
  }

  public nextColor() {
    this.onScrollDown(this.colorsRef);
    this.scrollDownChangeSelectedClass(this.colorsRef, this.selectedColorIndex);
  }

  public quantityChanged(count: number) {
    this.productAmount = count;    
  }

  private getSelectedTypeOfPrint(): string {
    let children: HTMLCollection = this.printsRef.nativeElement.children;
    let print: string | undefined | null = Array.from(children)
      .find(el => el.classList.contains('selected'))
      ?.innerHTML;

    if(!print) {
      print = ""
    }
    return print;
  }

  private changeImageOnScroll() {
    let changeImage = fromEvent(this.colorsRef.nativeElement, 'wheel')
      .pipe(        
        debounceTime(1000),
        switchMap(() => this.setImage(this.colorsRef)),
      );

    this.changeImageOnScrollSub = changeImage.subscribe((color) => this.productColor = color );    
  }

  private changeImageOnClick(buttonRef: ElementRef) {
    let changeImage = fromEvent(buttonRef.nativeElement, 'click')
      .pipe(        
        debounceTime(1000),
        switchMap(() => this.setImage(this.colorsRef)),
      );

    this.changeImageOnClickSub = changeImage.subscribe(color => this.productColor = color);
  }

  private setImage(element: ElementRef) {    
      let children: HTMLCollection = element.nativeElement.children;
      let colorValue: string | undefined | null = Array.from(children)
        .find(el => el.classList.contains('selected'))
        ?.getAttribute("color-value");
      
      let images: any;
      return images = this.product.productColors.filter(p => p.value === colorValue)
  }

  private setColorValueAttribute(element: ElementRef) {
    for(let i = 0; i < element.nativeElement.childElementCount; i++) {
      element.nativeElement.children[i].setAttribute('color-value', this.product.productColors[i].value);
    }    
  }

  private initColorsStartClasses(element: ElementRef, index: number) {
    this.initStartClasses(element, index);
  }

  private initPrintStartClasses(element: ElementRef, index: number) {
    this.initStartClasses(element, index);
  }

  private initStartClasses(element: ElementRef, index: number) {
    element.nativeElement.children[index - 2]?.classList.add('second');
    element.nativeElement.children[index - 1]?.classList.add('first');
    element.nativeElement.children[index]?.classList.add('selected');
    element.nativeElement.children[index + 1]?.classList.add('first');
    element.nativeElement.children[index + 2]?.classList.add('second');

    for(let i = 0; i < element.nativeElement.childElementCount; i++) {
      if(i > 4)
        element.nativeElement.children[i]?.classList.add('hidden');
    }
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
    element.nativeElement.children[index + 3]?.classList.remove('second');
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
