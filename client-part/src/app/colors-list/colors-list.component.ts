import {
	AfterContentInit,
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	OnDestroy,
	ViewChild,
} from '@angular/core'

import { FormControl } from '@angular/forms'
import { Scroller } from '../classes/scroller'
import { Subscription, fromEvent, map, throttleTime } from 'rxjs'
import { IProductColor } from '../interfaces/productColor.interface'

@Component({
	selector: 'app-colors-list',
	templateUrl: './colors-list.component.html',
	styleUrls: ['./colors-list.component.css'],
})
export class ColorsListComponent implements AfterViewInit, OnDestroy {
	@ViewChild('colors') colorsRef!: ElementRef
	@ViewChild('colorInput') colorInputRef!: ElementRef
	@Input() colorsControl: FormControl

	private selectedColorIndex: number = 0

	private scroller: Scroller
	private scrollSub: Subscription

	constructor(private ref: ChangeDetectorRef) {}

	ngAfterViewInit(): void {
		this.setAttributes()
		this.scroller = new Scroller(this.colorsControl.value.length, this.colorsRef, 'color')

		this.scroller.initStartClasses(this.colorsControl.value.length)
		this.scrollSub = fromEvent(this.colorsRef.nativeElement, 'wheel')
			.pipe(
				throttleTime(200),
				map((e) => e)
			)
			.subscribe((e: WheelEvent) => {
				this.scroller.onScroll(e)
			})
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
		let color: IProductColor = {
			id: 'new element',
			value: event.target.value,
			frontSmallUrl: '',
			bottomSmallUrl: '',
			rightSmallUrl: '',
			leftSmallUrl: '',
		}
		this.colorsControl.value.push(color)
		this.colorsRef.nativeElement.children[this.colorsRef.nativeElement.children.length - 1].setAttribute(
			'data-value',
			color.value
		)
		this.ref.detectChanges()
		this.scroller.addItem(this.colorsControl.value.length)
	}

	ngOnDestroy(): void {
		if (this.scrollSub) this.scrollSub.unsubscribe()
	}

	private setAttributes(): void {
		for (let i = 0; i < this.colorsControl.value.length; i++) {
			this.colorsRef.nativeElement.children[i].setAttribute('data-value', this.colorsControl.value[i].value)
		}
	}
}
