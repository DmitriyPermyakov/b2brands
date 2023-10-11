import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Scroller } from '../classes/scroller'
import { Subscription } from 'rxjs'

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

	private scroller: Scroller
	private scrollSub: Subscription

	constructor(private ref: ChangeDetectorRef) {}

	ngAfterViewInit(): void {
		this.setAttributes()
		if (this.printsControl.value.length > 0) this.setScroller()
	}
	ngOnDestroy(): void {
		if (this.scrollSub) this.scrollSub.unsubscribe()
	}

	public removeValue(index: number): void {
		this.printsControl.value.splice(index, 1)
		this.scroller.removeItem(index, this.printsControl.value.length)
	}

	public addPrint(event: Event) {
		event.preventDefault()
		if (this.input.nativeElement.value !== '') {
			this.printsControl.setValue([...this.printsControl.value, this.input.nativeElement.value])
			// this.printsControl.value.push(this.input.nativeElement.value)
			this.ref.detectChanges()
			this.printsRef.nativeElement.children[this.printsRef.nativeElement.children.length - 1].setAttribute(
				'data-value',
				this.input.nativeElement.value
			)
			if (this.printsControl.value.length < 2) this.setScroller()

			this.scroller.addItem(this.printsControl.value.length)
			this.input.nativeElement.value = ''
			this.isInputVisible = false
		} else this.isInputVisible = false
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

		this.scroller.initStartClasses(this.printsControl.value.length)
		this.scrollSub = this.scroller.scroll$.subscribe((e: WheelEvent) => {
			this.scroller.onScroll(e)
		})
	}
}
