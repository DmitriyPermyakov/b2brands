import { Component, EventEmitter, Output } from '@angular/core'

@Component({
	selector: 'app-mobile-menu-btn',
	templateUrl: './mobile-menu-btn.component.html',
	styleUrls: ['./mobile-menu-btn.component.css'],
})
export class MobileMenuBtnComponent {
	@Output() onMenuClick: EventEmitter<void> = new EventEmitter()
	toggleVisibility(): void {
		this.onMenuClick.emit()
	}
}
