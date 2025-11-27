// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [publicGuard], // Solo accesible si NO está autenticado
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'feed',
    canActivate: [authGuard], // Protegido - requiere autenticación
    loadComponent: () => import('./features/home/pages/feed/feed').then(m => m.FeedComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard], // Protegido - requiere autenticación
    loadChildren: () => import('./features/profile/profile.routes').then(m => m.profileRoutes)
  },
  {
    path: 'friends',
    canActivate: [authGuard], // Protegido - requiere autenticación
    loadChildren: () => import('./features/friends/friends.routes').then(m => m.friendsRoutes)
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];