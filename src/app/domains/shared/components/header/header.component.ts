// External dependencies
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, CartComponent, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  drawerIsOpen = signal(false);

  private cartService = inject(CartService);

  cart = this.cartService.items;
  total = this.cartService.total;

  closeDrawer() {
    this.drawerIsOpen.set(false);
  }

  openDrawer() {
    this.drawerIsOpen.set(true);
  }
}
