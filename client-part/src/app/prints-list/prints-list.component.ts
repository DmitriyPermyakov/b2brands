import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core'
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

	private selectedPrintIndex: number = 0
	private printCount: number = 0

	private scroller: Scroller
	private scrollSub: Subscription

	ngAfterViewInit(): void {
		this.printCount = this.printsControl.value.length
		this.scroller = new Scroller(this.printCount, this.printsRef)

		this.scroller.initStartClasses()
		this.scrollSub = fromEvent(this.printsRef.nativeElement, 'wheel')
			.pipe(
				throttleTime(200),
				map((e) => e)
			)
			.subscribe((e: WheelEvent) => {
				this.scroller.onScroll(e)
			})
	}
}
