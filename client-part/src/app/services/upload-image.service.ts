import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development'

@Injectable({
	providedIn: 'root',
})
export class UploadImageService {
	constructor(private http: HttpClient) {}

	public uploadImage(files, name): Observable<any> {
		if (files.length == 0) return new Observable((observer) => observer.next(null))

		let file = <File>files.item(0)
		let formData = new FormData()
		formData.append('file', file, name)
		// return this.http.post<any>(`${environment.imageServeUrl}`, formData, { reportProgress: true, observe: 'events' })
		return new Observable((observer) =>
			observer.next(
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa-PiOTwEZRTToI-EcoC_1xj8QSHUeGdaQt1xjlYgXHRYHrhdqu5e9E-1NFmh5Fe5r9wI&usqp=CAU'
			)
		)
	}
}
