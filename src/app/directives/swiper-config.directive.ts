import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Directive({
  selector: '[appSwiperConfig]',
  standalone: true,
})
export class SwiperConfigDirective implements AfterViewInit {
  @Input() config?: SwiperOptions;

  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    Object.assign(this.element.nativeElement, this.config);
  }
}
