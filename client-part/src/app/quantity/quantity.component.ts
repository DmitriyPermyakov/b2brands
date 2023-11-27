import {
	AfterContentInit,
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	forwardRef,
} from '@angular/core'
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
export class QuantityComponent implements OnInit, ControlValueAccessor, AfterContentInit {
	@Input() postfix: string = ''
	public quantityString: string = ''

	@Input() public colored: boolean = false
	@Input()
	public set value(val: number) {
		//parse to number
		if (val < 1) {
			this._value = 1

			this.onChange(this._value)
		} else {
			this._value = val
			this.onChange(this._value)
		}
	}

	public get value(): number {
		return this._value
	}
	@Input()
	public set IsDisabled(value: boolean) {
		this._disabled = value
	}
	public get IsDisabled(): boolean {
		return this._disabled
	}

	public inputLenght: number

	public onChange = (value: number) => {}
	public onTouched = () => {}

	private _disabled: boolean = true
	private touched = false

	private pattern = /^[0-9]+$/
	private currentValue: number
	private _value: number

	constructor(private detector: ChangeDetectorRef) {}

	ngOnInit() {
		if (!this.value) {
			this.value = 1
		}
		this.currentValue = this.value
	}

	ngAfterContentInit(): void {
		this.quantityString = this.value + this.postfix
		this.inputLenght = this.quantityString.length
	}

	writeValue(value: any): void {
		this.value = value
	}
	registerOnChange(fn: any): void {
		this.onChange = fn
	}
	registerOnTouched(fn: any): void {
		this.onTouched = fn
	}
	setDisabledState(isDisabled: boolean): void {
		this._disabled = isDisabled
		this.quantityString = this.value + this.postfix
	}

	increase() {
		this.markAsTouched()
		if (this.value >= 99999) return

		this.value++
		this.quantityString = this.value + this.postfix
		this.inputLenght = this.quantityString.length
	}

	decrease() {
		this.markAsTouched()
		if (this.value > 1) {
			this.value--
			this.quantityString = this.value + this.postfix
			this.inputLenght = this.quantityString.length
		}
		return
	}

	onFocus(event: any): void {
		this.inputLenght = event.target.value.length
		this.markAsTouched()
		if (event.target.value.toString().includes(this.postfix)) {
			this.value = event.target.value.slice(0, event.target.value.length - this.postfix.length)
		}
		event.target.value = this.value
	}

	onBlur(event: any): void {
		if (event.target.value == '') {
			this.value = 1
		}

		event.target.value = this.value + this.postfix
		// this.inputLenght = event.target.value.length
	}
	onInput(event: any): void {
		this.markAsTouched()
		if (event.target.value.length > 5) event.target.value = this.currentValue

		if (!this.pattern.test(event.target.value)) {
			event.target.value = event.target.value.replace(/[^0-9]/, '')
		}

		this.currentValue = parseInt(event.target.value)
		this.value = parseInt(event.target.value)
		// this.inputLenght = this.value.toString().length
	}

	private markAsTouched() {
		if (!this.touched) {
			this.onTouched()
			this.touched = true
		}
	}
}
