import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ClientProductListComponent } from './client-product-list/client-product-list.component';
import { ClientProductCardComponent } from './client-product-card/client-product-card.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'products', component: ClientProductListComponent },
  { path: 'products/:id', component: ClientProductCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
