import { Injectable } from '@angular/core'
import { IProduct } from '../interfaces/product.interface'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	private product: IProduct[] = []

	constructor() {
		this.product = [
			{
				id: 'asdfasf',
				name: 'Бейсболка Промо',
				description:
					'Отличный вариант для масштабных промоакций. Легкий материал, востребованные промо цвета. Удобная застежка-липучка',
				code: 'Б100-320E',
				newPrice: 260,
				oldPrice: 400,
				print: ['Шелкография', 'Шелкотрансферная печать', 'Печать флексом, флоком', 'DTF печать', 'Вышивка'],
				productColors: [
					{
						id: '1',
						value: '#33ff00',
						frontSmallUrl: '../../assets/caps/front.png',
						leftSmallUrl: '../../assets/caps/left.png',
						bottomSmallUrl: '../../assets/caps/back.png',
						rightSmallUrl: '../../assets/caps/right.png',
					},
					{
						id: '2',
						value: '#ff0000',
						frontSmallUrl: '../../assets/caps/red-front.png',
						leftSmallUrl: '../../assets/caps/red-left.png',
						bottomSmallUrl: '../../assets/caps/red-back.png',
						rightSmallUrl: '../../assets/caps/red-right.png',
					},
					{
						id: '3',
						value: '#002cff',
						frontSmallUrl: '../../assets/caps/front.png',
						leftSmallUrl: '../../assets/caps/left.png',
						bottomSmallUrl: '../../assets/caps/back.png',
						rightSmallUrl: '../../assets/caps/right.png',
					},
					{
						id: '4',
						value: '#ff00f3',
						frontSmallUrl: '../../assets/caps/front.png',
						leftSmallUrl: '../../assets/caps/left.png',
						bottomSmallUrl: '../../assets/caps/back.png',
						rightSmallUrl: '../../assets/caps/right.png',
					},
					{
						id: '5',
						value: '#002cff',
						frontSmallUrl: '../../assets/caps/front.png',
						leftSmallUrl: '../../assets/caps/left.png',
						bottomSmallUrl: '../../assets/caps/back.png',
						rightSmallUrl: '../../assets/caps/right.png',
					},
					{
						id: '6',
						value: '#e27a10',
						frontSmallUrl: '../../assets/caps/front.png',
						leftSmallUrl: '../../assets/caps/left.png',
						bottomSmallUrl: '../../assets/caps/back.png',
						rightSmallUrl: '../../assets/caps/right.png',
					},
				],

				productProps: [
					{
						id: 1,
						name: 'Тип полотна',
						value: 'Поплин',
					},
					{
						id: 1,
						name: 'Плотность',
						value: '130 гр/м²',
					},
					{
						id: 1,
						name: 'Состав',
						value: '100% хлопок',
					},
					{
						id: 1,
						name: 'Упаковка',
						value: 'Индивидуальная',
					},
					{
						id: 1,
						name: 'Размер',
						value: '57',
					},
					{
						id: 1,
						name: 'Тип полотна',
						value: 'Поплин',
					},
					{
						id: 1,
						name: 'Тип полотна',
						value: 'Поплин',
					},
				],
			},
			{
				id: 'asvlkxcv',
				name: 'Бейсболка Промо',
				description:
					'Отличный вариант для масштабных промоакций. Легкий материал, востребованные промо цвета. Удобная застежка-липучка',
				code: 'Б100-320К',
				newPrice: 260,
				oldPrice: 400,
				print: ['Шелкография', 'Шелкотрансферная печать', 'Печать флексом, флоком', 'DTF печать', 'Вышивка'],
				productColors: [
					{
						id: '1',
						value: '#33ff00',
						frontSmallUrl: '../../assets/caps/front.png',
						leftSmallUrl: '../../assets/caps/left.png',
						bottomSmallUrl: '../../assets/caps/back.png',
						rightSmallUrl: '../../assets/caps/right.png',
					},
					{
						id: '2',
						value: '#ff0000',
						frontSmallUrl: '../../assets/caps/red-front.png',
						leftSmallUrl: '../../assets/caps/red-left.png',
						bottomSmallUrl: '../../assets/caps/red-back.png',
						rightSmallUrl: '../../assets/caps/red-right.png',
					},
					{
						id: '3',
						value: '#002cff',
						frontSmallUrl: '../../assets/caps/front.png',
						leftSmallUrl: '../../assets/caps/left.png',
						bottomSmallUrl: '../../assets/caps/back.png',
						rightSmallUrl: '../../assets/caps/right.png',
					},
					{
						id: '4',
						value: '#ff00f3',
						frontSmallUrl: '../../assets/caps/front.png',
						leftSmallUrl: '../../assets/caps/left.png',
						bottomSmallUrl: '../../assets/caps/back.png',
						rightSmallUrl: '../../assets/caps/right.png',
					},
					{
						id: '5',
						value: '#002cff',
						frontSmallUrl: '../../assets/caps/front.png',
						leftSmallUrl: '../../assets/caps/left.png',
						bottomSmallUrl: '../../assets/caps/back.png',
						rightSmallUrl: '../../assets/caps/right.png',
					},
					{
						id: '6',
						value: '#e27a10',
						frontSmallUrl: '../../assets/caps/front.png',
						leftSmallUrl: '../../assets/caps/left.png',
						bottomSmallUrl: '../../assets/caps/back.png',
						rightSmallUrl: '../../assets/caps/right.png',
					},
				],

				productProps: [
					{
						id: 1,
						name: 'Тип полотна',
						value: 'Поплин',
					},
					{
						id: 1,
						name: 'Плотность',
						value: '130 гр/м²',
					},
					{
						id: 1,
						name: 'Состав',
						value: '100% хлопок',
					},
					{
						id: 1,
						name: 'Упаковка',
						value: 'Индивидуальная',
					},
					{
						id: 1,
						name: 'Размер',
						value: '57',
					},
					{
						id: 1,
						name: 'Тип полотна',
						value: 'Поплин',
					},
					{
						id: 1,
						name: 'Тип полотна',
						value: 'Поплин',
					},
				],
			},
		]
	}

	getAll(): Observable<IProduct[]> {
		return new Observable((s) => {
			s.next(this.product)
		})
	}

	getById(id: string | null): Observable<IProduct> {
		return new Observable((s) => {
			s.next(this.product.find((p) => p.id == id))
		})
	}

	getByVendor(vendor: string): Observable<IProduct> {
		return new Observable((s) => s.next(this.product.find((p) => p.code === vendor)))
	}
}
