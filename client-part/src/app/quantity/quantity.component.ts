import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
	selector: 'app-quantity',
	templateUrl: './quantity.component.html',
	styleUrls: ['./quantity.component.css'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => QuantityComponent),
			multi: true,
		},
	],
})
export class QuantityComponent implements OnInit, ControlValueAccessor {
	public quantityString: string
	public disabled: boolean = true

	public onChanged = (value: number) => {}
	public onTouched = () => {}

	private touched = false

	private pattern = /^[0-9]+$/
	private currentValue: number
	private _value: number

	public get value(): number {
		return this._value
	}

	@Input()
	public set value(val: number) {
		if (val < 1) {
			this._value = 1
			this.quantityString = this._value + 'шт.'
			this.onChanged(this._value)
		} else {
			this._value = val
			this.quantityString = this._value + 'шт.'
			this.onChanged(this._value)
		}
		console.log(this._value)
	}

	ngOnInit() {
		console.log('value is ' + this.value)
		if (!this.value) {
			this.value = 1
		}
		this.currentValue = this.value
	}

	writeValue(value: any): void {
		this.value = value
	}
	registerOnChange(fn: any): void {
		this.onChanged = fn
	}
	registerOnTouched(fn: any): void {
		this.onTouched = fn
	}
	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled
	}

	increase() {
		this.markAsTouched()
		if (this.value >= 99999) return

		this.value++
	}

	decrease() {
		this.markAsTouched()
		if (this.value > 1) {
			this.value--
		}
		return
	}

	onFocus(event: any): void {
		this.markAsTouched()
		event.target.value = event.target.value.slice(0, event.target.value.length - 3)
	}
	onBlur(event: any): void {
		if (event.target.value == '') {
			event.target.value = this.value + 'шт.'
		} else {
			event.target.value = event.target.value + 'шт.'
		}
		this.value = event.target.value.slice(0, event.target.value.length - 3)
	}
	onInput(event: any): void {
		this.markAsTouched()
		if (event.target.value.length > 5) event.target.value = this.currentValue

		if (!this.pattern.test(event.target.value)) {
			event.target.value = event.target.value.replace(/[^0-9]/, '')
		}

		this.currentValue = parseInt(event.target.value)
		this.value = parseInt(event.target.value)
	}

	private markAsTouched() {
		if (!this.touched) {
			this.onTouched()
			this.touched = true
		}
	}
}