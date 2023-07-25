import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { WorkingEasyComponent } from './working-easy/working-easy.component';
import { WorkInRussiaComponent } from './work-in-russia/work-in-russia.component';
import { PartnersComponent } from './partners/partners.component';
import { ClientProductCardComponent } from './client-product-card/client-product-card.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { QuantitiComponent } from './quantiti/quantiti.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MobileBackgroundLineComponent } from './mobile-background-line/mobile-background-line.component';
import { ClientOrderComponent } from './client-order/client-order.component';
import { ClientProductListComponent } from './client-product-list/client-product-list.component';
import { ProductComponent } from './product/product.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    IntroPageComponent,
    WorkingEasyComponent,
    WorkInRussiaComponent,
    PartnersComponent,
    ClientProductCardComponent,
    ClientOrdersComponent,
    QuantitiComponent,
    NavBarComponent,
    MobileBackgroundLineComponent,
    ClientOrderComponent,
    ClientProductListComponent,
    ProductComponent,
    MainPageComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
