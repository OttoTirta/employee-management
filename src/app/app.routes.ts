import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { authGuard, noAuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: Home,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: Login,
        canActivate : [noAuthGuard]
    }
];
