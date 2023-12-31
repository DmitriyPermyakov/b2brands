import { ElementRef } from '@angular/core'
import { Observable, Subject, fromEvent, map, throttleTime } from 'rxjs'

export class Scroller {
	public scroll$: Observable<any>
	public selectedItemChanged: Subject<string> = new Subject()

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

	public get Selected() {
		return this._classIndexMap.get(ClassesEnum.selected)
	}

	public get SelectedElementAttribute(): string {
		return this.getElement(this._classIndexMap.get(ClassesEnum.selected)).getAttribute('data-value')
	}

	private set ScrollingClass(value: string) {
		if (value === '' || value === null || value === undefined) {
			console.error('scrolling class not setted')
		}

		this._scrollingClass = value
	}

	private _countOfElements: number
	private _selected: number = 0
	private _parentElement: ElementRef
	private _scrollingClass: string = ''

	private _addedElementValueAttribut: string = ''

	private _indexClassMap: Map<number, string> = new Map()
	private _classIndexMap: Map<string, number> = new Map()
	private _classes = [
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
		this.scroll$ = fromEvent(parentElement.nativeElement, 'wheel').pipe(
			throttleTime(200),
			map((e) => e)
		)
	}

	public initScroller(countOfElements: number) {
		this.CountOfElements = countOfElements
		this.setClassesDictionary()
		this.setClasses()
		this.selectedItemChanged.next(this.SelectedElementAttribute)
	}

	//#region setting classes

