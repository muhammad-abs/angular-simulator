import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[gradient]',
})
export class GradientDirective {
  
  private timeoutId!: number;
  
  @Input('gradient') gradientConfiguration = {
    delay: 1000,
    colors: ['white', 'blue'],
    thickness: '2px'
  }
  
  @HostBinding('class.animated-gradient-border') isEffectActive: boolean = false;
  @HostBinding('style.display') display: string = 'block';
  
  @HostBinding('style.--gradient-colors')
  get scssColors(): string {
    const colors: string[] = this.gradientConfiguration.colors;
    return `${ colors.join(', ') }, ${ colors[0] }`;
  }

  @HostBinding('style.--border-thickness')
  get scssThickness(): string {
    return this.gradientConfiguration.thickness;
  }
  
  @HostListener('mouseenter')
  onEnter(): void {
    this.timeoutId = setTimeout(() => {
      this.isEffectActive = true;
    }, this.gradientConfiguration.delay);
  }
  
  @HostListener('mouseleave')
  onLeave(): void {
    clearTimeout(this.timeoutId);
    this.isEffectActive = false;
  }
  
}

