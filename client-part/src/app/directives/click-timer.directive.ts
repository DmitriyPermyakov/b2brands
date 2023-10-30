import { Directive, HostListener, Input } from '@angular/core'

@Directive({
	selector: '[appClickTimer]',
})
export class ClickTimerDirective {
	@Input('appClickTimer') elClass: string
	constructor() {}

	@HostListener('click', ['$event.target'])
	public onClick(target) {
		if (target.classList.contains(this.elClass)) {
			target.classList.add('clicked')
			setTimeout(() => {
				target.classList.remove('clicked')
			}, 1000)
		} else if (target.parentElement.classList.contains(this.elClass)) {
			target.parentElement.classList.add('clicked')
			setTimeout(() => {
				target.parentElement.classList.remove('clicked')
			}, 1000)
		}
	}
}
