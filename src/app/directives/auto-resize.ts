import { AfterViewInit, Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: 'textarea[appAutoResize]',
  standalone: true
})
export class AutoResize implements AfterViewInit {

  private elementRef = inject(ElementRef<HTMLTextAreaElement>);

  ngAfterViewInit(): void {
    this.adjustHeight();
  }

  @HostListener('input')
  onInput(): void {
    this.adjustHeight();
  }

  private adjustHeight(): void {
    const textarea = this.elementRef.nativeElement;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

}
