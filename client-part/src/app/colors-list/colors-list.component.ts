import {
	AfterContentInit,
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core'

import { FormControl } from '@angular/forms'
import { Scroller } from '../classes/scroller'
import { Subscription } from 'rxjs'
import { IProductColor } from '../interfaces/productColor.interface'

@Component({
	selector: 'app-colors-list',
	templateUrl: './colors-list.component.html',
	styleUrls: ['./colors-list.component.css'],
})
export class ColorsListComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('colors') colorsRef!: ElementRef
	@ViewChild('colorInput') colorInputRef!: ElementRef
	@Input() colorsControl: FormControl

	@Output() onColorChanged: EventEmitter<number> = new EventEmitter()
	private scroller: Scroller
	private scrollSub: Subscription
	private selectedItemChangedSub: Subscription

	constructor(private ref: ChangeDetectorRef) {}
	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.setAttributes()
		this.scroller = new Scroller(this.colorsControl.value.length, this.colorsRef, 'color')

		this.scrollSub = this.scroller.scroll$.subscribe((e: WheelEvent) => {
			this.scroller.onScroll(e)
			this.passSelectedColorIndex()
		})

		this.selectedItemChangedSub = this.scroller.selectedItemChanged.subscribe(() => {
			this.passSelectedColorIndex()
		})
		this.scroller.initStartClasses(this.colorsControl.value.length)
	}

	public previousColor() {
		this.scroller.onScrollUp()
		this.passSelectedColorIndex()
	}

	public nextColor() {
		this.scroller.onScrollDown()
		this.passSelectedColorIndex()
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
		// console.log(this.colorsControl.value)
		// this.colorsControl.value.push(color)
		// console.log(this.colorsControl.value)

		this.colorsControl.setValue([...this.colorsControl.value, color])

		this.ref.detectChanges()
		this.colorsRef.nativeElement.children[this.colorsRef.nativeElement.children.length - 1].setAttribute(
			'data-value',
			color.value
		)
		this.scroller.addItem(this.colorsControl.value.length)
	}

	ngOnDestroy(): void {
		if (this.scrollSub) this.scrollSub.unsubscribe()
		if (this.selectedItemChangedSub) this.selectedItemChangedSub.unsubscribe()
	}

	private passSelectedColorIndex(): void {
		let index = this.getSelectedColorIndex()
		this.onColorChanged.emit(index)
	}

	private getSelectedColorIndex(): number {
		let children: HTMLAllCollection = this.colorsRef.nativeElement.children
		let colorValue: string | undefined | null = Array.from(children)
			.find((el) => el.classList.contains('selected'))
			?.getAttribute('data-value')

		let index = this.colorsControl.value.findIndex((el) => el.value === colorValue)

		return index
	}

	private setAttributes(): void {
		for (let i = 0; i < this.colorsControl.value.length; i++) {
			this.colorsRef.nativeElement.children[i].setAttribute('data-value', this.colorsControl.value[i].value)
		}
	}
}
