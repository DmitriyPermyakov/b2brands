import { FormControl } from '@angular/forms'

export class PhoneValidator {
	static phoneValidator(formControl: FormControl): { [key: string]: boolean } {
		const patternWithPlus: RegExp = /^\+[0-9]{11}$/
		const patterWithoutPlus: RegExp = /^[0-9]{11}$/

		if (patternWithPlus.test(formControl.value) || patterWithoutPlus.test(formControl.value)) return null

		return { badPhoneNumber: true }
	}
}
