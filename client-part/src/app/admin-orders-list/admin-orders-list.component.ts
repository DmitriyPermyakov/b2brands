import { Component } from '@angular/core'

@Component({
	selector: 'app-admin-orders-list',
	templateUrl: './admin-orders-list.component.html',
	styleUrls: ['./admin-orders-list.component.css'],
})
export class AdminOrdersListComponent {
	public isMenuVisible: boolean = false

	public toggleMenuVisibility() {
		this.isMenuVisible = !this.isMenuVisible
	}
}
