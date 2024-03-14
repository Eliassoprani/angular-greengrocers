import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreItemComponent } from './store-item/store-item.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { TotalComponent } from './total/total.component'
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
@NgModule({
  declarations: [AppComponent, StoreComponent, CartComponent, StoreItemComponent, CartItemComponent, TotalComponent, MenuComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
