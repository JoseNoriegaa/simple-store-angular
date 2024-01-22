// External dependencies
import { Injectable, computed, signal } from '@angular/core';

// Internal dependencies
import type { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items = signal<Product[]>([]);

  total = computed(() =>
    this.items().reduce((acct, item) => acct + item.price, 0)
  );

  constructor() {}

  add(product: Product) {
    this.items.update(prevState => [...prevState, product]);
  }

  remove(id: number) {
    this.items.update(prevState => prevState.filter(x => x.id !== id));
  }

  removeByIndex(index: number) {
    this.items.update(prevState => prevState.filter((_, idx) => idx !== index));
  }

  update(id: number, updatedProduct: Product) {
    this.items.update(prevState =>
      prevState.map(item => {
        if (item.id === id) {
          return updatedProduct;
        }

        return item;
      })
    );
  }

  updateById(index: number, updatedProduct: Product) {
    this.items.update(prevState =>
      prevState.map((item, idx) => {
        if (idx === index) {
          return updatedProduct;
        }

        return item;
      })
    );
  }
}
