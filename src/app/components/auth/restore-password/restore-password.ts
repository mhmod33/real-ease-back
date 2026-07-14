import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-restore-password',
  imports: [],
  templateUrl: './restore-password.html',
  styleUrl: './restore-password.css',
})
export class RestorePassword {
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update((v) => !v);
  }
}
