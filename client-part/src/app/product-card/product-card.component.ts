import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Subscription, Observable } from 'rxjs'

import { IProduct } from '../interfaces/product.interface'
import { IProductColor } from '../interfaces/productColor.interface'
import { productSelector } from '../store/products/products.selector'
import { addOrderItemAction } from '../store/orders/order-item.action'
import { orderItemSelector } from '../store/orders/order-item.selector'
import { OrderItem } from '../interfaces/orderItem.interface'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

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

	public get productPropsControl(): FormControl {
		return this.productCardForm.controls['properties'] as FormControl
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
	private amountOfOrdersSub: Subscription

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
		this.productColor = {
			id: 'new element',
			value: '',
			frontSmallUrl: '',
			bottomSmallUrl: '',
			rightSmallUrl: '',
			leftSmallUrl: '',
		}
	}

	ngAfterContentInit(): void {
		this.printCount = this.product.print.length
		// this.productColor = this.productColorsControl.value[0]
	}

	ngAfterViewInit() {}

	ngOnDestroy(): void {
		if (this.changeImageOnScrollSub) this.changeImageOnScrollSub.unsubscribe()

		if (this.changeImageOnClickSub) this.changeImageOnClickSub.unsubscribe()
		if (this.amountOfOrdersSub) this.amountOfOrdersSub.unsubscribe()
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

	public onColorChanged(value: number) {
		setTimeout(() => {
			this.productColor = this.productColorsControl.value[value] as IProductColor
		}, 0)
	}

	public quantityChanged(count: number) {
		this.productAmount = count
	}

	private initProductCardForm() {
		this.productCardForm = this.fb.group({
			id: [{ value: '', disabled: false }],
			name: [{ value: '', disabled: false }, Validators.required],
			code: [{ value: '', disabled: false }, Validators.required],
			description: [{ value: '', disabled: false }],
			colors: [{ value: '', disabled: false }],
			prints: [{ value: '', disabled: false }],
			properties: [{ value: '', disables: false }],
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
			properties: this.product.productProps,
		})
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
		this.amountOfOrdersSub = this.ordersItem$.subscribe((o) => (this.cartIconDotActive = o.length > 0))
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
}
