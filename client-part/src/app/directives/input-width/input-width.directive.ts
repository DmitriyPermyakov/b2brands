import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'

@Directive({
	selector: '[inputWidth]',
})
export class InputWidthDirective implements OnInit, OnChanges {
	@Input('inputWidth') width: number
	@HostBinding('style.width') elWidth
	constructor(private el: ElementRef) {}

	ngOnInit(): void {
		this.elWidth = this.width + 1 + 'ch'
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.elWidth = this.width + 1 + 'ch'
	}
}
