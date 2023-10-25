import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class IsMobileService {
	public isMobile: boolean = false
	constructor() {
		this.isMobile = window.innerWidth < 600
		// this.isMobile = true
	}
}
