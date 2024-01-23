// External dependencies
import type { Routes } from '@angular/router';

// Internal dependencies
import { NotFoundComponent } from '@/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@/shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('@/products/pages/list/list.component').then(
            module => module.ListComponent
          ),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('@/info/pages/product-detail/product-detail.component').then(
            module => module.ProductDetailComponent
          ),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
