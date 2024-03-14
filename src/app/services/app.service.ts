import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Service {
  private cart: { [id: string]: { item: Item; quantity: number } } = {};
  private cartItemsChanged = new Subject<void>();

  constructor(private readonly http: HttpClient) {}

  getCartItemsChangedObservable(): Observable<void> {
    return this.cartItemsChanged.asObservable();
  }

  get cartItems(): { item: Item; quantity: number }[] {
    return Object.values(this.cart);
  }

  get fruits(): Promise<Item[]> {
    return firstValueFrom(
      this.http.get<Item[]>(
        'https://boolean-api-server.fly.dev/groceries?type=fruit'
      )
    );
  }

  get vegetables(): Promise<Item[]> {
    return firstValueFrom(
      this.http.get<Item[]>(
        'https://boolean-api-server.fly.dev/groceries?type=vegetable'
      )
    );
  }

  addItem(item: Item) {
    const itemId = item.id;
    if (this.cart[itemId]) {
      this.cart[itemId].quantity++;
    } else {
      this.cart[itemId] = { item: item, quantity: 1 };
    }
    console.log(this.cart);
    this.cartItemsChanged.next();
  }

  removeItem(item: Item) {
    const itemId = item.id;
    if (this.cart[itemId]) {
      this.cart[itemId].quantity--;
      if(this.cart[itemId].quantity === 0){
        delete this.cart[itemId]
      }
    }
    console.log(this.cart);
    this.cartItemsChanged.next();
  }
}
