import { Component, Renderer2, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-map',
  standalone: true,
  imports: [],
  templateUrl: './mobile-map.component.html',
  styleUrls: ['./mobile-map.component.scss']
})
export class MobileMapComponent implements AfterViewInit {

  @ViewChild('sliderWrapper') sliderWrapper!: ElementRef;

  private startX = 0;
  private scrollLeft = 0;
  private isDown = false;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngAfterViewInit(): void {
    this.addSliderEventListeners();
  }

  addSliderEventListeners(): void {
    const slider = this.sliderWrapper.nativeElement;

    this.renderer.listen(slider, 'touchstart', (event: TouchEvent) => {
      this.isDown = true;
      const touch = event.touches[0];
      this.startX = touch.pageX - slider.offsetLeft;
      this.scrollLeft = slider.scrollLeft;
      this.pauseSlider(slider);
    });

    this.renderer.listen(slider, 'touchend', () => {
      this.isDown = false;
      this.resumeSlider(slider);
    });

    this.renderer.listen(slider, 'touchmove', (event: TouchEvent) => {
      if (!this.isDown) return;
      event.preventDefault();
      const touch = event.touches[0];
      const x = touch.pageX - slider.offsetLeft;
      const walk = (x - this.startX) * 3; // scroll-fast
      slider.scrollLeft = this.scrollLeft - walk;
    });
  }

  pauseSlider(slider: HTMLElement): void {
    this.renderer.setStyle(slider.firstElementChild, 'animation-play-state', 'paused');
  }

  resumeSlider(slider: HTMLElement): void {
    this.renderer.setStyle(slider.firstElementChild, 'animation-play-state', 'running');
  }

  navigateToCity(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const region = target.nextElementSibling?.textContent?.trim();
    if (region) {
      this.router.navigate(['/virtual-offices/', region]);
    }
  }
}
