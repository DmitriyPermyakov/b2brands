import { Component } from '@angular/core'
import { IsMobileService } from '../services/is-mobile.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
	selector: 'app-admin-orders-list',
	templateUrl: './admin-orders-list.component.html',
	styleUrls: ['./admin-orders-list.component.css'],
})
export class AdminOrdersListComponent {
	public isMenuVisible: boolean = false
	public isMobile: boolean

	constructor(
		private isMobileService: IsMobileService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.isMobile = this.isMobileService.isMobile
		this.isMenuVisible = !this.isMobile
	}

	public toggleMenuVisibility() {
		if (this.isMobile) this.isMenuVisible = !this.isMenuVisible
	}

	add(): void {
		if (this.activatedRoute.snapshot.children[0].url[0].path === 'products') {
			this.router.navigate(['/products', 'create'])
		} else {
			this.router.navigate(['admin/orders', 'create'])
		}
	}
}
