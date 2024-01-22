// External dependencies
import { Component, type OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Internal dependencies
import { ProductComponent } from '../../components/product/product.component';
import { HeaderComponent } from '@/shared/components/header/header.component';

import type { Product } from '@/shared/models/product.model';
import { CartService } from '@/shared/services/cart.service';
import { ProductService } from '@/shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  products = signal<Product[]>([]);

  private cartService = inject(CartService);
  private productService = inject(ProductService);

  ngOnInit() {
    // TODO: Investigate why I'm not allowed to set a signal inside the next function
    this.productService.getProducts().subscribe({
      next: data => {
        const items = data.map(x => ({
          ...x,
          images: x.images.map(a => a.replace(/\["(.*)"]/, '$1')),
        }));

        this.products.set(items);
      },
      error: error => {
        console.log(error);
      },
    });

    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => {
        // normalize data

        const items = (data as Product[]).map(x => ({
          ...x,
          images: x.images.map(a => a.replace(/\["(.*)"]/, '$1')),
        }));

        this.products.set(items);
      })
      .catch(error => {
        console.log(error);
      });
  }

  addToCard(product: Product): void {
    this.cartService.add(product);
  }
}
