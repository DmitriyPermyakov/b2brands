import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { fromEvent, debounceTime, Subscription, Observable } from 'rxjs'
import { switchMap } from 'rxjs'

import { IProduct } from '../interfaces/product.interface'
import { IProductColor } from '../interfaces/productColor.interface'
import { productSelector } from '../store/products/products.selector'
import { addOrderItemAction } from '../store/orders/order-item.action'
import { orderItemSelector } from '../store/orders/order-item.selector'
import { OrderItem } from '../interfaces/orderItem.interface'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
	@ViewChild('prints') printsRef!: ElementRef
	@ViewChild('prevBtn') prevColorBtnRef!: ElementRef
	@ViewChild('nextBtn') nextColorBtnRef!: ElementRef

	public productCardForm: FormGroup

	public get productPropsArray(): FormArray {
		return this.productCardForm.controls['properties'] as FormArray
	}

	public get productColorsControl(): FormControl {
		return this.productCardForm.controls['colors'] as FormControl
	}

	public get productPrintsControl(): FormControl {
		return this.productCardForm.controls['prints'] as FormControl
	}

	public isAuthenticated: true
	public cartIconDotActive: boolean = false

	public product!: IProduct
	public productColor!: IProductColor

	public prints!: string[]

	private selectedPrintIndex: number = 0

	private printCount: number = 0
	private productAmount: number = 1

	private ordersItem$: Observable<ReadonlyArray<OrderItem>>

	private changeImageOnScrollSub!: Subscription
	private changeImageOnClickSub!: Subscription

	constructor(private activatedRoute: ActivatedRoute, private store: Store, private fb: FormBuilder) {
		this.initProductCardForm()
	}

	ngOnInit(): void {
		let id = this.activatedRoute.snapshot.paramMap.get('id')
		this.store.pipe(select(productSelector)).subscribe((p) => {
			let product = p.find((el) => el.id == id)

			if (product !== undefined) this.product = product
			else this.product = null
		})

		this.checkLocalStorageOnCurrentProduct()

		this.setProductCardFormValues()
		this.ordersItem$ = this.store.pipe(select(orderItemSelector))
		this.checkAmoutOfOrderItems()
	}

	ngAfterContentInit(): void {
		this.printCount = this.product.print.length

		// this.selectedPrintIndex = this.initSelectedIndex(this.printCount)

		// this.productColor = this.product.productColors[this.selectedColorIndex]
	}

	ngAfterViewInit() {
		// this.initPrintStartClasses(this.printsRef, this.selectedPrintIndex)
		// this.setColorValueAttribute(this.colorsRef)
		// this.changeImageOnScroll()
		// this.changeImageOnClick(this.prevColorBtnRef)
		// this.changeImageOnClick(this.nextColorBtnRef)
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
			comment:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero itaque, ullam tenetur consequatur perspiciatis reiciendis in officia maiores? Adipisci facilis animi architecto voluptatum sapiente, dicta molestias delectus possimus nulla voluptas!',
		}

		this.store.dispatch(addOrderItemAction({ orderItem }))
		this.checkAmoutOfOrderItems()
	}

	// public onScrollPrints(event: WheelEvent) {
	// 	this.onScroll(event, this.printsRef, this.selectedPrintIndex)
	// }

	public quantityChanged(count: number) {
		this.productAmount = count
	}

	private initProductCardForm() {
		this.productCardForm = this.fb.group({
			id: [{ value: '', disabled: true }],
			name: [{ value: '', disabled: true }, Validators.required],
			code: [{ value: '', disabled: true }, Validators.required],
			description: [{ value: '', disabled: true }],
			colors: [{ value: '', disabled: false }],
			prints: [{ value: '', disabled: false }],
			properties: this.fb.array([]),
		})
	}

	private setProductCardFormValues() {
		this.productCardForm.patchValue({
			id: this.product.id,
			name: this.product.name,
			code: this.product.code,
			description: this.product.description,
			colors: this.product.productColors,
			prints: this.product.print,
		})
		this.setProductProps()
	}

	private setProductProps() {
		this.product.productProps.forEach((p) =>
			this.productPropsArray.push(
				new FormGroup({
					id: new FormControl({ value: p.id, disabled: true }),
					name: new FormControl({ value: p.name, disabled: false }),
					value: new FormControl({ value: p.value, disabled: false }),
				})
			)
		)
	}

	private checkLocalStorageOnCurrentProduct() {
		if (this.product === null) {
			this.product = JSON.parse(localStorage.getItem('currentProduct'))
			console.log(this.product)
		} else {
			localStorage.setItem('currentProduct', JSON.stringify(this.product))
		}
	}

	private checkAmoutOfOrderItems() {
		this.ordersItem$.subscribe((o) => (this.cartIconDotActive = o.length > 0))
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

	//#region change image

	// private changeImageOnScroll() {
	// 	let changeImage = fromEvent(this.colorsRef.nativeElement, 'wheel').pipe(
	// 		debounceTime(1000),
	// 		switchMap(() => this.setImage(this.colorsRef))
	// 	)

	// 	this.changeImageOnScrollSub = changeImage.subscribe((color) => (this.productColor = color))
	// }

	// private changeImageOnClick(buttonRef: ElementRef) {
	// 	let changeImage = fromEvent(buttonRef.nativeElement, 'click').pipe(
	// 		debounceTime(1000),
	// 		switchMap(() => this.setImage(this.colorsRef))
	// 	)

	// 	this.changeImageOnClickSub = changeImage.subscribe((color) => (this.productColor = color))
	// }

	//#endregion

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
}
