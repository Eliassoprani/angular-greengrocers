import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Service } from '../services/app.service';
import { CartItem } from '../models/cartItem';
import { Item } from '../models/item';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  items: { item: Item, quantity: number }[] = [];
  private cartSubscription: Subscription | null = null;

  @Input('item') item: Item | null = null;
  @Output('add') add = new EventEmitter<CartItem>();
  @Output('remove') remove = new EventEmitter<CartItem>();


  constructor(private readonly service: Service) { }

  ngOnInit(): void {
    this.items = this.service.cartItems;
    this.cartSubscription = this.service.getCartItemsChangedObservable().subscribe(() => {
      this.items = this.service.cartItems;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  addItem( item: CartItem) {
    console.log('add in cart comp');
    this.service.addItem(item.item);
  }

  removeItem( item: CartItem) {
    console.log('remove in cart comp');
    
    this.service.removeItem(item.item);
  }
}
