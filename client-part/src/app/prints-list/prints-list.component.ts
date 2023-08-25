import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Scroller } from '../classes/scroller'
import { Subscription, fromEvent, map, throttleTime } from 'rxjs'

@Component({
	selector: 'app-prints-list',
	templateUrl: './prints-list.component.html',
	styleUrls: ['./prints-list.component.css'],
})
export class PrintsListComponent implements AfterViewInit {
	@Input('printsControl') printsControl: FormControl
	@ViewChild('prints') printsRef: ElementRef
	@ViewChild('printInput') input: ElementRef

	public isInputVisible: boolean = false

	private selectedPrintIndex: number = 0
	private printCount: number = 0

	private scroller: Scroller
	private scrollSub: Subscription

	constructor(private ref: ChangeDetectorRef) {}

	ngAfterViewInit(): void {
		this.scroller = new Scroller(this.printsControl.value.length, this.printsRef)

		this.scroller.initStartClasses(this.printsControl.value.length)
		this.scrollSub = fromEvent(this.printsRef.nativeElement, 'wheel')
			.pipe(
				throttleTime(200),
				map((e) => e)
			)
			.subscribe((e: WheelEvent) => {
				this.scroller.onScroll(e)
			})
	}

	public addPrint(event: Event) {
		event.preventDefault()
		if (this.input.nativeElement.value !== '') {
			this.printsControl.value.push(this.input.nativeElement.value)
			this.ref.detectChanges()
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
}
