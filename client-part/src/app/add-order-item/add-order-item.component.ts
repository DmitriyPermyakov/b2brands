import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { IProduct } from '../interfaces/product.interface'
import { Observable } from 'rxjs'
import { ProductsService } from '../services/products.service'

@Component({
	selector: 'app-add-order-item',
	templateUrl: './add-order-item.component.html',
	styleUrls: ['./add-order-item.component.css'],
})
export class AddOrderItemComponent implements OnInit {
	@Input('isSelectProductVisible') isVisible
	@Output() onSelectProduct: EventEmitter<IProduct> = new EventEmitter()
	@Output() onCloseProductModal: EventEmitter<boolean> = new EventEmitter()
	public products: IProduct[]

	constructor(private productService: ProductsService) {}

	ngOnInit(): void {
		this.productService.getAll().subscribe((p) => (this.products = p))
	}

	selectProduct(p: IProduct) {
		this.onSelectProduct.emit(p)
	}

	close() {
		this.onCloseProductModal.emit(false)
	}
}
