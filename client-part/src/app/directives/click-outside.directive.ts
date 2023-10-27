import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core'

@Directive({
	selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
	@Output() public clickedOutside: EventEmitter<any> = new EventEmitter()

	constructor(private elRef: ElementRef) {}

	@HostListener('document:click', ['$event.target'])
	public onClick(target: any) {
		const clickedInside = this.elRef.nativeElement.contains(target)
		if (!clickedInside) {
			console.log('clicked outside')
			this.clickedOutside.emit()
		}
	}
}
