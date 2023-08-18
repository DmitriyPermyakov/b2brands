import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core'

import { FormControl } from '@angular/forms'
import { Scroller } from '../classes/scroller'
import { Subscription, fromEvent, map, throttleTime } from 'rxjs'

@Component({
	selector: 'app-colors-list',
	templateUrl: './colors-list.component.html',
	styleUrls: ['./colors-list.component.css'],
})
export class ColorsListComponent implements AfterViewInit, AfterContentInit, OnDestroy {
	@ViewChild('colors') colorsRef!: ElementRef
	@ViewChild('colorInput') colorInputRef!: ElementRef
	@Input() colorsControl: FormControl

	private selectedColorIndex: number = 0
	private colorsCount: number = 0

	private scroller: Scroller
	private scrollSub: Subscription

	constructor() {}

	ngAfterContentInit(): void {}

	ngAfterViewInit(): void {
		this.colorsCount = this.colorsControl.value.length
		this.scroller = new Scroller(this.colorsCount, this.colorsRef)

		this.scroller.initStartClasses()
		this.scrollSub = fromEvent(this.colorsRef.nativeElement, 'wheel')
			.pipe(
				throttleTime(200),
				map((e) => e)
			)
			.subscribe((e: WheelEvent) => {
				this.scroller.onScroll(e)
			})
	}

	public onScrollColors(event: WheelEvent) {}

	public previousColor() {
		this.scroller.onScrollUp()
	}

	public nextColor() {
		this.scroller.onScrollDown()
	}

	public showColorInput() {
		this.colorInputRef.nativeElement.showPicker()
	}

	public colorPickerChangedValue(event) {
		console.log(event.target.value)
		console.log(5 % 5)
	}

	ngOnDestroy(): void {
		if (this.scrollSub) this.scrollSub.unsubscribe()
	}
}
