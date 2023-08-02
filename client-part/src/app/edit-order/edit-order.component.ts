import { Component } from '@angular/core'

@Component({
	selector: 'app-edit-order',
	templateUrl: './edit-order.component.html',
	styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent {
	public editable: boolean = false
	edit() {
		this.editable = true
		console.log('click')
	}
}
