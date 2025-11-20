import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { FriendsPage } from './features/friends/pages/friends-page/friends-page';
import { VideosPage } from './features/videos/pages/videos-page/videos-page';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page';
import { Login } from './features/auth/pages/login/login';

export const routes: Routes = [
    { path: '', component : Login, title: 'SociAmigos'},
    { path: 'home', component : HomePage, title: 'SociAmigos'},
    { path: 'friends', component : FriendsPage, title: 'Amigos | SociAmigos'},
    { path: 'videos', component : VideosPage, title: 'Videos | SociAmigos'},
    { path: 'profile', component : ProfilePage, title: 'Videos | SociAmigos'},
    { path: '**', redirectTo : ''},
];
