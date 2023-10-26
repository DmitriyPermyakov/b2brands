import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { IProduct } from '../interfaces/product.interface'
import { ProductsService } from '../services/products.service'
import { Subscription } from 'rxjs'
import { IsMobileService } from '../services/is-mobile.service'

@Component({
	selector: 'app-position-item-info',
	templateUrl: './position-item-info.component.html',
	styleUrls: ['./position-item-info.component.css'],
})
export class PositionItemInfoComponent implements OnInit {
	@Input() item
	@Input() itemLength: number
	@Input() index: number
	@Output() onRemoveItem: EventEmitter<number> = new EventEmitter()

	public product: IProduct
	public editable: boolean = false
	public isMobile: boolean = false
	public initialForm: FormGroup
	public price: number
	private amountChangeSubscription: Subscription

	constructor(
		private mobileService: IsMobileService,
		private productsService: ProductsService,
		private changeDetectorRef: ChangeDetectorRef
	) {
		this.isMobile = this.mobileService.isMobile
	}
	ngOnInit(): void {
		this.disableFormControls()
		this.initialForm = this.initResetForm(this.item)
		this.price = this.item.controls['amount'].value * this.item.controls['price'].value
		this.item.controls['amount'].valueChanges.subscribe(() => {
			this.price = this.item.controls['amount'].value * this.item.controls['price'].value
		})
	}

	onSubmit(value) {
		this.disableFormControls()
	}

	edit(): void {
		this.productsService.getByVendor(this.item.get('vendor').value).subscribe((p) => {
			this.product = p
			this.enableFormsControls()
		})
	}

	printChanged(event: any) {
		this.item.get('print').setValue(event.target.value)
	}

	statusChanged(event: any) {
		this.item.get('status').setValue(event.target.value)
	}

	cancel(): void {
		this.resetForm()
		this.disableFormControls()
	}

	removePosition(id: number) {
		this.onRemoveItem.emit(id)
		this.disableFormControls()
	}

	private initResetForm(data: FormGroup): FormGroup {
		const form = new FormGroup({
			id: new FormControl(),
			color: new FormControl(),
			name: new FormControl(),
			vendor: new FormControl(),
			print: new FormControl(),
			status: new FormControl(),
			comment: new FormControl(),
			amount: new FormControl(),
			price: new FormControl(),
		})

		Object.keys(data.controls).forEach((c) => form.controls[c].setValue(data.controls[c].value))

		return form
	}

	private resetForm() {
		Object.keys(this.item.controls).forEach((c) => this.item.controls[c].setValue(this.initialForm.controls[c].value))
	}

	private enableFormsControls() {
		this.editable = true
		Object.keys(this.item.controls).forEach((c) => this.item.get(c).enable())
	}

	private disableFormControls() {
		this.editable = false
		Object.keys(this.item.controls).forEach((c) => this.item.get(c).disable())
	}
}
