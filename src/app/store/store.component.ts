import { Component, OnInit } from '@angular/core';
import { Service } from '../services/app.service';
import { Item } from '../models/item';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit{
  constructor(private readonly Service: Service) { }

  allItems: Item[] = [];
  filteredItems: Item[] = [];
  fruits: Item[] = []
  vegetables: Item[] = []
  async ngOnInit() {
    this.fruits = await this.Service.fruits;
    this.vegetables = await this.Service.vegetables;
    this.allItems = this.fruits.concat(this.vegetables)
    this.showAll();
    console.log(this.allItems);
    
  }

  showFruits() {
    this.filteredItems = this.fruits;
  }

  showVegetables() {
    this.filteredItems = this.vegetables;
  }

  showAll() {
    this.filteredItems = this.allItems;
  }

  addItem( item: Item) {
    this.Service.addItem(item);
  }

  sortByName() {
    this.filteredItems.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  sortByPrice() {
    this.filteredItems.sort((a, b) => {
      return a.price - b.price;
    });
  }
}
