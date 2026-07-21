import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ModalVariant = 'confirm' | 'danger' | 'info';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-modal.html',
  styleUrl: './app-modal.css',
})
export class AppModal {
  @Input() open = false;
  @Input() variant: ModalVariant = 'confirm';
  @Input() title = '';
  @Input() message = '';
  @Input() confirmText = 'تأكيد';
  @Input() cancelText = 'إلغاء';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
