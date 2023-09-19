import { Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
import { IProductColor } from '../interfaces/productColor.interface'
import { UploadImageService } from '../services/upload-image.service'
import { HttpEventType } from '@angular/common/http'

@Component({
	selector: 'app-image-block',
	templateUrl: './image-block.component.html',
	styleUrls: ['./image-block.component.css'],
})
export class ImageBlockComponent {
	@Input() productColor: IProductColor

	public uploading: boolean = false

	constructor(private uploadImageService: UploadImageService) {}
	public uploadImage(files, name) {
		this.uploading = true
		this.uploadImageService.uploadImage(files, name).subscribe(
			(event) => {
				console.log(event)
				this.productColor[name] = event
				console.log(this.productColor)
				// if (event.type === HttpEventType.Response) {
				// 	this.productColor[name] = event.body.url
				// 	console.log(event.body.url)
				// 	this.uploading = false
				// }
			},
			(error) => {
				this.productColor[name] = ''
				this.uploading = false
			}
		)
	}
}
