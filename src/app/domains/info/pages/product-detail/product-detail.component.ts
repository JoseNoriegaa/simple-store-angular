// External dependencies
import type { Product } from '@/shared/models/product.model';
import { CartService } from '@/shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { Component, signal, type OnInit, Input, inject } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  @Input()
  id?: string;

  product = signal<Product | null>(null);

  selectedImageIndex = signal(0);

  private cartService = inject(CartService);

  ngOnInit(): void {
    if (!this.id) return;

    fetch(`https://api.escuelajs.co/api/v1/products/${this.id}`)
      .then(res => res.json())
      .then(item => {
        this.product.set(item);
      })
      .catch(console.log);

    // TODO: investigate why .set function does not working inside the subscribe context
    // this.productService.getProduct(this.id!).subscribe({
    //   next: item => {
    //     console.log(item);

    //     this.product.set(item);
    //   },
    // });
  }

  setSelectedImageIndexHandler(index: number) {
    this.selectedImageIndex.set(index);
  }

  addToCardHandler() {
    const item = this.product();

    if (!item) return;

    this.cartService.add(item);
  }
}
