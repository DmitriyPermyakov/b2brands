import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
	selector: 'app-product-properties',
	templateUrl: './product-properties.component.html',
	styleUrls: ['./product-properties.component.css'],
})
export class ProductPropertiesComponent implements OnInit {
	@Input() props
	public valueWidth: number
	public nameWidth: number

	private get Name() {
		return (this.props as FormGroup).controls['name']
	}
	private get Value() {
		return (this.props as FormGroup).controls['value']
	}

	ngOnInit(): void {
		this.valueWidth = this.Value.value.length
		this.nameWidth = this.Name.value.length
		this.Name.valueChanges.subscribe((c) => {
			this.nameWidth = this.Name.value.length
		})

		this.Value.valueChanges.subscribe((c) => {
			this.valueWidth = this.Value.value.length
		})
	}
}
