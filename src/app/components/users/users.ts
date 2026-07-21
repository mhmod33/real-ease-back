import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

export interface UserChatMessage {
  id: string;
  text: string;
  isMe: boolean;
  time: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users: User[] = [];
  selectedIds = new Set<string>();

  // Chat Modal
  showChatModal = false;
  chatUser?: User;
  newChatMessage = '';
  chatHistory: UserChatMessage[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.users$.subscribe((data) => {
      this.users = data.slice(0, 4);
    });
  }

  /* ── Selection ── */
  toggleSelect(id: string, event: MouseEvent): void {
    event.stopPropagation();
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
  }

  isSelected(id: string): boolean {
    return this.selectedIds.has(id);
  }

  selectAll(): void {
    if (this.selectedIds.size === this.users.length) {
      this.selectedIds.clear();
    } else {
      this.users.forEach((u) => this.selectedIds.add(u.id));
    }
  }

  get allSelected(): boolean {
    return this.users.length > 0 && this.selectedIds.size === this.users.length;
  }

  get hasSelection(): boolean {
    return this.selectedIds.size > 0;
  }

  /* ── Navigation ── */
  goToCreate(): void {
    this.router.navigate(['/users/create']);
  }

  goToDetails(id: string): void {
    this.router.navigate(['/users', id]);
  }

  /* ── Delete ── */
  deleteUser(user: User, event: MouseEvent): void {
    event.stopPropagation();
    if (confirm(`هل أنت متأكد من حذف المستخدم "${user.name}"؟`)) {
      this.selectedIds.delete(user.id);
      this.userService.deleteUser(user.id).subscribe();
    }
  }

  bulkDelete(): void {
    if (this.selectedIds.size === 0) {
      alert('الرجاء تحديد مستخدم واحد على الأقل للحذف');
      return;
    }
    if (confirm(`هل أنت متأكد من حذف ${this.selectedIds.size} مستخدم؟`)) {
      const ids = [...this.selectedIds];
      this.userService.deleteSelectedUsers(ids).subscribe(() => {
        this.selectedIds.clear();
      });
    }
  }

  /* ── Chat Modal ── */
  openChat(user: User, event: MouseEvent): void {
    event.stopPropagation();
    this.chatUser = user;
    this.chatHistory = [
      {
        id: '1',
        text: 'السلام عليكم! كيف يمكنني مساعدتك؟',
        isMe: false,
        time: '10:00 ص',
      },
      {
        id: '2',
        text: 'أريد الاستفسار عن عقار في دبي',
        isMe: true,
        time: '10:02 ص',
      },
      {
        id: '3',
        text: 'بكل سرور، لدينا عدة خيارات رائعة في دبي',
        isMe: false,
        time: '10:04 ص',
      },
    ];
    this.showChatModal = true;
  }

  closeChat(): void {
    this.showChatModal = false;
    this.chatUser = undefined;
    this.newChatMessage = '';
  }

  sendChatMessage(): void {
    if (!this.newChatMessage.trim()) return;
    this.chatHistory.push({
      id: String(Date.now()),
      text: this.newChatMessage.trim(),
      isMe: true,
      time: new Date().toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
    this.newChatMessage = '';

    // Simulate reply
    setTimeout(() => {
      this.chatHistory.push({
        id: String(Date.now() + 1),
        text: 'شكراً لتواصلك معنا، سنرد عليك في أقرب وقت.',
        isMe: false,
        time: new Date().toLocaleTimeString('ar-EG', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
    }, 800);
  }

  onChatEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendChatMessage();
    }
  }
}
