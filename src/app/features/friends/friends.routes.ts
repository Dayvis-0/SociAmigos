import { Routes } from '@angular/router';

export const friendsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/friends-page/friends-page').then(m => m.FriendsPage)
  }
];