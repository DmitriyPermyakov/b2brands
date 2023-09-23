import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ILoginRequest } from '../interfaces/loginRequest.interface'
import { ILoginResponse } from '../interfaces/loginResponse.interface'
import { HttpClient } from '@angular/common/http'

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

	private _isAuthenticated: boolean
	public get IsAuthenticated(): boolean {
		return true
	}

	public set IsAuthenticated(value) {}

	public setToken(tokens: ILoginResponse): void {
		localStorage.setItem('accessToken', tokens.accessToken)
		localStorage.setItem('refreshToken', tokens.refreshToken)
	}

	public isRefreshTokenValid(): boolean {
		return !this.isTokenExpired(localStorage.getItem('refreshToken'))
	}

	login(loginRequest: ILoginRequest): Observable<ILoginResponse> {
		let url = ''
		// return this.http.post<ILoginResponse>(url, loginRequest)
		return new Observable<ILoginResponse>((observer) => {
			observer.next({ accessToken: 'asdfsf', refreshToken: 'asdfsafsafgdsfgd' })
		})
	}

	logout() {}

	refreshToken(): Observable<void> {
		return new Observable()
	}

	private isTokenExpired(token: string): boolean {
		if (!token) {
			return true
		}
		const exp = JSON.parse(atob(token.split('.')[1])).exp * 1000
		return new Date() > new Date(exp)
	}
}
