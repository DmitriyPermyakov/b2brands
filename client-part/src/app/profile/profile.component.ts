import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
	public editing: boolean = false
	form: FormGroup

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			name: [{ value: 'Alex', disabled: false }],
			lastName: [{ value: 'Polozov', disabled: false }],
			email: [{ value: 'polozov@gmail.com', disabled: false }],
			password: [{ value: 'password', disabled: true }],
			newPassword: [{ value: '', disabled: true }],
		})
	}

	toggleEdit() {
		this.editing = !this.editing
		if (this.editing) {
			this.form.controls['password'].enable()
			this.form.controls['newPassword'].enable()
		} else {
			this.form.controls['password'].disable()
			this.form.controls['newPassword'].disable()
		}
	}
}
