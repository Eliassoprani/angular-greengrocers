import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { StoreComponent } from './store/store.component';
const routes: Routes = [
  {
    path: 'checkout',
    component: CartComponent,
  },
  {
    path: 'store',
    component: StoreComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }