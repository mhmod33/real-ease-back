import { Component, ElementRef, OnDestroy, OnInit, signal, viewChildren } from '@angular/core';

@Component({
  selector: 'app-confirm-email',
  imports: [],
  templateUrl: './confirm-email.html',
  styleUrl: './confirm-email.css',
})
export class ConfirmEmail implements OnInit, OnDestroy {
  otpDigits = [0, 1, 2, 3, 4];
  countdown = signal('3:24');
  otpInputs = viewChildren<ElementRef<HTMLInputElement>>('otpInput');

  private timerId?: ReturnType<typeof setInterval>;
  private secondsRemaining = 204;

  ngOnInit(): void {
    this.timerId = setInterval(() => {
      if (this.secondsRemaining <= 0) {
        return;
      }
      this.secondsRemaining--;
      const mins = Math.floor(this.secondsRemaining / 60);
      const secs = this.secondsRemaining % 60;
      this.countdown.set(`${mins}:${secs.toString().padStart(2, '0')}`);
    }, 1000);
    // clearInterval(this.timerId);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 1);

    if (input.value && index < this.otpDigits.length - 1) {
      this.otpInputs()[index + 1]?.nativeElement.focus();
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      this.otpInputs()[index - 1]?.nativeElement.focus();
    }
  }
}
