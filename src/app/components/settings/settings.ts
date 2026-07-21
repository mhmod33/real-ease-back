import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  user?: User;

  // Personal Info Form
  name = '';
  type = '';
  address = '';
  agencyName = '';
  gender: 'ذكر' | 'أنثى' = 'ذكر';
  age?: number;
  description = '';
  dragOver = false;

  // Contact Form
  phone = '';
  whatsapp = '';
  email = '';
  website = '';

  // Social Form
  facebook = '';
  instagram = '';
  twitter = '';
  linkedin = '';

  // Delete modal
  showDeleteModal = false;

  userTypes = ['وكيل عقاري', 'مستشار عقاري', 'شركة عقارية', 'وكيل تجاري', 'مدير عقاري'];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.getUserById('5') || this.userService.getUsers()[0];
    if (this.user) {
      this.name = this.user.name;
      this.type = this.user.type;
      this.address = this.user.address || '';
      this.agencyName = this.user.agencyName || '';
      this.gender = this.user.gender || 'ذكر';
      this.age = this.user.age;
      this.description = this.user.description || '';
      this.phone = this.user.phone || '';
      this.whatsapp = this.user.whatsapp || '';
      this.email = this.user.email;
      this.website = this.user.website || '';
      this.facebook = this.user.socialLinks?.facebook || '';
      this.instagram = this.user.socialLinks?.instagram || '';
      this.twitter = this.user.socialLinks?.twitter || '';
      this.linkedin = this.user.socialLinks?.linkedin || '';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(): void {
    this.dragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
  }

  savePersonalInfo(): void {
    if (this.user) {
      this.userService.updateUser(this.user.id, {
        name: this.name,
        address: this.address,
        agencyName: this.agencyName,
        gender: this.gender,
        age: this.age,
        description: this.description,
      }).subscribe(() => {
        alert('تم حفظ المعلومات الشخصية بنجاح');
      });
    }
  }

  saveSocialInfo(): void {
    if (this.user) {
      this.userService.updateUser(this.user.id, {
        phone: this.phone,
        whatsapp: this.whatsapp,
        email: this.email,
        website: this.website,
        socialLinks: {
          facebook: this.facebook,
          instagram: this.instagram,
          twitter: this.twitter,
          linkedin: this.linkedin,
        },
      }).subscribe(() => {
        alert('تم حفظ وسائل التواصل بنجاح');
      });
    }
  }

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    if (this.user) {
      this.userService.deleteUser(this.user.id).subscribe(() => {
        this.showDeleteModal = false;
        this.router.navigate(['/login']);
      });
    }
  }
}
