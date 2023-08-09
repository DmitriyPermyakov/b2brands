import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild,
} from '@angular/core'

@Component({
	selector: 'app-quantity',
	templateUrl: './quantity.component.html',
	styleUrls: ['./quantity.component.css'],
})
export class QuantityComponent implements OnInit {
	@Input() inputQuantity!: number
	@Input() editable: boolean = false
	@Output() public onQuantityChanged: EventEmitter<number> = new EventEmitter<number>()
	public quantity!: number
	public quantityString: string
	private pattern = /^[0-9]+$/
	private currentValue: number

	ngOnInit() {
		if (!this.inputQuantity) {
			this.quantity = 1
			this.quantityString = this.quantity + 'шт.'
		} else {
			this.quantity = this.inputQuantity
			this.quantityString = this.quantity + 'шт.'
		}
		this.currentValue = this.quantity
	}

	increase() {
		if (this.quantity >= 99999) return

		this.quantity++

		this.onQuantityChanged.emit(this.quantity)
		this.quantityString = this.quantity + 'шт.'
	}

	decrease() {
		if (this.quantity > 1) {
			this.quantity--
			this.onQuantityChanged.emit(this.quantity)
			this.quantityString = this.quantity + 'шт.'
		}
		return
	}

	onFocus(event: any): void {
		event.target.value = event.target.value.slice(0, event.target.value.length - 3)
	}
	onBlur(event: any): void {
		if (event.target.value == '') {
			event.target.value = this.inputQuantity + 'шт.'
		} else {
			event.target.value = event.target.value + 'шт.'
		}
		this.quantity = event.target.value.slice(0, event.target.value.length - 3)
		this.onQuantityChanged.emit(this.quantity)
	}
	onInput(event: any): void {
		if (event.target.value.length > 5) event.target.value = this.currentValue

		if (!this.pattern.test(event.target.value)) {
			event.target.value = event.target.value.replace(/[^0-9]/, '')
		}

		this.currentValue = parseInt(event.target.value)
		this.quantity = parseInt(event.target.value)
	}
}
