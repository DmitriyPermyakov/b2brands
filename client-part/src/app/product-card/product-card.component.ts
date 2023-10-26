import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Subscription, Observable, every } from 'rxjs'

import { IProduct } from '../interfaces/product.interface'
import { IProductColor } from '../interfaces/productColor.interface'
import { productSelector } from '../store/products/products.selector'
import { addOrderItemAction } from '../store/orders/order-item.action'
import { orderItemSelector } from '../store/orders/order-item.selector'
import { OrderItem } from '../interfaces/orderItem.interface'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { IsMobileService } from '../services/is-mobile.service'

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
	@ViewChild('prints') printsRef!: ElementRef
	@ViewChild('prevBtn') prevColorBtnRef!: ElementRef
	@ViewChild('nextBtn') nextColorBtnRef!: ElementRef
	@ViewChild('descriptionBtn') descriptionBtn: ElementRef
	@ViewChild('description') descriptionPanel: ElementRef

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

	public isEdit: boolean = false
	public isAdding: boolean = false
	public isMobile: boolean = false

	public cartIconDotActive: boolean = false

	public product!: IProduct
	public productColor!: IProductColor

	public prints!: string[]

	private _selectedPrint: string
	private activeMobilePanel: HTMLElement
	private activeMobileButton: HTMLElement

	private printCount: number = 0
	private productAmount: number = 1

	private ordersItem$: Observable<ReadonlyArray<OrderItem>>

	private changeImageOnScrollSub!: Subscription
	private changeImageOnClickSub!: Subscription
	private amountOfOrdersSub: Subscription

	constructor(
		private activatedRoute: ActivatedRoute,
		private store: Store,
		private fb: FormBuilder,
		private mobileService: IsMobileService,
		public authService: AuthService
	) {
		this.isMobile = this.mobileService.isMobile
	}

	ngOnInit(): void {
		this.initProductCardForm()
		// let id = this.activatedRoute.snapshot.paramMap.get('id')
		let id = this.activatedRoute.snapshot.params['id']

		if (id === 'new') {
			this.isAdding = true
			this.isEdit = true
			this.enableFormControls()
			return
		}

		this.store.pipe(select(productSelector)).subscribe((p) => {
			let product = p.find((el) => el.id == id)

			if (product !== undefined) this.product = product
			else this.product = null
		})

		// this.checkLocalStorageOnCurrentProduct()

		this.setProductCardFormValues()
		this.ordersItem$ = this.store.pipe(select(orderItemSelector))
		this.checkAmoutOfOrderItems()
	}

	ngAfterContentInit(): void {
		// this.printCount = this.product.print.length
		console.log('product color control length ', this.productColorsControl.value.length)
	}

	ngAfterViewInit() {
		if (this.isMobile) {
			this.activeMobileButton = this.descriptionBtn.nativeElement
			this.activeMobilePanel = this.descriptionPanel.nativeElement
		}

		console.log('print ref', this.printsRef)
	}

	ngOnDestroy(): void {
		if (this.changeImageOnScrollSub) this.changeImageOnScrollSub.unsubscribe()

		if (this.changeImageOnClickSub) this.changeImageOnClickSub.unsubscribe()
		if (this.amountOfOrdersSub) this.amountOfOrdersSub.unsubscribe()
	}

	public addToCart() {
		let orderItem: OrderItem = {
			id: Math.random().toString(16),
			name: this.product.name,
			vendorCode: this.product.code,
			color: this.productColor,
			printType: this._selectedPrint,
			price: this.product.newPrice,
			amount: this.productCardForm.get('amount').value,
			status: 'В заказе',
			comment:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero itaque, ullam tenetur consequatur perspiciatis reiciendis in officia maiores? Adipisci facilis animi architecto voluptatum sapiente, dicta molestias delectus possimus nulla voluptas!',
		}
		console.log('order', orderItem)

		this.store.dispatch(addOrderItemAction({ orderItem }))
		this.checkAmoutOfOrderItems()
	}

	public onColorChanged(event: IProductColor) {
		// setTimeout(() => {
		// 	this.productColor = this.productColorsControl.value[value] as IProductColor
		// 	console.log('product color', this.productColor)
		// }, 0)
		this.productColor = event
	}

	public quantityChanged(count: number) {
		this.productAmount = count
	}

	public edit() {
		this.isEdit = true
		this.enableFormControls()
	}

	public cancelEdit() {
		this.isEdit = false
		this.disableFormControls()
	}

	public changeMobileActivePanel(event: Event, element: HTMLElement) {
		this.activeMobileButton?.classList.remove('active')
		this.activeMobilePanel?.classList.remove('active-panel')

		this.activeMobileButton = event.target as HTMLElement
		this.activeMobileButton.classList.add('active')

		this.activeMobilePanel = element
		this.activeMobilePanel.classList.add('active-panel')
	}

	public setSelectedPrint(event) {
		this._selectedPrint = event
	}

	private enableFormControls() {
		Object.keys(this.productCardForm.controls).forEach((c) => this.productCardForm.get(c)?.enable())
	}

	private disableFormControls() {
		Object.keys(this.productCardForm.controls).forEach((c) => this.productCardForm.get(c)?.disable())
	}

	private initProductCardForm() {
		this.productColor = {
			id: 'new element',
			value: '',
			frontSmallUrl: '',
			bottomSmallUrl: '',
			rightSmallUrl: '',
			leftSmallUrl: '',
		}

		this.productCardForm = this.fb.group({
			id: [{ value: '', disabled: false }],
			name: [{ value: '', disabled: !this.isEdit }, Validators.required],
			code: [{ value: '', disabled: !this.isEdit }, Validators.required],
			newPrice: [{ value: '', disabled: !this.isEdit }],
			oldPrice: [{ value: '', disabled: !this.isEdit }],
			description: [{ value: '', disabled: !this.isEdit }],
			colors: [{ value: '', disabled: false }],
			amount: [{ value: '', disabled: false }],
			prints: '',
			properties: '',
		})
	}

	private setProductCardFormValues() {
		this.productCardForm.patchValue({
			id: this.product.id,
			name: this.product.name,
			code: this.product.code,
			newPrice: this.product.newPrice,
			oldPrice: this.product.oldPrice,
			description: this.product.description,
			colors: this.product.productColors,
			amount: 5,
			prints: this.product.print,
			properties: this.product.productProps,
		})
	}

	private checkLocalStorageOnCurrentProduct() {
		if (this.product === null) {
			this.product = JSON.parse(localStorage.getItem('currentProduct'))
			console.log('product from local storage', this.product)
		} else {
			localStorage.setItem('currentProduct', JSON.stringify(this.product))
		}
	}

	private checkAmoutOfOrderItems() {
		this.amountOfOrdersSub = this.ordersItem$.subscribe((o) => (this.cartIconDotActive = o.length > 0))
	}
}
