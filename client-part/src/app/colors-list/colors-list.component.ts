import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core'

import { FormControl } from '@angular/forms'
import { Scroller } from '../classes/scroller'

@Component({
	selector: 'app-colors-list',
	templateUrl: './colors-list.component.html',
	styleUrls: ['./colors-list.component.css'],
})
export class ColorsListComponent implements AfterViewInit, AfterContentInit {
	@ViewChild('colors') colorsRef!: ElementRef
	@ViewChild('colorInput') colorInputRef!: ElementRef
	@Input() colorsControl: FormControl

	private selectedColorIndex: number = 0
	private colorsCount: number = 0

	private scroller: Scroller

	constructor() {}

	ngAfterContentInit(): void {}

	ngAfterViewInit(): void {
		this.colorsCount = this.colorsControl.value.length
		this.scroller = new Scroller(this.colorsCount, this.colorsRef)

		this.scroller.initStartClasses()
	}

	public onScrollColors(event: WheelEvent) {
		this.scroller.onScroll(event)
	}

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
}
