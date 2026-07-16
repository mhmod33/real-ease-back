import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Sidebar, Header],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  readonly sidebarService = inject(SidebarService);
}
