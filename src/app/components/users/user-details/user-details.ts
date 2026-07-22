import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User, UserProperty } from '../../../models/user.model';
import { AppModal, ModalVariant } from '../../shared/app-modal/app-modal';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, FormsModule, AppModal],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails implements OnInit {
  user?: User;

  // Carousel index for properties
  carouselIndex = 0;

  // Inline property edit
  editingPropertyId: string | null = null;
  editDraft: Pick<UserProperty, 'title' | 'price' | 'location' | 'type'> = {
    title: '',
    price: '',
    location: '',
    type: 'للبيع',
  };

  // Confirmation / Info Modal
  modalOpen = false;
  modalVariant: ModalVariant = 'confirm';
  modalTitle = '';
  modalMessage = '';
  modalConfirmText = 'تأكيد';
  private pendingAction?: () => void;

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

  goToAddProperty(): void {
    this.router.navigate(['/properties/create']);
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
    if (!this.user?.properties) return;
    this.openConfirm(
      'حذف العقار',
      `هل أنت متأكد من حذف العقار "${property.title}"؟`,
      () => {
        if (this.user?.properties) {
          this.user.properties = this.user.properties.filter((p) => p.id !== property.id);
        }
      }
    );
  }

  shareProperty(property: UserProperty, event: MouseEvent): void {
    event.stopPropagation();
    this.openInfo('مشاركة العقار', `مشاركة العقار: ${property.title}`);
  }

  startEditProperty(property: UserProperty, event: MouseEvent): void {
    event.stopPropagation();
    this.editingPropertyId = property.id;
    this.editDraft = {
      title: property.title,
      price: property.price,
      location: property.location,
      type: property.type,
    };
  }

  saveEditProperty(property: UserProperty, event: MouseEvent): void {
    event.stopPropagation();
    Object.assign(property, this.editDraft);
    this.editingPropertyId = null;
  }

  cancelEditProperty(event: MouseEvent): void {
    event.stopPropagation();
    this.editingPropertyId = null;
  }

  /* ── Confirmation / Info Modal ── */
  private openConfirm(title: string, message: string, action: () => void): void {
    this.modalVariant = 'danger';
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalConfirmText = 'تأكيد';
    this.pendingAction = action;
    this.modalOpen = true;
  }

  private openInfo(title: string, message: string): void {
    this.modalVariant = 'info';
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalConfirmText = 'حسناً';
    this.pendingAction = undefined;
    this.modalOpen = true;
  }

  onModalConfirm(): void {
    this.modalOpen = false;
    const action = this.pendingAction;
    this.pendingAction = undefined;
    action?.();
  }

  onModalCancel(): void {
    this.modalOpen = false;
    this.pendingAction = undefined;
  }
}
