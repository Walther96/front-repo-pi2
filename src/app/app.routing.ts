import { Routes, CanActivate } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/signia/login/login.component';
import { LoginGuard } from './server/guards/login.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
      canActivateChild: [LoginGuard]
  }]},
  {
    path: '**',
    redirectTo: 'requerimientosalida'
  }
]
