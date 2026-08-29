import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'textarea[autoResize]',
  standalone: true
})
export class AutoResize implements AfterViewInit {
  constructor(
    private elementRef: ElementRef<HTMLTextAreaElement>
  ) {}

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
