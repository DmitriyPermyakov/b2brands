import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { WorkingEasyComponent } from './working-easy/working-easy.component';
import { WorkInRussiaComponent } from './work-in-russia/work-in-russia.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroPageComponent,
    WorkingEasyComponent,
    WorkInRussiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
