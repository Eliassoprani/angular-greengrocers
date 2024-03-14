import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../models/cartItem';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input('item') item: CartItem | null = null;
  @Output('add') add = new EventEmitter<CartItem>();
  @Output('remove') remove = new EventEmitter<CartItem>();

  toggleAdd() {
    if (!this.item) {
      throw new Error('cannot toggle complete on null');
    }
    this.add.emit({
      ...this.item,
    });
  }

  toggleRemove() {
    console.log('remove');
    
    if (!this.item) {
      throw new Error('cannot toggle complete on null');
    }
    this.remove.emit({
      ...this.item,
    });
  }
}
