import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
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
	@ViewChild('container') scrollContainer: ElementRef
	@ViewChild('itemImage') itemImage: ElementRef

	public product: IProduct
	public editable: boolean = false
	public showImage: boolean = false

	constructor(private productsService: ProductsService) {}
	ngOnInit(): void {}
	ngAfterViewInit(): void {}

	edit(): void {
		this.editable = true
		this.productsService.getByVendor(this.item.vendorCode).subscribe((p) => {
			this.product = p
			console.log(this.product)
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
		this.editable = false
		this.showImage = false
	}

	scroll(event: WheelEvent): void {
		event.preventDefault()
		this.scrollContainer.nativeElement.scrollLeft += event.deltaY
	}
}
