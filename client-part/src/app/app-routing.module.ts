import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainPageComponent } from './landing/main-page/main-page.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductCardComponent } from './product-card/product-card.component'
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component'
import { LoginFormComponent } from './login-form/login-form.component'
import { ProfileComponent } from './profile/profile.component'
import { AdminOrdersListComponent } from './admin-orders-list/admin-orders-list.component'
import { ListContainerComponent } from './list-container/list-container.component'
import { EditOrderComponent } from './edit-order/edit-order.component'
import { authGuard } from './guards/auth.guard'
import { ProductComponent } from './product/product.component'

const routes: Routes = [
	{ path: '', component: MainPageComponent },
	{ path: 'products', component: ProductListComponent },
	{ path: 'products/:id', component: ProductCardComponent },
	{ path: 'orders', component: CustomerOrdersComponent },
	{ path: 'login', component: LoginFormComponent },
	{ path: 'profile', component: ProfileComponent },
	{
		path: 'admin',
		component: AdminOrdersListComponent,
		children: [
			{ path: 'active-orders', component: ListContainerComponent },
			{ path: 'completed-orders', component: ListContainerComponent },
			{ path: 'products', component: ProductListComponent },
		],
	},
	{ path: 'admin/orders/:id', component: EditOrderComponent },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
