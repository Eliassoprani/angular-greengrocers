import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Service } from '../services/app.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit, OnDestroy {

  total: number = 0;
  items: { item: Item, quantity: number }[] = [];
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
    this.items.forEach(item => {
      this.total += item.item.price * item.quantity;
    });
  }
}
