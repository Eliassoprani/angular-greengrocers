import { Component, EventEmitter, Input, Output } from '@angular/core';import { Item } from '../models/item';
@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.css']
})
export class StoreItemComponent {
  @Input('item') item: Item | null = null;
  @Output('add') add = new EventEmitter<Item>();

  toggleAdd() {
    if (!this.item) {
      throw new Error('cannot toggle complete on null');
    }
    this.add.emit({
      ...this.item,
    });
  }
}
