import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
	selector: 'app-product-properties',
	templateUrl: './product-properties.component.html',
	styleUrls: ['./product-properties.component.css'],
})
export class ProductPropertiesComponent implements OnInit {
	@Input() props: FormControl
	@Input() editable: boolean
	@ViewChild('name') name: ElementRef
	@ViewChild('value') value: ElementRef

	public isVisibleInput: boolean = false
	public isButtonEnable: boolean = false

	ngOnInit(): void {}

	onChangeName(event: Event) {
		event.preventDefault()
		this.value.nativeElement.focus()
	}

	onChangeValue(event: Event) {
		if (this.name.nativeElement.value === '') {
			event.preventDefault()
			this.name.nativeElement.focus()
			return
		}

		if (this.value.nativeElement.value === '') {
			event.preventDefault()
			return
		}

		this.props.setValue([
			...this.props.value,
			{
				id: 'asfdasfsa',
				name: this.name.nativeElement.value,
				value: this.value.nativeElement.value,
			},
		])
		console.log(this.props.value)
		this.toggleVisibilityInput()
	}

	enableButton() {
		this.isButtonEnable = true
	}

	disableButton() {
		this.isButtonEnable = false
	}

	toggleVisibilityInput() {
		if (this.isVisibleInput === true) {
			this.name.nativeElement.value = ''
			this.value.nativeElement.value = ''
			this.isVisibleInput = false
			this.isButtonEnable = false
		} else {
			this.isVisibleInput = true
		}
	}

	removeValue(index: number): void {
		let arr = Array.from(this.props.value)
		arr.splice(index, 1)
		this.props.patchValue(arr)
		// console.log(Array.from(this.props.value).splice(index, 1))
	}
}
