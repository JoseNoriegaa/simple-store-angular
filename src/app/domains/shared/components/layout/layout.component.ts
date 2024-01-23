// External dependencies
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Internal dependencies
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
