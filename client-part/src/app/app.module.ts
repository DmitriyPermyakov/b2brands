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
import { LoginFormComponent } from './login-form/login-form.component'
import { ProfileComponent } from './profile/profile.component'
import { AdminOrdersListComponent } from './admin-orders-list/admin-orders-list.component'
import { AdminOrderComponent } from './admin-order/admin-order.component'
import { ListContainerComponent } from './list-container/list-container.component'
import { AccountButtonsComponent } from './account-buttons/account-buttons.component'
import { EditOrderComponent } from './edit-order/edit-order.component'
import { PositionItemInfoComponent } from './position-item-info/position-item-info.component'
import { AddOrderItemComponent } from './add-order-item/add-order-item.component'
import { ImageSelectorComponent } from './image-selector/image-selector.component'
import { ProductPropertiesComponent } from './product-properties/product-properties.component'
import { InputWidthDirective } from './directives/input-width/input-width.directive'
import { ColorsListComponent } from './colors-list/colors-list.component'
import { PrintsListComponent } from './prints-list/prints-list.component'
import { ImageBlockComponent } from './image-block/image-block.component'
import { HttpClientModule } from '@angular/common/http'
import { MobileMenuBtnComponent } from './mobile-menu-btn/mobile-menu-btn.component'
import { ClickOutsideDirective } from './directives/click-outside.directive'
import { ClickTimerDirective } from './directives/click-timer.directive'
import { StoreModule } from '@ngrx/store'
import { reducers, metaReducers } from './store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment.development'
import { EffectsModule } from '@ngrx/effects'
import { ProductsEffects } from './store/effects/products.effects'
import * as fromProducts from './store/reducers/products.reducer'

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
		LoginFormComponent,
		ProfileComponent,
		AdminOrdersListComponent,
		AdminOrderComponent,
		ListContainerComponent,
		AccountButtonsComponent,
		EditOrderComponent,
		PositionItemInfoComponent,
		AddOrderItemComponent,
		ImageSelectorComponent,
		ProductPropertiesComponent,
		InputWidthDirective,
		ColorsListComponent,
		PrintsListComponent,
		ImageBlockComponent,
		MobileMenuBtnComponent,
		ClickOutsideDirective,
		ClickTimerDirective,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !environment.production }),
		environment.production ? StoreDevtoolsModule.instrument() : [],
		EffectsModule.forRoot([ProductsEffects]),
		// StoreModule.forFeature(fromProducts.productsFeatureKey, fromProducts.reducer),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
