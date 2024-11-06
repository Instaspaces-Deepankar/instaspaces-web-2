import { Component, HostListener, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [],
  templateUrl: './why-choose-us.component.html',
  styleUrls: ['./why-choose-us.component.css']
})
export class WhyChooseUsComponent implements AfterViewInit {
  private mainContainer!: HTMLElement;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.mainContainer = this.el.nativeElement.querySelector('.main-container');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const rect = this.mainContainer.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

    if (rect.top <= windowHeight && rect.bottom >= 0) {
      this.mainContainer.classList.add('visible');
    } else {
      this.mainContainer.classList.remove('visible');
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const x = e.clientX / window.innerWidth;

    // Smoothly transition the background color
    this.mainContainer.style.transition = 'background-color 0.3s ease';

    // Calculate the gradient angle based on mouse position (clockwise)
    const gradientAngle = x * 360;

    // Apply the clockwise gradient background
    this.mainContainer.style.background = `linear-gradient(${gradientAngle}deg, #ffdbdb, #f8cdd5, #fabdc2)`;
  }
}
