import { ElementRef } from '@angular/core'

export class Scroller {
	private set ParentElement(element: ElementRef) {
		if (element) this._parentElement = element
		else console.log('Scroll service: parentElement didnt set')
	}

	private set CountOfElements(countOfElements: number) {
		if (countOfElements < 0) this._countOfElements = 0
		this._countOfElements = countOfElements
	}

	private set Counter(countOfElements: number) {
		console.log('counter is ' + (5 % 5))
		console.log('rear ' + (5 % 6))
		if (countOfElements <= 2) {
			this._counter = 0
			return
		}

		if (countOfElements >= 6) {
			this._counter = 2
			return
		}

		this._counter = Math.trunc(countOfElements / 2)
	}

	private _countOfElements: number
	private _counter: number
	private _parentElement: ElementRef
	private _startIndex: number

	constructor(countOfElements: number, parentElement: ElementRef) {
		this.ParentElement = parentElement
		this.CountOfElements = countOfElements
		this.Counter = countOfElements
	}

	// private initPrintStartClasses(element: ElementRef, index: number) {
	// 	this.initStartClasses(element, index)
	// }

	public initStartClasses() {
		this._parentElement.nativeElement.children[this._counter - 2]?.classList.add('second')
		this._parentElement.nativeElement.children[this._counter - 2]?.classList.add('second-prev')
		this._parentElement.nativeElement.children[this._counter - 1]?.classList.add('first')
		this._parentElement.nativeElement.children[this._counter - 1]?.classList.add('first-prev')
		this._parentElement.nativeElement.children[this._counter]?.classList.add('selected')
		this._parentElement.nativeElement.children[this._counter + 1]?.classList.add('first')
		this._parentElement.nativeElement.children[this._counter + 1]?.classList.add('first-next')
		this._parentElement.nativeElement.children[this._counter + 2]?.classList.add('second')
		this._parentElement.nativeElement.children[this._counter + 2]?.classList.add('second-next')

		if (this._countOfElements > 5)
			for (let i = 5; i < this._countOfElements; i++) {
				this.getElement(i)?.classList.add('hidden')
			}

		this._startIndex = this._counter
	}

	public onScroll(event: WheelEvent) {
		if (event.deltaY < 0) {
			this.onScrollUp()
		}

		if (event.deltaY > 0) {
			this.onScrollDown()
		}
	}

	public onScrollUp() {
		this._counter--
		if (this._counter < 0) this._counter = this._countOfElements - 1
		this.scrollUpChangeSelectedClass(this._counter)
	}

	public onScrollDown() {
		this._counter++
		if (this._counter > this._countOfElements - 1) this._counter = 0

		this.scrollDownChangeSelectedClass(this._counter)
	}

	public scrollUpChangeSelectedClass(index: number) {
		this.getElement(this.setIndex(index, -2))?.classList.remove('hidden')
		this.getElement(this.setIndex(index, -2))?.classList.add('second')
		this.getElement(this.setIndex(index, -2))?.classList.add('second-prev')
		this.getElement(this.setIndex(index, -1))?.classList.remove('second-prev')
		this.getElement(this.setIndex(index, -1))?.classList.remove('second')
		this.getElement(this.setIndex(index, -1))?.classList.add('first-prev')
		this.getElement(this.setIndex(index, -1))?.classList.add('first')
		this.getElement(this.setIndex(index, 0))?.classList.remove('first')
		this.getElement(this.setIndex(index, 0))?.classList.remove('first-prev')
		this.getElement(this.setIndex(index, 0))?.classList.add('selected')
		this.getElement(this.setIndex(index, 1))?.classList.remove('selected')
		this.getElement(this.setIndex(index, 1))?.classList.add('first')
		this.getElement(this.setIndex(index, 1))?.classList.add('first-next')
		this.getElement(this.setIndex(index, 2))?.classList.remove('first-next')
		this.getElement(this.setIndex(index, 2))?.classList.remove('first')
		this.getElement(this.setIndex(index, 2))?.classList.add('second')
		this.getElement(this.setIndex(index, 2))?.classList.add('second-next')
		this.getElement(this.setIndex(index, 3))?.classList.remove('second-next')
		this.getElement(this.setIndex(index, 3))?.classList.remove('second')
		this.getElement(this.setIndex(index, 3))?.classList.add('hidden')
	}

	public scrollDownChangeSelectedClass(index: number) {
		this.getElement(this.setIndex(index, 3))?.classList.add('hidden')
		this.getElement(this.setIndex(index, 2))?.classList.remove('hidden')
		this.getElement(this.setIndex(index, 2))?.classList.add('second-next')
		this.getElement(this.setIndex(index, 2))?.classList.add('second')
		this.getElement(this.setIndex(index, 1))?.classList.remove('second')
		this.getElement(this.setIndex(index, 1))?.classList.remove('second-next')
		this.getElement(this.setIndex(index, 1))?.classList.add('first-next')
		this.getElement(this.setIndex(index, 1))?.classList.add('first')
		this.getElement(this.setIndex(index, 0))?.classList.remove('first')
		this.getElement(this.setIndex(index, 0))?.classList.remove('first-next')
		this.getElement(this.setIndex(index, 0))?.classList.add('selected')
		this.getElement(this.setIndex(index, -1))?.classList.remove('selected')
		this.getElement(this.setIndex(index, -1))?.classList.add('first')
		this.getElement(this.setIndex(index, -1))?.classList.add('first-prev')
		this.getElement(this.setIndex(index, -2))?.classList.remove('first')
		this.getElement(this.setIndex(index, -2))?.classList.remove('first-prev')
		this.getElement(this.setIndex(index, -2))?.classList.add('second')
		this.getElement(this.setIndex(index, -2))?.classList.add('second-prev')
		this.getElement(this.setIndex(index, -3))?.classList.remove('second')
		this.getElement(this.setIndex(index, -3))?.classList.remove('second-prev')
	}

	private setIndex(index: number, bias: number): number {
		if (index + bias < 0) {
			return this._countOfElements + index + bias
		}
		if (index + bias > this._countOfElements - 1) {
			return index + bias - this._countOfElements
		}
		return index + bias
	}

	private getElement(index: number) {
		return this._parentElement.nativeElement.children[index]
	}
}
