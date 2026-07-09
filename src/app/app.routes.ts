import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: 'login',
        loadComponent:()=>import('./components/auth/login/login').then(m=>m.Login),
        pathMatch:'full'
    },
    {
        path: 'forget-password',
        loadComponent:()=>import('./components/auth/forget-password/forget-password').then(m=>m.ForgetPassword),
        pathMatch:'full'
    },
    {
        path: '',
        loadComponent:()=>import('./components/dashboard/dashboard').then(m=>m.Dashboard),
        pathMatch:'full'
    },
    {
        path: 'dashboard',
        loadComponent:()=>import('./components/dashboard/dashboard').then(m=>m.Dashboard),
        pathMatch:'full'
    },
    {
        path: 'agents',
        loadComponent:()=>import('./components/agents/agents').then(m=>m.Agents),
        pathMatch:'full'
    },
    {
        path: 'orders',
        loadComponent:()=>import('./components/orders/orders').then(m=>m.Orders),
        pathMatch:'full'
    },
    {
        path: 'properties',
        loadComponent:()=>import('./components/properties/properties').then(m=>m.Properties),
        pathMatch:'full'
    },
    {
        path: 'settings',
        loadComponent:()=>import('./components/settings/settings').then(m=>m.Settings),
        pathMatch:'full'
    },
    {
        path: 'users',
        loadComponent:()=>import('./components/users/users').then(m=>m.Users),
        pathMatch:'full'
    },
    {
        path: '**',
        loadComponent:()=>import('./components/notfound/notfound').then(m=>m.Notfound),
        pathMatch:'full'
    },

];
