import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SliderformComponent } from "./sliderform/sliderform.component";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, SliderformComponent],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {
  images: string[] = [
    'https://isicons.gumlet.io/hero-image/index-image-5.webp',
    'https://isicons.gumlet.io/hero-image/index-image-4.webp',
    'https://isicons.gumlet.io/hero-image/index-image-3.webp'
  ];
  
  headings = [
    { heading1: 'Establish your business footprint. Available across India.', heading2: 'VIRTUAL OFFICE YOUR WAY' },
    { heading1: 'Establish your business footprint. Available across India.', heading2: 'BUSINESS ADDRESS YOUR WAY' },
    { heading1: 'Establish your business footprint. Available across India.', heading2: 'GST REGISTRATION YOUR WAY' }
  ];

  currentIndex: number = 0;
  intervalId: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        this.showNextImage();
      }, 3000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  showNextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}
