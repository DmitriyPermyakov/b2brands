import { Component, OnInit } from '@angular/core'
import { Observable, Observer, Subject } from 'rxjs'
import { AuthService } from '../services/auth.service'

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
	public isNavBarVisible: boolean = false
	public link: string = ''

	constructor(private authService: AuthService) {
		this.link = authService.IsAuthenticated ? '/admin/products' : '/products'
	}
	ngOnInit(): void {
		this.isNavBarVisible = window.innerWidth > 600
	}

	toWorkStage() {
		document.getElementById('workStage')?.scrollIntoView({ behavior: 'smooth' })
	}

	toDelivery() {
		document.getElementById('delivery')?.scrollIntoView({ behavior: 'smooth' })
	}

	toPartners() {
		document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' })
	}

	toggleVisibility() {
		this.isNavBarVisible = !this.isNavBarVisible
	}
}
