import { AfterViewInit, Component, ElementRef, OnDestroy, inject } from '@angular/core';

@Component({
  selector: 'app-notfound',
  imports: [],
  templateUrl: './notfound.html',
  styleUrl: './notfound.css',
})
export class Notfound implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private burger: HTMLElement | null = null;
  private nav: HTMLElement | null = null;

  ngAfterViewInit(): void {
    const host = this.elementRef.nativeElement;

    this.burger = host.querySelector<HTMLElement>('.burger');
    this.nav = host.querySelector<HTMLElement>('nav');
    this.burger?.addEventListener('click', this.toggleNav);

    // CSS animations handle the typewriter effect
  }

  ngOnDestroy(): void {
    this.burger?.removeEventListener('click', this.toggleNav);
  }

  private readonly toggleNav = (): void => {
    if (!this.burger || !this.nav) {
      return;
    }

    this.burger.dataset['state'] = this.burger.dataset['state'] === 'closed' ? 'open' : 'closed';
    this.nav.dataset['state'] = this.nav.dataset['state'] === 'closed' ? 'open' : 'closed';
  };
}
