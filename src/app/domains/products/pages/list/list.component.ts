// External dependencies
import type { OnChanges, SimpleChanges } from '@angular/core';
import { Component, type OnInit, inject, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Internal dependencies
import { ProductComponent } from '@/products/components/product/product.component';
import { HeaderComponent } from '@/shared/components/header/header.component';

import type { Product } from '@/shared/models/product.model';
import { CartService } from '@/shared/services/cart.service';
import { ProductService } from '@/shared/services/product.service';
import type { Category } from '@/shared/models/category.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    HeaderComponent,
    RouterLinkWithHref,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit, OnChanges {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  @Input()
  categoryId?: string;

  private cartService = inject(CartService);
  private productService = inject(ProductService);

  private async getProducts(category?: string) {
    const url = new URL('https://api.escuelajs.co/api/v1/products');

    if (category) {
      url.searchParams.append('categoryId', category.toString());
    }

    const response = await fetch(url.toString());
    const data: Product[] = await response.json();

    const items = data.map(x => ({
      ...x,
      images: x.images.map(a => a.replace(/\["(.*)"]/, '$1')),
    }));

    return items;
  }

  private async getCategories() {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories');
    const data: Category[] = await response.json();

    return data;
  }

  ngOnInit() {
    this.getCategories().then(this.categories.set);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const categoryIdChange = changes['categoryId'];

    if (categoryIdChange) {
      this.getProducts(categoryIdChange.currentValue).then(this.products.set);
    }
  }

  addToCard(product: Product): void {
    this.cartService.add(product);
  }
}
