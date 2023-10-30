import { AfterViewInit, Component, ElementRef, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
import { IProductColor } from '../interfaces/productColor.interface'
import { UploadImageService } from '../services/upload-image.service'
import { HttpEventType } from '@angular/common/http'
import { Observable, catchError, of } from 'rxjs'
import { AuthService } from '../services/auth.service'

@Component({
	selector: 'app-image-block',
	templateUrl: './image-block.component.html',
	styleUrls: ['./image-block.component.css'],
})
export class ImageBlockComponent implements AfterViewInit {
	@Input() productColor: IProductColor
	@Input() productsColorCount: number
	@Input() editable: boolean

	public uploading: boolean = false
	public inputDisabled: boolean = true

	constructor(private uploadImageService: UploadImageService, public authService: AuthService) {}
	ngAfterViewInit(): void {}
	public chooseImage(input) {
		input.click()
	}

	public enableInput() {
		if (this.productsColorCount < 1) return
		this.inputDisabled = false
	}
	public disableInput() {
		this.inputDisabled = true
	}

	public cancel() {
		this.uploading = false
		this.inputDisabled = true
	}

	public uploadImage(files, name) {
		this.uploading = true
		this.uploadImageService
			.uploadImage(files, name)
			.pipe(catchError((error) => of(new Error(error))))
			.subscribe((event) => {
				this.productColor[name] = event
				// if (event.type === HttpEventType.Response) {
				// 	this.productColor[name] = event.body.url
				// 	console.log(event.body.url)
				// 	this.uploading = false
				// }
			})
	}
}
