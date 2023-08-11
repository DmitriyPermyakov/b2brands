import { Component, ElementRef, Input, ViewChild, forwardRef } from '@angular/core'
import { IProduct } from '../interfaces/product.interface'
import { IProductColor } from '../interfaces/productColor.interface'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'

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
	// @Input() editable: boolean = true

	@ViewChild('container') scrollContainer: ElementRef
	@ViewChild('itemImage') itemImage: ElementRef

	public showImage: boolean = false
	public disabled: boolean = true

	public onChange = (color: IProductColor) => {}
	public onTouched = () => {}

	private _value: IProductColor
	private touched = false

	get value() {
		return this._value
	}

	@Input()
	set value(val) {
		this._value = val
	}

	writeValue(color: IProductColor): void {
		this.value = color
	}
	registerOnChange(fn: any): void {
		this.onChange = fn
	}
	registerOnTouched(fn: any): void {
		this.onTouched = fn
	}
	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled
	}

	showImages(): void {
		if (!this.disabled) this.showImage = true
	}

	setImage(color: IProductColor): void {
		this.markAsTouched()
		this.value = color
		this.showImage = false
		this.onChange(this.value)
	}

	scroll(event: WheelEvent): void {
		event.preventDefault()
		this.scrollContainer.nativeElement.scrollLeft += event.deltaY
	}

	private markAsTouched() {
		if (!this.touched) {
			this.onTouched()
			this.touched = true
		}
	}
}
