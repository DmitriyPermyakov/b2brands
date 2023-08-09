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
	@ViewChild('container') scrollContainer: ElementRef
	@ViewChild('itemImage') itemImage: ElementRef

	public product: IProduct
	public editable: boolean = false
	public showImage: boolean = false

	private initialItem: OrderItem = new OrderItem()

	constructor(private productsService: ProductsService) {}
	ngOnInit(): void {}
	ngAfterViewInit(): void {
		this.initialItem = Object.assign(this.initialItem, this.item)
		console.log(this.initialItem)
	}

	edit(): void {
		this.editable = true
		this.productsService.getByVendor(this.item.vendorCode).subscribe((p) => {
			this.product = p
		})
	}

	showImages(): void {
		if (this.editable) this.showImage = true
	}

	setImage(event: Event): void {
		let colorValue = (event.target as HTMLElement).getAttribute('alt')
		let color = this.product.productColors.find((p) => p.value === colorValue)
		;(this.itemImage.nativeElement as HTMLElement).setAttribute('src', color.rightSmallUrl)
		this.showImage = false
	}

	cancel(): void {
		this.resetValues()
		console.log('asfas', this.item)
	}

	scroll(event: WheelEvent): void {
		event.preventDefault()
		this.scrollContainer.nativeElement.scrollLeft += event.deltaY
	}

	removePosition(id: number) {
		this.onRemoveItem.emit(id)
		this.cancelEdit()
	}

	private resetValues() {
		this.item = Object.assign(this.item, this.initialItem)
		this.cancelEdit()
	}

	private cancelEdit() {
		this.editable = false
		this.showImage = false
	}
}
