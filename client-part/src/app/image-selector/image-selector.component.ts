import { Component, ElementRef, Input, ViewChild, forwardRef } from '@angular/core'
import { IProduct } from '../interfaces/product.interface'
import { IProductColor } from '../interfaces/productColor.interface'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
	selector: 'app-image-selector',
	templateUrl: './image-selector.component.html',
	styleUrls: ['./image-selector.component.css'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ImageSelectorComponent),
			multi: true,
		},
	],
})
export class ImageSelectorComponent implements ControlValueAccessor {
	@Input() product: IProduct
	@Input() disabled: boolean = true

	@ViewChild('container') scrollContainer: ElementRef
	@ViewChild('itemImage') itemImage: ElementRef

	public showImage: boolean = false

	private _value: IProductColor
	private onChange(color: IProductColor) {
		if (color) console.log(color)
		else console.log('color is null')
	}

	get value() {
		return this._value
	}

	@Input()
	set value(val) {
		this._value = val
		this.onChange(this._value)
	}

	writeValue(color: IProductColor): void {
		this.value = color
	}
	registerOnChange(fn: any): void {
		this.onChange = fn
	}
	registerOnTouched(fn: any): void {
		this.onChange = fn
	}
	// setDisabledState?(isDisabled: boolean): void {
	// 	console.log('set disable state')
	// }

	showImages(): void {
		if (!this.disabled) this.showImage = true
	}

	setImage(color: IProductColor): void {
		this.value = color
		this.showImage = false
	}

	scroll(event: WheelEvent): void {
		event.preventDefault()
		this.scrollContainer.nativeElement.scrollLeft += event.deltaY
	}
}
