import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { OrderItem } from '../interfaces/orderItem.interface'

import { IProduct } from '../interfaces/product.interface'
import { ProductsService } from '../services/products.service'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
	selector: 'app-position-item-info',
	templateUrl: './position-item-info.component.html',
	styleUrls: ['./position-item-info.component.css'],
})
export class PositionItemInfoComponent implements OnInit, AfterViewInit {
	@Input() item: OrderItem
	@Input() itemLength: number
	@Input() index: number
	@Output() onRemoveItem: EventEmitter<number> = new EventEmitter()

	public product: IProduct
	public editable: boolean = false
	public form: FormGroup

	constructor(private productsService: ProductsService) {}
	ngOnInit(): void {
		this.initForm()
	}
	ngAfterViewInit(): void {}

	onSubmit(value) {
		console.log(value)
		this.disableFormControls()
	}

	edit(): void {
		this.productsService.getByVendor(this.item.vendorCode).subscribe((p) => {
			this.product = p
			this.enableFormsControls()
		})
	}

	printChanged(event: any) {
		this.form.get('print').setValue(event.target.value)
	}

	statusChanged(event: any) {
		this.form.get('status').setValue(event.target.value)
	}

	colorChanged(event: any) {
		console.log('color changed')
	}

	cancel(): void {
		this.disableFormControls()
	}

	removePosition(id: number) {
		this.onRemoveItem.emit(id)
		this.disableFormControls()
	}

	private initForm() {
		this.form = new FormGroup({
			color: new FormControl({ value: this.item.color, disabled: true }),
			name: new FormControl({ value: this.item.name, disabled: false }),
			vendor: new FormControl({ value: this.item.vendorCode, disabled: false }),
			print: new FormControl({ value: this.item.printType, disabled: true }),
			status: new FormControl({ value: this.item.status, disabled: true }),
			comment: new FormControl({ value: this.item.comment, disabled: true }),
			amount: new FormControl({ value: this.item.amount, disabled: true }),
		})
	}

	private enableFormsControls() {
		this.editable = true
		this.form.get('color').enable()
		this.form.get('print').enable()
		this.form.get('status').enable()
		this.form.get('comment').enable()
		this.form.get('amount').enable()
	}

	private disableFormControls() {
		this.editable = false
		this.form.get('color').disable()
		this.form.get('print').disable()
		this.form.get('status').disable()
		this.form.get('comment').disable()
		this.form.get('amount').disable()
	}
}
