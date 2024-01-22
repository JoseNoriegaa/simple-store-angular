// External dependencies
import type { Routes } from '@angular/router';

// Internal dependencies
import { ListComponent } from './domains/products/pages/list/list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: ListComponent,
  },
];
