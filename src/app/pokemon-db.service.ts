import { Injectable } from '@angular/core';
import { SetCard } from './models/all-models';

@Injectable({
  providedIn: 'root'
})
export class PokemonDbService {
  private _items: SetCard[];
  private keyLocal = 'sets';
  
  constructor() {
    this._items = JSON.parse(localStorage.getItem(this.keyLocal) || "[]");
  }

  get items(){
    return this._items.filter(x=>x);
  }
  create(item: SetCard): void {
    this._items.push(item);
    localStorage.setItem(this.keyLocal, JSON.stringify(this.items));
  }

  read(): SetCard[] {
    return this._items;
  }

  getByName(name: string){
      const index = this.items.findIndex((item) => item && item.name === name);
      if (index !== -1) {
        return this.items[index];
      }
      return {name, cards: []} as SetCard;
  }

  update(name: string, newItem: SetCard): void {
    const index = this.items.findIndex((item) => item.name === name);
    if (index !== -1) {
      this.items[index] = newItem;
      localStorage.setItem(this.keyLocal, JSON.stringify(this.items));
    }
  }

  delete(name: string): void {
    const index = this.items.findIndex((item) => item.name === name);
    if (index !== -1) {
      this._items.splice(index, 1);
      localStorage.setItem(this.keyLocal, JSON.stringify(this.items));
    }
  }
}
