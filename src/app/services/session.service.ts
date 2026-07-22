import { Injectable } from '@angular/core';

export type UserRole = 'user' | 'admin';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  currentUserId = '5';
  role: UserRole = 'user';

  get isAdmin(): boolean {
    return this.role === 'admin';
  }
}
