import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProductsService } from '../services/products.service'
import { OrderItem } from '../interfaces/orderItem.interface'
import { IProduct } from '../interfaces/product.interface'
import { IProductColor } from '../interfaces/productColor.interface'
import { fromEvent, debounceTime, Subscription, Observable } from 'rxjs'
import { switchMap } from 'rxjs'
import { ClientOrdersService } from '../services/client-orders.service'
import { Store, select } from '@ngrx/store'
import { productSelector } from '../store/products/products.selector'
import { addOrderItemAction } from '../store/orders/order-item.action'
import { orderItemSelector } from '../store/orders/order-item.selector'

@Component({
	selector: 'app-client-product-card',
	templateUrl: './client-product-card.component.html',
	styleUrls: ['./client-product-card.component.css'],
})
export class ClientProductCardComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
	@ViewChild('colors') colorsRef!: ElementRef
	@ViewChild('prints') printsRef!: ElementRef
	@ViewChild('prevBtn') prevColorBtnRef!: ElementRef
	@ViewChild('nextBtn') nextColorBtnRef!: ElementRef

	public cartIconDotActive: boolean = false

	public product!: IProduct
	public productColor!: IProductColor

	public prints!: string[]

	private selectedColorIndex: number = 0
	private selectedPrintIndex: number = 0

	private colorsCount: number = 0
	private printCount: number = 0
	private productAmount: number = 1

	private ordersItem$: Observable<ReadonlyArray<OrderItem>>

	private changeImageOnScrollSub!: Subscription
	private changeImageOnClickSub!: Subscription

	constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

	ngOnInit(): void {
		let id = this.activatedRoute.snapshot.paramMap.get('id')
		this.store.pipe(select(productSelector)).subscribe((p) => {
			let product = p.find((el) => el.id == id)

			if (product !== undefined) this.product = product
			else this.product = null
		})

		this.checkLocalStorageOnCurrentProduct()
		this.ordersItem$ = this.store.pipe(select(orderItemSelector))
		this.checkAmoutOfOrderItems()
	}

	ngAfterContentInit(): void {
		this.colorsCount = this.product.productColors.length
		this.printCount = this.product.print.length

		this.selectedColorIndex = this.initSelectedIndex(this.colorsCount)
		this.selectedPrintIndex = this.initSelectedIndex(this.printCount)

		this.productColor = this.product.productColors[this.selectedColorIndex]
	}

	ngAfterViewInit() {
		this.initColorsStartClasses(this.colorsRef, this.selectedColorIndex)
		this.initPrintStartClasses(this.printsRef, this.selectedPrintIndex)

		this.setColorValueAttribute(this.colorsRef)

		this.changeImageOnScroll()
		this.changeImageOnClick(this.prevColorBtnRef)
		this.changeImageOnClick(this.nextColorBtnRef)
	}

	ngOnDestroy(): void {
		if (this.changeImageOnScrollSub) this.changeImageOnScrollSub.unsubscribe()

		if (this.changeImageOnClickSub) this.changeImageOnClickSub.unsubscribe()
	}

	public addToCart() {
		let print = this.getSelectedTypeOfPrint()
		let orderItem: OrderItem = {
			id: Math.random().toString(16),
			name: this.product.name,
			vendorCode: this.product.code,
			color: this.productColor,
			printType: print,
			price: this.product.newPrice,
			amount: this.productAmount,
			status: 'В заказе',
			comment: '',
		}

		this.store.dispatch(addOrderItemAction({ orderItem }))
		this.checkAmoutOfOrderItems()
	}

	public onScrollColors(event: WheelEvent) {
		this.onScroll(event, this.colorsRef, this.selectedColorIndex)
	}

	public onScrollPrints(event: WheelEvent) {
		this.onScroll(event, this.printsRef, this.selectedPrintIndex)
	}

	public previousColor() {
		this.onScrollUp(this.colorsRef)
		this.scrollUpChangeSelectedClass(this.colorsRef, this.selectedColorIndex)
	}

	public nextColor() {
		this.onScrollDown(this.colorsRef)
		this.scrollDownChangeSelectedClass(this.colorsRef, this.selectedColorIndex)
	}

	public quantityChanged(count: number) {
		this.productAmount = count
	}

	private checkLocalStorageOnCurrentProduct() {
		if (this.product === null) {
			this.product = JSON.parse(localStorage.getItem('currentProduct'))
			console.log(this.product)
		} else {
			localStorage.setItem('currentProduct', JSON.stringify(this.product))
		}
	}

	private getSelectedTypeOfPrint(): string {
		let children: HTMLCollection = this.printsRef.nativeElement.children
		let print: string | undefined | null = Array.from(children).find((el) =>
			el.classList.contains('selected')
		)?.innerHTML

		if (!print) {
			print = ''
		}
		return print
	}

	private checkAmoutOfOrderItems() {
		this.ordersItem$.subscribe((o) => (this.cartIconDotActive = o.length > 0))
	}
	private changeImageOnScroll() {
		let changeImage = fromEvent(this.colorsRef.nativeElement, 'wheel').pipe(
			debounceTime(1000),
			switchMap(() => this.setImage(this.colorsRef))
		)

		this.changeImageOnScrollSub = changeImage.subscribe((color) => (this.productColor = color))
	}

	private changeImageOnClick(buttonRef: ElementRef) {
		let changeImage = fromEvent(buttonRef.nativeElement, 'click').pipe(
			debounceTime(1000),
			switchMap(() => this.setImage(this.colorsRef))
		)

		this.changeImageOnClickSub = changeImage.subscribe((color) => (this.productColor = color))
	}

	private setImage(element: ElementRef) {
		let children: HTMLCollection = element.nativeElement.children
		let colorValue: string | undefined | null = Array.from(children)
			.find((el) => el.classList.contains('selected'))
			?.getAttribute('color-value')

		return this.product.productColors.filter((p) => p.value === colorValue)
	}

	private setColorValueAttribute(element: ElementRef) {
		for (let i = 0; i < element.nativeElement.childElementCount; i++) {
			element.nativeElement.children[i].setAttribute('color-value', this.product.productColors[i].value)
		}
	}

	private initColorsStartClasses(element: ElementRef, index: number) {
		this.initStartClasses(element, index)
	}

	private initPrintStartClasses(element: ElementRef, index: number) {
		this.initStartClasses(element, index)
	}

	private initStartClasses(element: ElementRef, index: number) {
		element.nativeElement.children[index - 2]?.classList.add('second')
		element.nativeElement.children[index - 1]?.classList.add('first')
		element.nativeElement.children[index]?.classList.add('selected')
		element.nativeElement.children[index + 1]?.classList.add('first')
		element.nativeElement.children[index + 2]?.classList.add('second')

		for (let i = 0; i < element.nativeElement.childElementCount; i++) {
			if (i > 4) element.nativeElement.children[i]?.classList.add('hidden')
		}
	}

	private initSelectedIndex(count: number): number {
		if (count <= 0) return 0

		if (count <= 2) {
			return 0
		}

		if (count >= 6) {
			return 2
		}

		return Math.trunc(count / 2)
	}

	private onScroll(event: WheelEvent, element: ElementRef, selectedIndex: number) {
		if (event.deltaY < 0) {
			this.onScrollUp(element)
			this.scrollUpChangeSelectedClass(element, selectedIndex)
		}

		if (event.deltaY > 0) {
			this.onScrollDown(element)
			this.scrollDownChangeSelectedClass(element, selectedIndex)
		}
	}

	private onScrollUp(scrollElement: ElementRef) {
		let lastElement = scrollElement.nativeElement.children[scrollElement.nativeElement.childElementCount - 1]
		scrollElement.nativeElement.insertBefore(lastElement, scrollElement.nativeElement.children[0])
	}

	private onScrollDown(scrollElement: ElementRef) {
		let firstElement = scrollElement.nativeElement.children[0]

		scrollElement.nativeElement.insertBefore(
			firstElement,
			scrollElement.nativeElement.children[scrollElement.nativeElement.childElementCount]
		)
	}

	private scrollUpChangeSelectedClass(element: ElementRef, index: number) {
		element.nativeElement.children[index - 2]?.classList.remove('hidden')
		element.nativeElement.children[index - 2]?.classList.add('second')
		element.nativeElement.children[index - 1]?.classList.remove('second')
		element.nativeElement.children[index - 1]?.classList.add('first')
		element.nativeElement.children[index]?.classList.remove('first')
		element.nativeElement.children[index]?.classList.add('selected')

		element.nativeElement.children[index + 1]?.classList.remove('selected')
		element.nativeElement.children[index + 1]?.classList.add('first')
		element.nativeElement.children[index + 2]?.classList.remove('first')
		element.nativeElement.children[index + 2]?.classList.add('second')
		element.nativeElement.children[index + 3]?.classList.remove('second')
		element.nativeElement.children[index + 3]?.classList.add('hidden')
	}

	private scrollDownChangeSelectedClass(element: ElementRef, index: number) {
		element.nativeElement.children[index + 2]?.classList.remove('hidden')
		element.nativeElement.children[index + 2]?.classList.add('second')

		element.nativeElement.children[index + 1]?.classList.remove('second')
		element.nativeElement.children[index + 1]?.classList.add('first')

		element.nativeElement.children[index]?.classList.remove('first')
		element.nativeElement.children[index]?.classList.add('selected')
		element.nativeElement.children[index - 1]?.classList.remove('selected')
		element.nativeElement.children[index - 1]?.classList.add('first')

		element.nativeElement.children[index - 2]?.classList.remove('first')
		element.nativeElement.children[index - 2]?.classList.add('second')

		for (let i = 0; i < element.nativeElement.childElementCount; i++) {
			if (i > 4) {
				element.nativeElement.children[i].classList.add('hidden')
			}
		}
	}
}
