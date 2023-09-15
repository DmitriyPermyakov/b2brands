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

	private set Selected(countOfElements: number) {
		if (countOfElements <= 2) {
			this._selected = 0
			return
		}

		if (countOfElements >= 6) {
			this._selected = 2
			return
		}

		this._selected = Math.trunc(countOfElements / 2)
	}

	private set ScrollingClass(value: string) {
		if (value === '' || value === null || value === undefined) {
			console.error('scrolling class not setted')
		}

		this._scrollingClass = value
	}

	private _countOfElements: number
	private _selected: number
	private _parentElement: ElementRef
	private _scrollingClass: string = ''

	private _addedElementValue: string = ''

	private _indexClassMap: Map<number, string> = new Map()
	private _classIndexMap: Map<string, number> = new Map()
	private _classes = [
		ClassesEnum.firstPrev,
		ClassesEnum.selected,
		ClassesEnum.firstNext,
		ClassesEnum.secondNext,
		ClassesEnum.secondPrev,
	]

	private _classesForwardOrder = [
		ClassesEnum.secondPrev,
		ClassesEnum.firstPrev,
		ClassesEnum.selected,
		ClassesEnum.firstNext,
		ClassesEnum.secondNext,
	]

	constructor(countOfElements: number, parentElement: ElementRef, scrollingClass: string) {
		this.ParentElement = parentElement
		this.CountOfElements = countOfElements
		this.Selected = countOfElements
		this.ScrollingClass = scrollingClass
	}

	public initStartClasses(countOfElements: number) {
		this.CountOfElements = countOfElements
		this.setClassesDictionary()
		switch (this._countOfElements) {
			case 0:
				break
			case 1:
				this.getElement(0).classList.add(ClassesEnum.selected)
				break
			case 2:
				this.setClassedForTwoElements()
				break
			case 3:
				this.setClassesForThreeElements()
				break
			case 4:
				this.setClassesForFourElements()
				break
			case 5:
				this.setClassesForFiveElements()
				break
			default:
				this.setClassesForMoreThanFiveElements()
				break
		}
	}

	public onScroll(event: WheelEvent) {
		if (this._countOfElements === 0) return
		if (event.deltaY < 0) {
			this.onScrollUp()
		}

		if (event.deltaY > 0) {
			this.onScrollDown()
		}
	}

	public onScrollUp() {
		if (this._countOfElements < 2) return
		this._selected--
		if (this._selected < 0) this._selected = this._countOfElements - 1
		this.moveClassesUp()
	}

	public onScrollDown() {
		if (this._countOfElements < 2) return
		this._selected++
		if (this._selected > this._countOfElements - 1) this._selected = 0
		this.moveClassesDown()
	}

	public addItem(countOfElements: number) {
		this.CountOfElements = countOfElements
		switch (this._countOfElements) {
			case 0:
				break
			case 1:
				this.getElement(0).classList.add(ClassesEnum.selected)
				this.updateClassesDictionary()
				break
			case 2:
				this.getElement(1).classList.add(ClassesEnum.firstPrev)
				this._parentElement.nativeElement.insertBefore(this.getElement(1), this.getElement(0))
				this.updateClassesDictionary()
				this.scrollToAdded()
				break
			case 3:
				this.placeElement(ClassesEnum.firstNext, ClassesEnum.firstPrev)
				this.scrollToAdded()
				break
			case 4:
				this.placeElement(ClassesEnum.secondNext, ClassesEnum.firstPrev)
				this.scrollToAdded()
				break
			case 5:
				this.placeElement(ClassesEnum.secondPrev, ClassesEnum.firstPrev)
				this.scrollToAdded()
				break
			default:
				this.placeElement(ClassesEnum.hidden, ClassesEnum.secondPrev)
				this.scrollToAdded()
				break
		}
	}

	public scrollToAdded() {
		let i = this._classIndexMap.get('selected')
		let interval = setInterval(() => {
			this.onScrollDown()
			i++
			if (i > this._countOfElements - 1) i = 0
			if (this.getElement(i).innerHTML === this._addedElementValue) {
				clearInterval(interval)
				return
			}
		}, 100)
	}

	private placeElement(newElemClassName: string, oldElemClassName: string) {
		this.getElement(this._countOfElements - 1).classList.add(newElemClassName)
		this._addedElementValue = this.getElement(this._countOfElements - 1).innerHTML
		let oldItemIndex = this._classIndexMap.get(oldElemClassName)
		if (oldItemIndex !== 0) {
			let element = this.getElement(oldItemIndex)
			this._parentElement.nativeElement.insertBefore(this.getElement(this._countOfElements - 1), element)
		}
		this.updateClassesDictionary()
		console.log(this._classIndexMap)
		console.log(this._indexClassMap)
	}

	private moveClassesUp() {
		let temp = this._indexClassMap.get(0)
		for (let index = 0; index <= this._countOfElements - 1; index++) {
			if (index === this._countOfElements - 1) {
				this.getElement(index)?.classList.remove(this._indexClassMap.get(index))
				this.getElement(index)?.classList.add(temp)
				this._indexClassMap.set(index, temp)
				this._classIndexMap.set(temp, index)
				return
			}
			this.getElement(index)?.classList.remove(this._indexClassMap.get(index))
			this.getElement(index)?.classList.add(this._indexClassMap.get(index + 1))
			this._indexClassMap.set(index, this._indexClassMap.get(index + 1))
			this._classIndexMap.set(this._indexClassMap.get(index), index)
		}
	}
	private moveClassesDown() {
		let temp = this._indexClassMap.get(this._countOfElements - 1)
		for (let index = this._countOfElements - 1; index >= 0; index--) {
			if (index === 0) {
				this.getElement(index)?.classList.remove(this._indexClassMap.get(index))
				this.getElement(index)?.classList.add(temp)
				this._indexClassMap.set(index, temp)
				this._classIndexMap.set(temp, index)
				return
			}
			this.getElement(index)?.classList.remove(this._indexClassMap.get(index))
			this.getElement(index)?.classList.add(this._indexClassMap.get(index - 1))
			this._indexClassMap.set(index, this._indexClassMap.get(index - 1))
			this._classIndexMap.set(this._indexClassMap.get(index), index)
		}
	}

	private getElement(index: number) {
		return this._parentElement.nativeElement.children[index]
	}

	private setClassesDictionary() {
		if (this._countOfElements <= 4) {
			for (let index = 0; index < 4; index++) {
				this._indexClassMap.set(index, this._classes[index])
				this._classIndexMap.set(this._classes[index], index)
			}
		} else {
			for (let index = 0; index < 5; index++) {
				this._indexClassMap.set(index, this._classesForwardOrder[index])
				this._classIndexMap.set(this._classesForwardOrder[index], index)
			}
		}
	}

	private updateClassesDictionary() {
		for (let index = 0; index <= this._countOfElements - 1; index++) {
			let className = this.getElement(index).className.replace(this._scrollingClass + ' ', '')
			this._indexClassMap.set(index, className)
			this._classIndexMap.set(className, index)
		}
	}

	private setClassedForTwoElements() {
		this.getElement(0).classList.add(ClassesEnum.firstPrev)
		this.getElement(1).classList.add(ClassesEnum.selected)
	}

	private setClassesForThreeElements() {
		this.setClassedForTwoElements()
		this.getElement(2).classList.add(ClassesEnum.firstNext)
	}

	private setClassesForFourElements() {
		this.setClassesForThreeElements()
		this.getElement(3).classList.add(ClassesEnum.secondNext)
	}

	private setClassesForFiveElements() {
		for (let i = 0; i < 5; i++) this.getElement(i)?.classList.add(this._classesForwardOrder[i])
	}

	private setClassesForMoreThanFiveElements() {
		this.setClassesForFiveElements()

		for (let i = 5; i < this._countOfElements; i++) {
			this.getElement(i)?.classList.add(ClassesEnum.hidden)
			this._indexClassMap.set(i, ClassesEnum.hidden)
		}
	}
}

export const enum ClassesEnum {
	selected = 'selected',
	firstPrev = 'first-prev',
	firstNext = 'first-next',
	secondPrev = 'second-prev',
	secondNext = 'second-next',
	hidden = 'hidden',
}
