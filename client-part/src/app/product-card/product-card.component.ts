import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Subscription, Observable, every, mergeMap, tap, map, of, switchMap, concatMap, catchError } from 'rxjs'

import { IProduct } from '../interfaces/product.interface'
import { IProductColor } from '../interfaces/productColor.interface'
import { OrderItem } from '../interfaces/orderItem.interface'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { IsMobileService } from '../services/is-mobile.service'
import { productExists, selectProductById } from '../store/selectors/products.selectors'
import { ProductsService } from '../services/products.service'
import * as ProductActions from '../store/actions/products.actions'
import * as OrderItemActions from '../store/actions/order-items.actions'
import * as OrderItemsSelectors from '../store/selectors/order-items.selectors'

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

	// public cartIconDotActive: boolean
	public cartIconDotActive$: Observable<boolean>

	public product!: IProduct
	public productColor!: IProductColor

	public prints!: string[]
	public link: string

	private id: string
	private _selectedPrint: string
	private activeMobilePanel: HTMLElement
	private activeMobileButton: HTMLElement

	private printCount: number = 0
	private productAmount: number = 1

	private isProductInStore$: Observable<boolean>
	private product$: Observable<IProduct>

	private productSub: Subscription
	private changeImageOnScrollSub!: Subscription
	private changeImageOnClickSub!: Subscription
	private amountOfOrdersSub: Subscription

	constructor(
		public authService: AuthService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private store: Store,
		private fb: FormBuilder,
		private mobileService: IsMobileService
	) {
		this.isMobile = this.mobileService.isMobile
	}

	ngOnInit(): void {
		this.initProductCardForm()
		this.link = this.authService.IsAuthenticated ? '/admin/products' : '/products'
		this.id = this.activatedRoute.snapshot.params['id']

		if (this.id === 'create') {
			this.isAdding = true
			this.isEdit = true
			this.enableFormControls()
			return
		}

		this.isProductInStore$ = this.store.pipe(select(productExists(this.id)))

		this.product$ = this.isProductInStore$.pipe(
			mergeMap((isProductInStore) => {
				if (!isProductInStore) {
					this.store.dispatch(ProductActions.loadProductById({ id: this.id }))
				}

				return this.store.pipe(select(selectProductById(this.id)))
			})
		)

		this.productSub = this.product$.subscribe((p) => {
			this.product = p
		})

		this.productSub.unsubscribe()

		this.setProductCardFormValues()

		this.store.dispatch(OrderItemActions.loadOrderItemsFromLocalStorage())

		this.cartIconDotActive$ = this.store.pipe(
			select(OrderItemsSelectors.orderItemsCount),
			map((count) => count > 0)
		)

		// this.amountOfOrdersSub = this.cartIconDotActive$.subscribe((hasItems) => (this.cartIconDotActive = hasItems))

		// this.checkAmoutOfOrderItems()
	}

	ngAfterContentInit(): void {}

	ngAfterViewInit() {
		if (this.isMobile) {
			this.activeMobileButton = this.descriptionBtn.nativeElement
			this.activeMobilePanel = this.descriptionPanel.nativeElement
		}
	}

	ngOnDestroy(): void {
		if (this.changeImageOnScrollSub) this.changeImageOnScrollSub.unsubscribe()

		if (this.changeImageOnClickSub) this.changeImageOnClickSub.unsubscribe()
		if (this.amountOfOrdersSub) this.amountOfOrdersSub.unsubscribe()
		if (this.productSub) this.productSub.unsubscribe()
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

		this.store.dispatch(OrderItemActions.createOrderItem({ orderItem: orderItem }))
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

	public addProduct() {
		let product: IProduct = this.setProductFromCard()
		this.store.dispatch(ProductActions.createProduct({ product: product }))
		this.router.navigate(['/admin/products'])
	}

	public updateProduct() {
		let product: IProduct = this.setProductFromCard()
		product.id = this.id

		this.store.dispatch(ProductActions.upsertProduct({ product: product }))
		this.router.navigate(['/admin/products'])
	}

	public removeProduct() {
		this.store.dispatch(ProductActions.deleteProduct({ id: this.id }))
		this.router.navigate(['/admin/products'])
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

	private setProductFromCard(): IProduct {
		return {
			// id: this.productCardForm.get('id').value,
			id: '0',
			name: this.productCardForm.get('name').value,
			code: this.productCardForm.get('code').value,
			description: this.productCardForm.get('description').value,
			newPrice: this.productCardForm.get('newPrice').value,
			oldPrice: this.productCardForm.get('oldPrice').value,
			print: this.productCardForm.get('prints').value,
			productColors: this.productCardForm.get('colors').value,
			productProps: this.productCardForm.get('properties').value,
		}
	}
}
