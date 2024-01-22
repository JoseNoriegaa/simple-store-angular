// External dependencies
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

// Internal dependencies
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  @Input({ required: true })
  isOpen = false;

  private cartService = inject(CartService);

  cart = this.cartService.items;
  total = this.cartService.total;

  @Output()
  closeButtonClick = new EventEmitter<unknown>();

  closeButtonClickHandler() {
    this.closeButtonClick.emit();
  }
}
