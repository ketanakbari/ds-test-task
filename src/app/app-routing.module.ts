import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {LayoutComponent} from './components/layout/layout.component';
import {AuthGuard} from './services/guards/auth.guard';
import {GuestGuard} from './services/guards/guest.guard';
import {NotFoundRouteComponent} from './components/not-found-route/not-found-route.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [GuestGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./components/layout/layout.module').then(m => m.LayoutModule)
      }
    ]
  },
  {path: '**', redirectTo: '404', pathMatch: 'full'},
  {
    path: '404',
    component: NotFoundRouteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
