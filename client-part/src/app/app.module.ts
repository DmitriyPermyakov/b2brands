import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { WorkingEasyComponent } from './working-easy/working-easy.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroPageComponent,
    WorkingEasyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
