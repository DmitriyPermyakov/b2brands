import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
	form: FormGroup

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			password: [{ value: '', disables: false }, Validators.required],
		})
	}

	onSubmit(form: FormGroup) {}
}
