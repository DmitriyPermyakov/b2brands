import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
	selector: 'app-product-properties',
	templateUrl: './product-properties.component.html',
	styleUrls: ['./product-properties.component.css'],
})
export class ProductPropertiesComponent implements OnInit {
	@Input() props: FormControl
	@ViewChild('name') name: ElementRef
	@ViewChild('value') value: ElementRef

	public isVisibleInput: boolean = false

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

		if (this.value.nativeElement.value === '') return

		console.log(
			this.props.value.push({
				id: 'asfdasfsa',
				name: this.name.nativeElement.value,
				value: this.value.nativeElement.value,
			})
		)
	}

	toggleVisibilityInput() {
		if (this.isVisibleInput === true) {
			this.name.nativeElement.value = ''
			this.value.nativeElement.value = ''
			this.isVisibleInput = false
		} else {
			this.isVisibleInput = true
		}
	}
}
