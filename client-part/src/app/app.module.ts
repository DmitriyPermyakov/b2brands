import { NgModule } from '@angular/core';
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
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
