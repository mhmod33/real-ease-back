import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('./components/auth/forget-password/forget-password').then(
        (m) => m.ForgetPassword,
      ),
  },
  {
    path: 'confirm-email',
    loadComponent: () =>
      import('./components/auth/confirm-email/confirm-email').then(
        (m) => m.ConfirmEmail,
      ),
  },
  {
    path: 'restore-password',
    loadComponent: () =>
      import('./components/auth/restore-password/restore-password').then(
        (m) => m.RestorePassword,
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/dashboard/dashboard').then((m) => m.Dashboard),
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'agents',
        loadComponent: () =>
          import('./components/agents/agents').then((m) => m.Agents),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./components/orders/orders').then((m) => m.Orders),
      },
      {
        path: 'properties',
        loadComponent: () =>
          import('./components/properties/properties').then((m) => m.Properties),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./components/settings/settings').then((m) => m.Settings),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./components/users/users').then((m) => m.Users),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./components/notfound/notfound').then((m) => m.Notfound),
      },
    ],
  },
];
