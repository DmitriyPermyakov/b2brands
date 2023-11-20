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
			}
		} else {
			if (this.colorsControl.value.length > 0) {
				this.setSelected(0)
				let selectedElementAttrubute = this.colorsRef.nativeElement.children[0].getAttribute('data-value')

				this.emitSelectedColor(selectedElementAttrubute)
			}
		}
	}

	public previousColor() {
		if (this.colorsControl.value.length < 2) return
		this.scroller.onScrollUp()
	}

	public nextColor() {
		if (this.colorsControl.value.length < 2) return
		this.scroller.onScrollDown()
	}

	public showColorInput() {
		this.colorInputRef.nativeElement.showPicker()
	}

	public selectColor(event: Event, i: number) {
		if (!this.isMobile) return

		let target = event.target as HTMLElement
		let selectedElementAttribute = target.getAttribute('data-value')

		if (target.classList.contains('selected')) {
			this.emitSelectedColor(selectedElementAttribute)
		} else {
			this.getSelectedElement()?.classList.remove('selected')
			target.classList.add('selected')
			this.emitSelectedColor(selectedElementAttribute)
		}
	}

	public colorPickerChangedValue(event) {
		let color: IProductColor = {
			id: 'new',
			value: event.target.value,
			frontSmallUrl: '',
			bottomSmallUrl: '',
			rightSmallUrl: '',
			leftSmallUrl: '',
		}

		this.colorsControl.setValue([...this.colorsControl.value, color])

		this.ref.detectChanges()
		this.colorsRef.nativeElement.children[this.colorsRef.nativeElement.children.length - 1].setAttribute(
			'data-value',
			color.value
		)
		if (!this.isMobile) {
			//если добавлен первый элемент, то инициализируется скроллер, а в скроллере

			if (this.colorsControl.value.length < 2) this.setScroller()
			else {
				this.scroller.addItem(this.colorsControl.value.length)
			}
		} else {
			this.getSelectedElement()?.classList.remove('selected')
			this.setSelected(this.colorsControl.value.length - 1)
			this.emitSelectedColor(this.getSelectedElement().getAttribute('data-value'))
		}
	}

	public removeColor(id: string) {
		// #TODO: проверить количество элементов в colorsControl и, если элементов 0, то удалить подписки на скролл
		// #TODO: эмитить событие удаления, чтобы удалить изображения с сервера
	}

	ngOnDestroy(): void {
		if (this.scrollSub) this.scrollSub.unsubscribe()
		if (this.selectedItemChangedSub) this.selectedItemChangedSub.unsubscribe()
	}

	private setScroller() {
		this.scroller = new Scroller(this.colorsControl.value.length, this.colorsRef, 'color')

		if (!this.scrollSub)
			this.scrollSub = this.scroller.scroll$.subscribe((e: WheelEvent) => {
				this.scroller.onScroll(e)
				this.emitSelectedColor(this.scroller.SelectedElementAttribute)
			})

		if (!this.selectedItemChangedSub)
			this.selectedItemChangedSub = this.scroller.selectedItemChanged.subscribe((selected) => {
				this.emitSelectedColor(selected)
			})

		this.scroller.initScroller(this.colorsControl.value.length)
	}

	private emitSelectedColor(attribute: string): void {
		let selectedColor = this.colorsControl.value.find((el: IProductColor) => el.value === attribute)

		if (selectedColor === undefined) {
			let emptyProduct: IProductColor = {
				id: '',
				value: '',
				frontSmallUrl: '',
				leftSmallUrl: '',
				bottomSmallUrl: '',
				rightSmallUrl: '',
			}

			this.onColorChanged.emit(emptyProduct)
			return
		}
		this.onColorChanged.emit(selectedColor)
	}

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
