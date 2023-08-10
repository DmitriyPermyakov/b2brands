import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { OrderItem } from '../interfaces/orderItem.interface'

import { IProduct } from '../interfaces/product.interface'
import { ProductsService } from '../services/products.service'

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

	constructor(private productsService: ProductsService) {}
	ngOnInit(): void {}
	ngAfterViewInit(): void {}

	edit(): void {
		this.editable = true
		this.productsService.getByVendor(this.item.vendorCode).subscribe((p) => {
			this.product = p
		})
	}

	printChanged(event: any) {
		this.item.printType = event.target.value
	}

	cancel(): void {
		this.resetValues()
	}

	removePosition(id: number) {
		this.onRemoveItem.emit(id)
		this.cancelEdit()
	}

	private resetValues() {
		this.cancelEdit()
	}

	private cancelEdit() {
		this.editable = false
	}
}
