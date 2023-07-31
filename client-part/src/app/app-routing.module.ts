import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainPageComponent } from './landing/main-page/main-page.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductCardComponent } from './product-card/product-card.component'
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component'

const routes: Routes = [
	{ path: '', component: MainPageComponent },
	{ path: 'products', component: ProductListComponent },
	{ path: 'products/:id', component: ProductCardComponent },
	{ path: 'orders', component: CustomerOrdersComponent },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
