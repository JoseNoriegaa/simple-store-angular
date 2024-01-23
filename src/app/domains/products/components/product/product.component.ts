// External dependencies
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

import type { Product } from '@/shared/models/product.model';
import { TimeAgoPipe } from '@/shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    UpperCasePipe,
    TimeAgoPipe,
    RouterLinkWithHref,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true })
  product!: Product;

  @Output()
  addToCard = new EventEmitter<Product>();

  addToCardHandler(): void {
    this.addToCard.emit(this.product);
  }
}