	private setClasses() {
		switch (this._countOfElements) {
			case 0:
				break
			case 1:
				this.getElement(0).classList.add(ClassesEnum.selected)
				this.selectedItemChanged.next(this.SelectedElementAttribute)
				break
			case 2:
				this.setClassedForTwoElements()
				this.selectedItemChanged.next(this.SelectedElementAttribute)
				break
			case 3:
				this.setClassesForThreeElements()
				this.selectedItemChanged.next(this.SelectedElementAttribute)
				break
			case 4:
				this.setClassesForFourElements()
				this.selectedItemChanged.next(this.SelectedElementAttribute)
				break
			case 5:
				this.setClassesForFiveElements()
				this.selectedItemChanged.next(this.SelectedElementAttribute)
				break
			default:
				this.setClassesForMoreThanFiveElements()
				this.selectedItemChanged.next(this.SelectedElementAttribute)
				break
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
		for (let i = 0; i < 5; i++) this.getElement(i)?.classList.add(this._classes[i])
	}

	private setClassesForMoreThanFiveElements() {
		this.setClassesForFiveElements()

		for (let i = 5; i < this._countOfElements; i++) {
			this.getElement(i)?.classList.add(ClassesEnum.hidden)
		}
	}

	//#endregion end setting classes

	public onScroll(event: WheelEvent): number {
		if (this._countOfElements < 1) return -1
		if (this._countOfElements < 2) return 0
		if (event.deltaY < 0) {
			this.onScrollUp()
			return this._classIndexMap.get(ClassesEnum.selected)
		}

		if (event.deltaY > 0) {
			this.onScrollDown()
			return this._classIndexMap.get(ClassesEnum.selected)
		}

		return -1
	}

	public onScrollUp() {
		if (this._countOfElements < 2) return

		this.moveClassesUp()
		this.selectedItemChanged.next(this.SelectedElementAttribute)
	}

	public onScrollDown() {
		if (this._countOfElements < 2) return

		this.moveClassesDown()
		this.selectedItemChanged.next(this.SelectedElementAttribute)
	}

	public addItem(countOfElements: number) {
		this.CountOfElements = countOfElements
		switch (this._countOfElements) {
			case 0:
				break
			case 1:
				this.getElement(0).classList.add(ClassesEnum.selected)
				this.updateClassesDictionary()
				this.selectedItemChanged.next(this.SelectedElementAttribute)
				break
			case 2:
				this.placeElement(ClassesEnum.firstPrev, ClassesEnum.selected)
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

	public removeItem(index: number, countOfElements: number): void {
		this._countOfElements = countOfElements
		//нужно оставить update class dictionary, т.к. нужно откуда-то брать индекс удаляемого элемента
		// не нужен только индекс класса selected
		this.clearDictionary()
		this.updateClassesDictionary()
		switch (this._countOfElements) {
			case 0:
				break
			case 1:
				this.getElement(this._classIndexMap.get(ClassesEnum.firstPrev)).classList.remove(ClassesEnum.firstPrev)
				this.getElement(this._classIndexMap.get(ClassesEnum.firstPrev)).classList.add(ClassesEnum.selected)
				break
			case 2:
				this.getElement(this._classIndexMap.get(ClassesEnum.firstNext)).classList.remove(ClassesEnum.firstNext)
				this.getElement(this._classIndexMap.get(ClassesEnum.firstNext)).classList.add(ClassesEnum.selected)
				break
			case 3:
				this.getElement(this._classIndexMap.get(ClassesEnum.secondNext)).classList.remove(ClassesEnum.secondNext)
				this.getElement(this._classIndexMap.get(ClassesEnum.secondNext)).classList.add(ClassesEnum.firstNext)
				this.getElement(this._classIndexMap.get(ClassesEnum.firstNext)).classList.remove(ClassesEnum.firstNext)
				this.getElement(this._classIndexMap.get(ClassesEnum.firstNext)).classList.add(ClassesEnum.selected)
				break
			case 4:
				this.getElement(this._classIndexMap.get(ClassesEnum.secondPrev)).classList.remove(ClassesEnum.secondPrev)
				this.getElement(this._classIndexMap.get(ClassesEnum.secondPrev)).classList.add(ClassesEnum.firstPrev)
				this.getElement(this._classIndexMap.get(ClassesEnum.firstPrev)).classList.remove(ClassesEnum.firstPrev)
				this.getElement(this._classIndexMap.get(ClassesEnum.firstPrev)).classList.add(ClassesEnum.selected)
				break
			case 5:
				this.getElement(this._classIndexMap.get(ClassesEnum.hidden)).classList.remove(ClassesEnum.hidden)
				this.getElement(this._classIndexMap.get(ClassesEnum.hidden)).classList.add(ClassesEnum.secondNext)
				this.getElement(this._classIndexMap.get(ClassesEnum.secondNext)).classList.remove(ClassesEnum.secondNext)
				this.getElement(this._classIndexMap.get(ClassesEnum.secondNext)).classList.add(ClassesEnum.firstNext)
				this.getElement(this._classIndexMap.get(ClassesEnum.firstNext)).classList.remove(ClassesEnum.firstNext)
				this.getElement(this._classIndexMap.get(ClassesEnum.firstNext)).classList.add(ClassesEnum.selected)
				break
			default:
				let secondNextIndex = this._classIndexMap.get(ClassesEnum.secondNext)

				if (secondNextIndex === this._countOfElements - 1) {
					this.getElement(0).classList.remove(ClassesEnum.hidden)
					this.getElement(0).classList.add(ClassesEnum.secondNext)
					this.getElement(secondNextIndex).classList.remove(ClassesEnum.secondNext)
					this.getElement(secondNextIndex).classList.add(ClassesEnum.firstNext)
					this.getElement(this._classIndexMap.get(ClassesEnum.firstNext)).classList.remove(ClassesEnum.firstNext)
					this.getElement(this._classIndexMap.get(ClassesEnum.firstNext)).classList.add(ClassesEnum.selected)
				} else {
					this.getElement(secondNextIndex + 1).classList.remove(ClassesEnum.hidden)
					this.getElement(secondNextIndex + 1).classList.add(ClassesEnum.secondNext)
					this.getElement(secondNextIndex).classList.remove(ClassesEnum.secondNext)
					this.getElement(secondNextIndex).classList.add(ClassesEnum.firstNext)
					this.getElement(this._classIndexMap.get(ClassesEnum.firstNext)).classList.remove(ClassesEnum.firstNext)
					this.getElement(this._classIndexMap.get(ClassesEnum.firstNext)).classList.add(ClassesEnum.selected)
				}
				break
		}

		this.clearDictionary()
		this.updateClassesDictionary()
	}

	public scrollToAdded() {
		let i = this._classIndexMap.get(ClassesEnum.selected)
		let interval = setInterval(() => {
			this.onScrollDown()
			i++
			if (i > this._countOfElements - 1) i = 0
			if (this.getElement(i).getAttribute('data-value') === this._addedElementValueAttribut) {
				clearInterval(interval)
				this.selectedItemChanged.next(this.SelectedElementAttribute)
				return
			}
		}, 100)
	}

	private clearDictionary() {
		this._indexClassMap.clear()
		this._classIndexMap.clear()
	}

	private placeElement(newElemClassName: string, oldElemClassName: string) {
		this.getElement(this._countOfElements - 1).classList.add(newElemClassName)
		this._addedElementValueAttribut = this.getElement(this._countOfElements - 1).getAttribute('data-value')
		let oldItemIndex = this._classIndexMap.get(oldElemClassName)
		//если элемент является первым в списке, то новый элемент, который должен быть добавлен перед ним, просто добавляется в конец
		if (oldItemIndex !== 0) {
			let element = this.getElement(oldItemIndex)
			this._parentElement.nativeElement.insertBefore(this.getElement(this._countOfElements - 1), element)
		}
		this.updateClassesDictionary()
	}

	public updateClassesDictionary() {
		for (let index = 0; index <= this._countOfElements - 1; index++) {
			let className = this.getElement(index).className.replace(this._scrollingClass, '').trim()
			this._indexClassMap.set(index, className)
			this._classIndexMap.set(className, index)
		}
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

	//#region setting dictionary

	private setClassesDictionary() {
		switch (this._countOfElements) {
			case 0:
				break
			case 1:
				this._indexClassMap.set(0, ClassesEnum.selected)
				this._classIndexMap.set(ClassesEnum.selected, 0)
				break
			case 2:
				this.setDictionaryForTwoElements()
				break
			case 3:
				this.setDictionaryForThreeElements()
				break
			case 4:
				this.setDictionaryForFourElements()
				break
			case 5:
				this.setDictionaryForFiveElements()
				break
			default:
				this.setDictionaryForMoreThanFiveElements()
				break
		}
	}

	private setDictionaryForTwoElements() {
		this._indexClassMap.set(0, ClassesEnum.firstPrev)
		this._classIndexMap.set(ClassesEnum.firstPrev, 0)
		this._indexClassMap.set(1, ClassesEnum.selected)
		this._classIndexMap.set(ClassesEnum.selected, 1)
	}

	private setDictionaryForThreeElements() {
		this.setDictionaryForTwoElements()
		this._indexClassMap.set(2, ClassesEnum.firstNext)
		this._classIndexMap.set(ClassesEnum.firstNext, 2)
	}

	private setDictionaryForFourElements() {
		this.setDictionaryForThreeElements()
		this._indexClassMap.set(3, ClassesEnum.secondNext)
		this._classIndexMap.set(ClassesEnum.secondNext, 3)
	}

	private setDictionaryForFiveElements() {
		for (let i = 0; i < this._countOfElements - 1; i++) {
			this._indexClassMap.set(i, this._classes[i])
			this._classIndexMap.set(this._classes[i], i)
		}
	}

	private setDictionaryForMoreThanFiveElements() {
		this.setDictionaryForFiveElements()
		for (let i = 5; i < this._countOfElements; i++) {
			this._indexClassMap.set(i, ClassesEnum.hidden)
			this._classIndexMap.set(ClassesEnum.hidden, i)
		}
	}

	//#endregion
}

export const enum ClassesEnum {
	selected = 'selected',
	firstPrev = 'first-prev',
	firstNext = 'first-next',
	secondPrev = 'second-prev',
	secondNext = 'second-next',
	hidden = 'hidden',
}
