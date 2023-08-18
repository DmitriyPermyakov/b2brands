import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { ClientOrder } from '../interfaces/clientOrder.interface'
import { IProduct } from '../interfaces/product.interface'
import { OrderItem } from '../interfaces/orderItem.interface'
import { FormArray, FormBuilder, FormControl, FormGroup, isFormArray } from '@angular/forms'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-edit-order',
	templateUrl: './edit-order.component.html',
	styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {
	public isSelectProductVisible: boolean = false
	public editable: boolean = false
	public order: ClientOrder
	public form: FormGroup
	public count: number = 0
	public totalPrice: number = 0

	public get orderItems(): FormArray {
		return this.form.controls['orderItems'] as FormArray
	}

	private formArrayChangeSubscription: Subscription

	constructor(private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.order = JSON.parse(localStorage.getItem('client-order')) as ClientOrder
		this.initForm()
	}
	edit(): void {
		this.editable = true
		this.enableForm()
	}

	showProductModal(): void {
		this.isSelectProductVisible = true
	}
	closeProductModal(value: boolean): void {
		this.isSelectProductVisible = value
	}

	addItem(p: IProduct): void {
		this.isSelectProductVisible = false
		let orderItem: FormGroup = this.fb.group({
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
	}

	cancel(): void {
		this.editable = false
		this.disableForm()
	}

	onSubmit(form): void {
		// #TODO: в позиции нужно вычислять стоимость
		console.log(this.form.getRawValue())
	}

	private initForm(): void {
		this.form = this.fb.group({
			phone: [{ value: this.order.contacts.phone, disabled: true }],
			name: [{ value: this.order.contacts.name, disabled: true }],
			email: [{ value: this.order.contacts.email, disabled: true }],
			dateOfCreation: [{ value: this.getDate(this.order.dateOfCreation), disabled: true }],
			dateOfCompletion: [{ value: this.getDate(this.order.dateOfCompletion), disabled: true }],
			status: [{ value: this.order.status, disabled: true }],
			comment: [{ value: this.order.comment, disabled: true }],
			orderItems: this.order.orderItems,
		})

		this.loadOrderItems(this.order.orderItems, this.form)

		this.formArrayChangeSubscription = this.form.controls['orderItems'].valueChanges.subscribe(() => {
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
				this.fb.group({
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

	private enableForm(): void {
		Object.keys(this.form.controls).forEach((c) => {
			if (!isFormArray(this.form.get(c))) this.form.get(c).enable()
		})
	}
	private disableForm(): void {
		Object.keys(this.form.controls).forEach((c) => this.form.get(c).disable())
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
}
