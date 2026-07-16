import { Component, inject } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly sidebarService = inject(SidebarService);
  readonly userName = 'مصطفى';
  readonly userRole = 'صاحب عقارات';
}
