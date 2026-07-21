import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User, UserProperty } from '../../../models/user.model';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails implements OnInit {
  user?: User;

  // Carousel index for properties
  carouselIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.user = this.userService.getUserById(id);
    }

    if (!this.user) {
      this.user = this.userService.getUserById('5') || this.userService.getUsers()[0];
    }
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  prevProperty(): void {
    if (!this.user?.properties || this.user.properties.length === 0) return;
    this.carouselIndex =
      (this.carouselIndex - 1 + this.user.properties.length) % this.user.properties.length;
  }

  nextProperty(): void {
    if (!this.user?.properties || this.user.properties.length === 0) return;
    this.carouselIndex = (this.carouselIndex + 1) % this.user.properties.length;
  }

  deleteProperty(property: UserProperty, event: MouseEvent): void {
    event.stopPropagation();
    if (this.user?.properties && confirm(`هل أنت متأكد من حذف العقار "${property.title}"؟`)) {
      this.user.properties = this.user.properties.filter((p) => p.id !== property.id);
    }
  }

  shareProperty(property: UserProperty, event: MouseEvent): void {
    event.stopPropagation();
    alert(`مشاركة العقار: ${property.title}`);
  }
}
