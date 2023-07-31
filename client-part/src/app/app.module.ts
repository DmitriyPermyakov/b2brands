import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { IntroPageComponent } from './landing/intro-page/intro-page.component'
import { WorkingEasyComponent } from './landing/working-easy/working-easy.component'
import { WorkInRussiaComponent } from './landing/work-in-russia/work-in-russia.component'
import { PartnersComponent } from './landing/partners/partners.component'
import { ProductCardComponent } from './product-card/product-card.component'
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component'
import { QuantityComponent } from './quantity/quantity.component'
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { MobileBackgroundLineComponent } from './mobile-background-line/mobile-background-line.component'
import { CustomerOrderComponent } from './customer-order/customer-order.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductComponent } from './product/product.component'
import { MainPageComponent } from './landing/main-page/main-page.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { gettingProductReducer } from './store/products/products.reducer'
import { GettingProductEffect } from './store/products/products.effect'
import { orderItemReducer } from './store/orders/order-item.reducer'

@NgModule({
	declarations: [
		AppComponent,
		IntroPageComponent,
		WorkingEasyComponent,
		WorkInRussiaComponent,
		PartnersComponent,
		ProductCardComponent,
		CustomerOrdersComponent,
		QuantityComponent,
		NavBarComponent,
		MobileBackgroundLineComponent,
		CustomerOrderComponent,
		ProductListComponent,
		ProductComponent,
		MainPageComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		StoreModule.forRoot({ products: gettingProductReducer, orderItems: orderItemReducer }),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
		EffectsModule.forRoot([GettingProductEffect]),
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
