import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

export const authGuard: CanActivateFn = (route, state) => {
	const auth = inject(AuthService)
	const router = inject(Router)
	if (auth.IsAuthenticated) return true
	else {
		router.navigate(['/'])
		// if (auth.isRefreshTokenValid) {
		// 	auth.refreshToken().subscribe(() => {
		// 		if (auth.IsAuthenticated) router.navigate(['/admin/active-orders'])
		// 		return true
		// 	})
		// } else {
		// 	router.navigate(['/'])
		// 	auth.logout()
		// 	return false
		// }
	}
	return false
}
