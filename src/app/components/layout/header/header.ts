import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly userName = 'مصطفى';
  readonly userRole = 'صاحب عقارات';
}
