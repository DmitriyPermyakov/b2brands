import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'

import { IProduct } from '../interfaces/product.interface'
import { ProductsService } from '../services/products.service'
import { Subscription } from 'rxjs'
import { IsMobileService } from '../services/is-mobile.service'

@Component({
	selector: 'app-position-item-info',
	templateUrl: './position-item-info.component.html',
	styleUrls: ['./position-item-info.component.css'],
})
export class PositionItemInfoComponent implements OnInit, OnDestroy {
	@Input() item
	@Input() itemLength: number
	@Input() index: number
	@Output() onRemoveItem: EventEmitter<number> = new EventEmitter()
	@Output() onSubmitItem: EventEmitter<void> = new EventEmitter()

	public product: IProduct
	public editable: boolean = false
	public isMobile: boolean = false
	public price: number
	private amountChangeSubscription: Subscription
	private productServiceSub: Subscription

	constructor(private mobileService: IsMobileService, private productsService: ProductsService) {
		this.isMobile = this.mobileService.isMobile
	}
	ngOnInit(): void {
		this.price = this.item.controls['amount'].value * this.item.controls['price'].value
		this.amountChangeSubscription = this.item.controls['amount'].valueChanges.subscribe(() => {
			this.price = this.item.controls['amount'].value * this.item.controls['price'].value
		})

		this.disableFormControls()
	}

	ngOnDestroy(): void {
		if (this.amountChangeSubscription) this.amountChangeSubscription.unsubscribe()
		if (this.productServiceSub) this.productServiceSub.unsubscribe()
	}

	onSubmit() {
		this.onSubmitItem.emit()
		this.disableFormControls()
	}

	edit(): void {
		this.productServiceSub = this.productsService.getByVendor(this.item.get('vendor').value).subscribe((p) => {
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
		this.item.reset()
		this.disableFormControls()
	}

	removePosition(id: number) {
		this.onRemoveItem.emit(id)
	}

	private enableFormsControls() {
		Object.keys(this.item.controls).forEach((c) => this.item.controls[c].enable())
		this.editable = true
	}

	private disableFormControls() {
		this.editable = false
		Object.keys(this.item.controls).forEach((c) => this.item.controls[c].disable())
	}
}
