import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { ClientOrder } from '../interfaces/clientOrder.interface'
import { IProduct } from '../interfaces/product.interface'
import { OrderItem } from '../interfaces/orderItem.interface'
import { FormArray, FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { Observable, Subscription, mergeMap } from 'rxjs'
import { IsMobileService } from '../services/is-mobile.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import * as OrderAction from '../store/actions/orders.actions'
import * as OrdersSelectors from '../store/selectors/orders.selectors'

@Component({
	selector: 'app-edit-order',
	templateUrl: './edit-order.component.html',
	styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit, OnDestroy {
	public isSelectProductVisible: boolean = false
	public editable: boolean = false
	public order: ClientOrder
	public form: FormGroup
	public count: number = 0
	public totalPrice: number = 0
	public isMobile: boolean = false

	public get orderItems(): FormArray {
		return this.form.controls['orderItems'] as FormArray
	}

	private createMode: boolean = false
	private id: string

	private orderExistsInStore$: Observable<boolean>
	private order$: Observable<ClientOrder>

	private formArrayChangeSub: Subscription
	private orderSub: Subscription

	constructor(
		private fb: FormBuilder,
		private changeDetectorRef: ChangeDetectorRef,
		private mobileService: IsMobileService,
		private activatedRoute: ActivatedRoute,
		private nnfb: NonNullableFormBuilder,
		private store: Store,
		private router: Router
	) {
		this.isMobile = this.mobileService.isMobile
	}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.paramMap.get('id')

		this.createMode = this.id === 'create' ? (this.createMode = true) : (this.createMode = false)

		console.log('is create mode ', this.createMode)

		if (this.createMode) {
			this.createEmptyForm()
			this.enableFormsControls()
			return
		}
		// this.order = JSON.parse(localStorage.getItem('client-order')) as ClientOrder

		this.orderExistsInStore$ = this.store.pipe(select(OrdersSelectors.orderExists(this.id)))

		this.order$ = this.orderExistsInStore$.pipe(
			mergeMap((isOrderInStore) => {
				if (!isOrderInStore) {
					this.store.dispatch(OrderAction.loadOrderById({ id: this.id }))
				}

				return this.store.pipe(select(OrdersSelectors.selectOrderById(this.id)))
			})
		)

		this.orderSub = this.order$.subscribe((o) => (this.order = o))

		this.initForm()
		this.disableFormControls()
	}

	ngOnDestroy(): void {
		if (this.formArrayChangeSub) this.formArrayChangeSub.unsubscribe()
		if (this.orderSub) this.orderSub.unsubscribe()
	}

	edit(): void {
		this.enableFormsControls()
	}

	showProductModal(): void {
		this.isSelectProductVisible = true
	}
	closeProductModal(value: boolean): void {
		this.isSelectProductVisible = value
	}

	addItem(p: IProduct): void {
		this.isSelectProductVisible = false
		let orderItem: FormGroup = this.nnfb.group({
			id: '234234',
			name: [{ value: p.name, disabled: true }],
			vendor: [{ value: p.code, disabled: true }],
			color: [{ value: p.productColors[0], disabled: true }],
			print: [{ value: p.print[0], disabled: true }],
			amount: [{ value: 1, disabled: true }],
			price: [{ value: p.newPrice, disabled: true }],
			status: [{ value: 'В заказе', disabled: true }],
			comment: [
				{
					value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem voluptas, architecto porro magnam inventore cum laboriosam optio beatae distinctio, quisquam eum earum ducimus doloremque saepe nostrum. Possimus molestias delectus provident.',
					disabled: true,
				},
			],
		})
		this.orderItems.push(orderItem)
	}

	removeItem(index: number): void {
		this.orderItems.removeAt(index)

		let order = this.form.getRawValue()
		order = { ...order, id: this.order.id }
		// this.store.dispatch(OrderAction.upsertOrder({ order: order }))
	}

	cancel(): void {
		if (this.createMode) {
			this.form.reset()
			this.orderItems.clear()
		} else {
			this.form.reset()
		}

		this.disableFormControls()
	}

	onSubmit(): void {
		this.disableFormControls()

		let order = this.form.getRawValue()
		if (this.createMode) {
			order = { ...order, id: '0' }
			this.store.dispatch(OrderAction.createOrder({ order: order }))
		} else {
			order = { ...order, id: this.order.id }
			this.store.dispatch(OrderAction.upsertOrder({ order: order }))
		}
	}

	public removeOrder() {
		console.log('remove order')
		this.store.dispatch(OrderAction.deleteOrder({ id: this.id }))
		this.router.navigate(['/admin/active-orders/'])
	}

	private createEmptyForm(): void {
		this.form = this.fb.group({
			phone: [{ value: '', disabled: false }],
			name: [{ value: '', disabled: false }],
			email: [{ value: '', disabled: false }],
			dateOfCreation: [{ value: this.getDate(new Date()), disabled: false }],
			dateOfCompletion: [{ value: this.getDate(new Date()), disabled: false }],
			status: [{ value: '', disabled: false }],
			comment: [{ value: '', disabled: false }],
			orderItems: this.fb.array([]),
		})

		this.setSubscriptions()
	}

	private initForm(): void {
		this.form = this.nnfb.group({
			phone: [{ value: this.order.contacts.phone, disabled: true }],
			name: [{ value: this.order.contacts.name, disabled: true }],
			email: [{ value: this.order.contacts.email, disabled: true }],
			dateOfCreation: [{ value: this.getDate(this.order.dateOfCreation), disabled: true }],
			dateOfCompletion: [{ value: this.getDate(this.order.dateOfCompletion), disabled: true }],
			status: [{ value: this.order.status, disabled: true }],
			comment: [{ value: this.order.comment, disabled: true }],
			orderItems: this.fb.array([]),
		})
		this.loadOrderItems(this.order.orderItems, this.form)
		this.setSubscriptions()
	}

	private setSubscriptions(): void {
		this.formArrayChangeSub = this.form.controls['orderItems'].valueChanges.subscribe(() => {
			this.changeDetectorRef.detectChanges()

			this.count = this.orderItems.controls.reduce((acc, controls) => {
				return acc + controls.get('amount').value
			}, 0)

			this.totalPrice = this.orderItems.controls.reduce((acc, controls) => {
				return acc + controls.get('price').value * controls.get('amount').value
			}, 0)
		})
	}

	private loadOrderItems(items: OrderItem[], form: FormGroup) {
		items.forEach((i) =>
			(form.get('orderItems') as FormArray).push(
				this.nnfb.group({
					id: i.id,
					color: i.color,
					name: i.name,
					vendor: i.vendorCode,
					print: i.printType,
					status: i.status,
					comment: i.comment,
					amount: i.amount,
					price: i.price,
				})
			)
		)
	}

	private getDate(inputDate: Date): string {
		let date = new Date(inputDate)
		let dateString = date.getUTCFullYear() + '-' + this.fixMonthFormat(date.getMonth() + 1) + '-' + date.getUTCDate()
		return dateString
	}

	private fixMonthFormat(month: number): string {
		if (month < 10) return '0' + month
		return month.toString()
	}

	private enableFormsControls() {
		Object.keys(this.form.controls).forEach((c) => {
			if (c !== 'orderItems') this.form.controls[c].enable()
		})
		this.editable = true
	}

	private disableFormControls() {
		Object.keys(this.form.controls).forEach((c) => {
			if (c !== 'orderItems') this.form.controls[c].disable()
		})
		this.editable = false
	}
}
