import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProperty } from '../../../models/user.model';

@Component({
  selector: 'app-edit-user-property-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user-property-modal.html',
  styleUrl: './edit-user-property-modal.css',
})
export class EditUserPropertyModal implements OnChanges {
  @Input() open = false;
  @Input() property: UserProperty | null = null;

  @Output() save = new EventEmitter<UserProperty>();
  @Output() cancel = new EventEmitter<void>();

  propertyTypes: Array<'للبيع' | 'للإيجار'> = ['للبيع', 'للإيجار'];

  draft: Pick<UserProperty, 'title' | 'price' | 'location' | 'type' | 'image'> = {
    title: '',
    price: '',
    location: '',
    type: 'للبيع',
    image: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.open && this.property) {
      this.draft = {
        title: this.property.title,
        price: this.property.price,
        location: this.property.location,
        type: this.property.type,
        image: this.property.image,
      };
    }
  }

  onSave(): void {
    if (!this.property) return;
    this.save.emit({ ...this.property, ...this.draft });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
