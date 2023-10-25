import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	ViewChild,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { Scroller } from '../classes/scroller'
import { Subscription } from 'rxjs'
import { IsMobileService } from '../services/is-mobile.service'

@Component({
	selector: 'app-prints-list',
	templateUrl: './prints-list.component.html',
	styleUrls: ['./prints-list.component.css'],
})
export class PrintsListComponent implements AfterViewInit, OnDestroy {
	@Input('printsControl') printsControl: FormControl
	@Input() editable: boolean
	@ViewChild('prints') printsRef: ElementRef
	@ViewChild('printInput') input: ElementRef

	public isInputVisible: boolean = false
	@Output() onPrintChanged: EventEmitter<string> = new EventEmitter<string>()

	private scroller: Scroller
	private scrollSub: Subscription
	public isMobile: boolean = true
	constructor(private ref: ChangeDetectorRef, private mobileService: IsMobileService) {
		this.isMobile = this.mobileService.isMobile
	}

	ngAfterViewInit(): void {
		if (!this.isMobile) {
			this.setAttributes()
			if (this.printsControl.value.length > 0) this.setScroller()
		} else {
			this.emitPrintValue(0)
		}
	}

	ngOnDestroy(): void {
		if (this.scrollSub) this.scrollSub.unsubscribe()
	}

	public removeValue(index: number): void {
		let array = Array.from(this.printsControl.value)
		array.splice(index, 1)
		this.printsControl.setValue(array)
		this.ref.detectChanges()

		if (!this.isMobile) {
			this.scroller.removeItem(index, this.printsControl.value.length)
			if (this.printsControl.value.length < 1) this.scrollSub.unsubscribe()
		}
	}

	public addPrint(event: Event) {
		event.preventDefault()
		if (this.input.nativeElement.value !== '') {
			this.printsControl.setValue([...this.printsControl.value, this.input.nativeElement.value])
			this.ref.detectChanges()
			this.printsRef.nativeElement.children[this.printsRef.nativeElement.children.length - 1].setAttribute(
				'data-value',
				this.input.nativeElement.value
			)
			if (!this.isMobile) {
				if (this.printsControl.value.length < 2) this.setScroller()
				this.scroller.addItem(this.printsControl.value.length)
			}

			this.input.nativeElement.value = ''
			this.isInputVisible = false
		} else this.isInputVisible = false
	}

	public changePrint(event) {
		this.onPrintChanged.emit(event.target.value)
	}

	public toggleInputVisibility() {
		if (this.isInputVisible === true) {
			this.input.nativeElement.value = ''
			this.isInputVisible = false
		} else {
			this.isInputVisible = true
		}
	}

	private setAttributes(): void {
		for (let i = 0; i < this.printsControl.value.length; i++) {
			this.printsRef.nativeElement.children[i].setAttribute('data-value', this.printsControl.value[i])
		}
	}

	private setScroller() {
		this.scroller = new Scroller(this.printsControl.value.length, this.printsRef, 'type-of-print')

		this.scroller.initScroller(this.printsControl.value.length)
		this.emitPrintValue(this.scroller.Selected)

		this.scrollSub = this.scroller.scroll$.subscribe((e: WheelEvent) => {
			let index = this.scroller.onScroll(e)
			this.emitPrintValue(index)
		})
	}

	private emitPrintValue(index): void {
		let selectedPrint: string = this.printsControl.value[index]
		this.onPrintChanged.emit(selectedPrint)
	}
}
