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
import { IsMobileService } from '../services/is-mobile.service'

@Component({
	selector: 'app-colors-list',
	templateUrl: './colors-list.component.html',
	styleUrls: ['./colors-list.component.css'],
})
export class ColorsListComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('colors') colorsRef!: ElementRef
	@ViewChild('colorInput') colorInputRef!: ElementRef
	@Input() colorsControl: FormControl
	@Input() editable: boolean

	@Output() onColorChanged: EventEmitter<IProductColor> = new EventEmitter()
	private scroller: Scroller
	private scrollSub: Subscription
	private selectedItemChangedSub: Subscription

	private isMobile: boolean = true

	constructor(private ref: ChangeDetectorRef, private mobileService: IsMobileService) {
		this.isMobile = this.mobileService.isMobile
	}
	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.setAttributes()
		if (!this.isMobile) {
			if (this.colorsControl.value.length > 0) {
				this.setScroller()
				// this.passSelectedColorIndex()
				this.emitSelectedColor(this.scroller.Selected)
			}
		} else {
			if (this.colorsControl.value.length > 0) {
				this.setSelected(0)
				this.emitSelectedColor(0)
			}
		}
	}

	public previousColor() {
		if (this.colorsControl.value.length < 2) return
		this.scroller.onScrollUp()
		// this.passSelectedColorIndex()
		this.emitSelectedColor(this.scroller.Selected)
	}

	public nextColor() {
		if (this.colorsControl.value.length < 2) return
		this.scroller.onScrollDown()
		// this.passSelectedColorIndex()
		this.emitSelectedColor(this.scroller.Selected)
	}

	public showColorInput() {
		this.colorInputRef.nativeElement.showPicker()
	}

	public selectColor(event: Event, i: number) {
		if (!this.isMobile) return
		if ((event.target as HTMLElement).classList.contains('selected')) this.emitSelectedColor(i)
		else {
			this.getSelectedElement()?.classList.remove('selected')
			;(event.target as HTMLElement).classList.add('selected')
			this.emitSelectedColor(i)
		}
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

		this.colorsControl.setValue([...this.colorsControl.value, color])

		this.ref.detectChanges()
		this.colorsRef.nativeElement.children[this.colorsRef.nativeElement.children.length - 2].setAttribute(
			'data-value',
			color.value
		)
		if (!this.isMobile) {
			if (this.colorsControl.value.length < 2) this.setScroller()
			this.scroller.addItem(this.colorsControl.value.length)
			this.emitSelectedColor(this.scroller.Selected)
		} else {
			this.getSelectedElement()?.classList.remove('selected')
			this.setSelected(this.colorsControl.value.length - 1)
			// this.onColorChanged.emit(this.colorsControl.value.length - 1)
			this.emitSelectedColor(this.colorsControl.value.length - 1)
		}
	}

	ngOnDestroy(): void {
		if (this.scrollSub) this.scrollSub.unsubscribe()
		if (this.selectedItemChangedSub) this.selectedItemChangedSub.unsubscribe()
	}

	private setScroller() {
		this.scroller = new Scroller(this.colorsControl.value.length, this.colorsRef, 'color')
		this.scroller.initScroller(this.colorsControl.value.length)

		this.emitSelectedColor(this.scroller.Selected)

		this.scrollSub = this.scroller.scroll$.subscribe((e: WheelEvent) => {
			let index = this.scroller.onScroll(e)
			// this.passSelectedColorIndex()
			this.emitSelectedColor(index)
		})

		this.selectedItemChangedSub = this.scroller.selectedItemChanged.subscribe(() => {
			// this.passSelectedColorIndex()
			this.emitSelectedColor(this.scroller.Selected)
		})
	}

	private emitSelectedColor(index: number): void {
		let selectedColor = this.colorsControl.value[index]
		this.onColorChanged.emit(selectedColor)
	}

	// private passSelectedColorIndex(): void {
	// 	let index = this.getSelectedColorIndex()
	// 	this.onColorChanged.emit(index)
	// }

	private setSelected(index: number) {
		this.colorsRef.nativeElement.children[index].classList.add('selected')
	}

	// private getSelectedColorIndex(): number {
	// 	let colorValue: string | undefined | null = this.getSelectedElement()?.getAttribute('data-value')

	// 	let index = this.colorsControl.value.findIndex((el) => el.value === colorValue)
	// 	return index
	// }

	private getSelectedElement(): Element {
		let children: HTMLAllCollection = this.colorsRef.nativeElement.children
		let selected = Array.from(children).find((el) => el.classList.contains('selected'))

		return selected
	}

	private setAttributes(): void {
		for (let i = 0; i < this.colorsControl.value.length; i++) {
			this.colorsRef.nativeElement.children[i].setAttribute('data-value', this.colorsControl.value[i].value)
		}
	}
}
