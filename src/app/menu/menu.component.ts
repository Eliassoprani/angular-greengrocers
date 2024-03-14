import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Service } from '../services/app.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  
  total: number = 0;
  items: { item: Item, quantity: number }[] = [];
  itemsAdded: number = 0;
  private cartSubscription: Subscription | null = null;

  constructor(private readonly service: Service) { }

  ngOnInit(): void {
    this.items = this.service.cartItems;
    this.cartSubscription = this.service.getCartItemsChangedObservable().subscribe(() => {
      this.items = this.service.cartItems;
      this.calculateTotal();
    });
    this.calculateTotal();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  private calculateTotal(): void {
    this.total = 0;
    let added = 0;
    this.items.forEach(item => {
      this.total += item.item.price * item.quantity;
      added+= item.quantity;
    });
    this.itemsAdded = added;
  }
}
