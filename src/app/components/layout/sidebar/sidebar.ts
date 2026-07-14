import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  icon: 'dashboard' | 'properties' | 'orders' | 'agents' | 'users';
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  readonly collapsed = signal(false);

  readonly navItems: NavItem[] = [
    { label: 'لوحة التحكم', route: '/dashboard', icon: 'dashboard' },
    { label: 'العقارات', route: '/properties', icon: 'properties' },
    { label: 'الطلبات', route: '/orders', icon: 'orders' },
    { label: 'الوكلاء', route: '/agents', icon: 'agents' },
    { label: 'المستخدمين', route: '/users', icon: 'users' },
  ];

  toggleCollapse(): void {
    this.collapsed.update((value) => !value);
  }
}
