import { Component, ElementRef, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
import { IProductColor } from '../interfaces/productColor.interface'
import { UploadImageService } from '../services/upload-image.service'
import { HttpEventType } from '@angular/common/http'
import { Observable, catchError, of } from 'rxjs'

@Component({
	selector: 'app-image-block',
	templateUrl: './image-block.component.html',
	styleUrls: ['./image-block.component.css'],
})
export class ImageBlockComponent {
	@Input() productColor: IProductColor

	public uploading: boolean = false
	public inputDisabled: boolean = true

	constructor(private uploadImageService: UploadImageService) {}
	public chooseImage(input) {
		input.click()
	}

	public enableInput() {
		this.inputDisabled = false
	}

	public cancel() {
		this.uploading = false
		this.inputDisabled = true
	}

	public uploadImage(files, name) {
		console.log('input changes')
		this.uploading = true
		this.uploadImageService
			.uploadImage(files, name)
			.pipe(catchError((error) => of(new Error(error))))
			.subscribe((event) => {
				console.log(event)
				this.productColor[name] = event
				console.log(this.productColor)
				// if (event.type === HttpEventType.Response) {
				// 	this.productColor[name] = event.body.url
				// 	console.log(event.body.url)
				// 	this.uploading = false
				// }
			})
	}
}