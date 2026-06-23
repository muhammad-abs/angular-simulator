import { Directive, ElementRef, HostBinding, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hover]',
})
export class HoverDirective {

  private elementRef: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);
  
  @HostListener('mouseenter')
  onEnter(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-weight', 'bold');
  }
  
  @HostListener('mouseleave')
  onLeave(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-weight', 'normal');
  }
  
}
