import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./orders/feature-form/container-form/container-form.component')
    }
];
