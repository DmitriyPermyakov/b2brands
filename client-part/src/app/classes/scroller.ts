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

	private _countOfElements: number
	private _selected: number
	private _parentElement: ElementRef

	private classMapIndexes: Map<string, number> = new Map()
	private hiddenClassMapIndexes: Map<string, number[]> = new Map()

	constructor(countOfElements: number, parentElement: ElementRef) {
		this.ParentElement = parentElement
		this.CountOfElements = countOfElements
		this.Selected = countOfElements
	}

	// private initPrintStartClasses(element: ElementRef, index: number) {
	// 	this.initStartClasses(element, index)
	// }

	public initStartClasses(countOfElements: number) {
		this.CountOfElements = countOfElements
		switch (this._countOfElements) {
			case 0:
				break
			case 1:
				this.getElement(0).classList.add(ClassesEnum.selected)
				break
			case 2:
				this.setClassedForTwoElements()
				this.setClassesDictionaryForTwoElements()
				break
			case 3:
				this.setClassesForThreeElements()
				this.setClassesDictionaryForThreeElements()
				break
			case 4:
				this.setClassesForFourElements()
				this.setClassesDictionaryForFourElements()
				break
			case 5:
				this.setClassesForFiveElements()
				this.setClassesDictionaryForFiveElements()
				this.hiddenClassMapIndexes.set(ClassesEnum.hidden, [])
				break
			default:
				this.hiddenClassMapIndexes.set(ClassesEnum.hidden, [])
				this.setClassesDictionaryForFiveElements()
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

	public scrollToAdded() {
		let i = this.classMapIndexes.get('selected')
		let interval = setInterval(() => {
			this.onScrollDown()
			i++
			if (i >= this._countOfElements - 1) {
				clearInterval(interval)
			}
		}, 100)
	}

	public onScrollUp() {
		this._selected--
		if (this._selected < 0) this._selected = this._countOfElements - 1
		this.scrollUpChangeSelectedClass()
	}

	public onScrollDown() {
		this._selected++
		if (this._selected > this._countOfElements - 1) this._selected = 0
		this.scrollDownChangeSelectedClass()
	}

	public scrollUpChangeSelectedClass() {
		//#region commented
		// this.removeClass(index, -2, 'hidden')
		// this.AddClass(index, -2, 'second-prev')
		// this.removeClass(index, -1, 'second-prev')
		// this.AddClass(index, -1, 'first-prev')
		// this.removeClass(index, 0, 'first-prev')
		// this.AddClass(index, 0, 'selected')
		// this.removeClass(index, 1, 'selected')
		// this.AddClass(index, 1, 'first-next')
		// this.removeClass(index, 2, 'first-next')
		// this.AddClass(index, 2, 'second-next')
		// this.removeClass(index, 3, 'second-next')
		// this.AddClass(index, 3, 'hidden')
		//#endregion
		this.moveClassesUp()
	}

	public scrollDownChangeSelectedClass() {
		// this.AddClass(index, 3, 'hidden')
		// this.removeClass(index, 2, 'hidden')
		// this.AddClass(index, 2, 'second-next')
		// this.removeClass(index, 1, 'second-next')
		// this.AddClass(index, 1, 'first-next')
		// this.removeClass(index, 0, 'first-next')
		// this.AddClass(index, 0, 'selected')
		// this.removeClass(index, -1, 'selected')
		// this.AddClass(index, -1, 'first-prev')
		// this.removeClass(index, -2, 'first-prev')
		// this.AddClass(index, -2, 'second-prev')
		// this.removeClass(index, -3, 'second-prev')
		this.moveClassesDown()
	}

	private moveClassesUp() {
		switch (this._countOfElements) {
			case 2:
				this.moveUp(ClassesEnum.selected)
				this.moveUp(ClassesEnum.firstNext)
				break
			case 3:
				this.moveUp(ClassesEnum.firstPrev)
				this.moveUp(ClassesEnum.firstNext)
				this.moveUp(ClassesEnum.selected)
				break
			case 4:
				this.moveUp(ClassesEnum.secondPrev)
				this.moveUp(ClassesEnum.firstPrev)
				this.moveUp(ClassesEnum.selected)
				this.moveUp(ClassesEnum.firstNext)
				break
			case 5:
				this.moveUp(ClassesEnum.secondPrev)
				this.moveUp(ClassesEnum.firstPrev)
				this.moveUp(ClassesEnum.selected)
				this.moveUp(ClassesEnum.firstNext)
				this.moveUp(ClassesEnum.secondNext)
				break
			default:
				this.moveUp(ClassesEnum.secondPrev)
				this.moveUp(ClassesEnum.firstPrev)
				this.moveUp(ClassesEnum.selected)
				this.moveUp(ClassesEnum.firstNext)
				this.moveUp(ClassesEnum.secondNext)
				this.moveUpHidden()
				break
		}
	}

	private moveClassesDown() {
		switch (this._countOfElements) {
			case 1:
				break
			case 2:
				this.moveDown(ClassesEnum.selected)
				this.moveDown(ClassesEnum.firstNext)
				break
			case 3:
				this.moveDown(ClassesEnum.firstPrev)
				this.moveDown(ClassesEnum.firstNext)
				this.moveDown(ClassesEnum.selected)
				break
			case 4:
				this.moveDown(ClassesEnum.secondPrev)
				this.moveDown(ClassesEnum.firstPrev)
				this.moveDown(ClassesEnum.selected)
				this.moveDown(ClassesEnum.firstNext)
				break
			case 5:
				this.moveDown(ClassesEnum.secondPrev)
				this.moveDown(ClassesEnum.firstPrev)
				this.moveDown(ClassesEnum.selected)
				this.moveDown(ClassesEnum.firstNext)
				this.moveDown(ClassesEnum.secondNext)
				break
			default:
				this.moveDown(ClassesEnum.secondPrev)
				this.moveDown(ClassesEnum.firstPrev)
				this.moveDown(ClassesEnum.selected)
				this.moveDown(ClassesEnum.firstNext)
				this.moveDown(ClassesEnum.secondNext)
				this.moveDownHidden()
				break
		}
	}

	private moveUp(className: string) {
		let index = this.classMapIndexes.get(className)
		if (index <= 0) {
			this.getElement(index)?.classList.remove(className)
			this.getElement(this._countOfElements - 1)?.classList.add(className)
			this.classMapIndexes.set(className, this._countOfElements - 1)
			return
		}

		this.getElement(index - 1)?.classList.add(className)
		this.getElement(index)?.classList.remove(className)
		this.classMapIndexes.set(className, index - 1)
	}

	private moveDown(className) {
		let index = this.classMapIndexes.get(className)
		if (index >= this._countOfElements - 1) {
			this.getElement(index)?.classList.remove(className)
			this.getElement(0)?.classList.add(className)
			this.classMapIndexes.set(className, 0)
			return
		}
		this.getElement(index)?.classList.remove(className)
		this.getElement(index + 1)?.classList.add(className)
		this.classMapIndexes.set(className, index + 1)
	}

	private moveUpHidden() {
		if (this._countOfElements > 5) {
			let length = this.hiddenClassMapIndexes.get(ClassesEnum.hidden).length
			for (let i = 0; i < length; i++) {
				let index = this.hiddenClassMapIndexes.get(ClassesEnum.hidden)[i]
				this.changeUpHiddenClasses(index, i, ClassesEnum.hidden)
			}
		}
	}

	private moveDownHidden() {
		if (this._countOfElements > 5) {
			let length = this.hiddenClassMapIndexes.get(ClassesEnum.hidden).length
			console.log('move ' + length)
			for (let i = length - 1; i >= 0; i--) {
				let index = this.hiddenClassMapIndexes.get(ClassesEnum.hidden)[i]
				this.changeDownHiddenClasses(index, i, ClassesEnum.hidden)
			}
		}
	}

	private changeUpHiddenClasses(index: number, i: number, className: string) {
		if (index <= 0) {
			this.getElement(index)?.classList.remove(className)
			this.getElement(this._countOfElements - 1)?.classList.add(className)

			this.hiddenClassMapIndexes.get(ClassesEnum.hidden).splice(i, 1, this._countOfElements - 1)
			return
		}

		this.getElement(index - 1)?.classList.add(className)
		this.getElement(index)?.classList.remove(className)
		this.hiddenClassMapIndexes.get(ClassesEnum.hidden).splice(i, 1, index - 1)
	}

	private changeDownHiddenClasses(index: number, i: number, className: string) {
		if (index >= this._countOfElements - 1) {
			this.getElement(index)?.classList.remove(className)
			this.getElement(0)?.classList.add(className)

			this.hiddenClassMapIndexes.get(ClassesEnum.hidden).splice(i, 1, 0)
			return
		}

		this.getElement(index)?.classList.remove(className)
		this.getElement(index + 1)?.classList.add(className)
		this.hiddenClassMapIndexes.get(ClassesEnum.hidden).splice(i, 1, index + 1)
	}

	private removeClass(index: number, bias: number, className: string) {
		this.getElement(this.setIndex(index, bias))?.classList.remove(className)
	}

	private AddClass(index: number, bias: number, className: string) {
		this.getElement(this.setIndex(index, bias))?.classList.add(className)
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

	private setClassedForTwoElements() {
		this.getElement(0).classList.add(ClassesEnum.selected)
		this.getElement(1).classList.add(ClassesEnum.firstNext)
	}

	private setClassesDictionaryForTwoElements() {
		this.classMapIndexes.set(ClassesEnum.selected, 0)
		this.classMapIndexes.set(ClassesEnum.firstNext, 1)
	}

	private setClassesForThreeElements() {
		this.getElement(0).classList.add(ClassesEnum.firstPrev)
		this.getElement(1).classList.add(ClassesEnum.selected)
		this.getElement(2).classList.add(ClassesEnum.firstNext)
	}

	private setClassesDictionaryForThreeElements() {
		this.classMapIndexes.set(ClassesEnum.firstPrev, 0)
		this.classMapIndexes.set(ClassesEnum.selected, 1)
		this.classMapIndexes.set(ClassesEnum.firstNext, 2)
	}

	private setClassesForFourElements() {
		this.getElement(0).classList.add(ClassesEnum.secondPrev)
		this.getElement(1).classList.add(ClassesEnum.firstPrev)
		this.getElement(2).classList.add(ClassesEnum.selected)
		this.getElement(3).classList.add(ClassesEnum.firstNext)
	}

	private setClassesDictionaryForFourElements() {
		this.classMapIndexes.set(ClassesEnum.secondPrev, 0)
		this.classMapIndexes.set(ClassesEnum.firstPrev, 1)
		this.classMapIndexes.set(ClassesEnum.selected, 2)
		this.classMapIndexes.set(ClassesEnum.firstNext, 3)
	}

	private setClassesForFiveElements() {
		this.setClassesForFourElements()
		this.getElement(4).classList.add(ClassesEnum.secondNext)
	}

	private setClassesDictionaryForFiveElements() {
		this.setClassesDictionaryForFourElements()
		this.classMapIndexes.set(ClassesEnum.secondNext, 4)
	}

	private setClassesForMoreThanFiveElements() {
		this.setClassesForFiveElements()

		for (let i = 5; i < this._countOfElements; i++) {
			this.getElement(i)?.classList.add(ClassesEnum.hidden)
			this.hiddenClassMapIndexes.get(ClassesEnum.hidden).push(i)
		}

		console.log(this.hiddenClassMapIndexes.get(ClassesEnum.hidden))
	}

	// updateClassesAfterAdding(countOfElements: number) {
	// 	this.CountOfElements = countOfElements
	// 	switch (this._countOfElements) {
	// 		case 0:
	// 		case 1:
	// 		case 2:
	// 		case 3:
	// 		case 4:
	// 		case 5:
	// 			break
	// 		case 6:
	// 			this.hiddenClassMapIndexes.get(ClassesEnum.hidden).push(this._countOfElements - 1)
	// 			this.getElement(this._countOfElements - 1)?.classList.add('hidden')
	// 			break
	// 		default:
	// 			this.hiddenClassMapIndexes.get(ClassesEnum.hidden).push(this._countOfElements - 1)
	// 			this.getElement(this._countOfElements - 1)?.classList.add('first-next')
	// 			break
	// 	}
	// }
}

export const enum ClassesEnum {
	selected = 'selected',
	firstPrev = 'first-prev',
	firstNext = 'first-next',
	secondPrev = 'second-prev',
	secondNext = 'second-next',
	hidden = 'hidden',
}
