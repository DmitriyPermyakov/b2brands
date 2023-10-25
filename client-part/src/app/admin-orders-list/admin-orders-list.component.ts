import { Component } from '@angular/core'
import { IsMobileService } from '../services/is-mobile.service'

@Component({
	selector: 'app-admin-orders-list',
	templateUrl: './admin-orders-list.component.html',
	styleUrls: ['./admin-orders-list.component.css'],
})
export class AdminOrdersListComponent {
	public isMenuVisible: boolean = false
	public isMobile: boolean

	constructor(private isMobileService: IsMobileService) {
		this.isMobile = this.isMobileService.isMobile
		this.isMenuVisible = !this.isMobile
	}

	public toggleMenuVisibility() {
		if (this.isMobile) this.isMenuVisible = !this.isMenuVisible
	}
}
