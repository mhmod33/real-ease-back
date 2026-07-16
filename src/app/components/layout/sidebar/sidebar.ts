import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';

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
  readonly sidebarService = inject(SidebarService);
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
