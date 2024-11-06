import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

// Ensure to install and import IntersectionObserver polyfill if needed
// import 'intersection-observer';

@Component({
  selector: 'app-india-map',
  standalone: true,
  imports: [],
  templateUrl: './india-map.component.html',
  styleUrls: ['./india-map.component.css'],
})
export class IndiaMapComponent implements OnInit {
  currentstate: string = '';
  mapZoomLevel: number = 0.6;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    interface StateDetails {
      name: string;
      details: string;
      number: string;
    }

    const stateNames: Record<string, StateDetails> = {
      'Andaman and Nicobar Islands': {
        name: 'Andaman and Nicobar Islands',
        details: 'Virtual Address Available',
        number: '01',
      },
      'Andhra Pradesh': {
        name: 'Andhra Pradesh',
        details: 'Virtual Address Available',
        number: '01',
      },
      'Arunachal Pradesh': {
        name: 'Arunachal Pradesh',
        details: 'Virtual Address Available',
        number: '01',
      },
      Assam: {
        name: 'Assam',
        details: 'Virtual Address Available',
        number: '03',
      },
      Bihar: {
        name: 'Bihar',
        details: 'Virtual Address Available',
        number: '01',
      },
      Chhattisgarh: {
        name: 'Chhattisgarh',
        details: 'Virtual Address Available',
        number: '02',
      },
      Delhi: {
        name: 'Delhi',
        details: 'Virtual Address Available',
        number: '14',
      },
      Goa: { name: 'Goa', details: 'Virtual Address Available', number: '02' },
      Ladakh: {
        name: 'Ladakh',
        details: 'Virtual Address Available',
        number: '01',
      },
      Gujarat: {
        name: 'Gujarat',
        details: 'Virtual Address Available',
        number: '02',
      },
      Haryana: {
        name: 'Haryana',
        details: 'Virtual Address Available',
        number: '12',
      },
      'Himachal Pradesh': {
        name: 'Himachal Pradesh',
        details: 'Virtual Address Available',
        number: '02',
      },
      'Jammu and Kashmir': {
        name: 'Jammu and Kashmir',
        details: 'Virtual Address Available',
        number: '02',
      },
      Jharkhand: {
        name: 'Jharkhand',
        details: 'Virtual Address Available',
        number: '01',
      },
      Karnataka: {
        name: 'Karnataka',
        details: 'Virtual Address Available',
        number: '10',
      },
      Kerala: {
        name: 'Kerala',
        details: 'Virtual Address Available',
        number: '03',
      },
      'Madhya Pradesh': {
        name: 'Madhya Pradesh',
        details: 'Virtual Address Available',
        number: '04',
      },
      Maharashtra: {
        name: 'Maharashtra',
        details: 'Virtual Address Available',
        number: '06',
      },
      Manipur: {
        name: 'Manipur',
        details: 'Virtual Address Available',
        number: '01',
      },
      Meghalaya: {
        name: 'Meghalaya',
        details: 'Virtual Address Available',
        number: '01',
      },
      Mizoram: {
        name: 'Mizoram',
        details: 'Virtual Address Available',
        number: '01',
      },
      Nagaland: {
        name: 'Nagaland',
        details: 'Virtual Address Available',
        number: '01',
      },
      Orissa: {
        name: 'Orissa',
        details: 'Virtual Address Available',
        number: '02',
      },
      Punjab: {
        name: 'Punjab',
        details: 'Virtual Address Available',
        number: '04',
      },
      Rajasthan: {
        name: 'Rajasthan',
        details: 'Virtual Address Available',
        number: '04',
      },
      Sikkim: {
        name: 'Sikkim',
        details: 'Virtual Address Available',
        number: '01',
      },
      'Tamil Nadu': {
        name: 'Tamil Nadu',
        details: 'Virtual Address Available',
        number: '08',
      },
      Telangana: {
        name: 'Telangana',
        details: 'Virtual Address Available',
        number: '06',
      },
      Tripura: {
        name: 'Tripura',
        details: 'Virtual Address Available',
        number: '01',
      },
      'Uttar Pradesh': {
        name: 'Uttar Pradesh',
        details: 'Virtual Address Available',
        number: '06',
      },
      Uttarakhand: {
        name: 'Uttarakhand',
        details: 'Virtual Address Available',
        number: '02',
      },
      'West Bengal': {
        name: 'West Bengal',
        details: 'Virtual Address Available',
        number: '08',
      },
    };

    const stateNameElement = this.elementRef.nativeElement.querySelector('#state-name');
    const numberElement = this.elementRef.nativeElement.querySelector('#number');
    const detailsElement = this.elementRef.nativeElement.querySelector('#details');

    this.elementRef.nativeElement.querySelectorAll('.india-map path').forEach((path: SVGPathElement) => {
      this.renderer.listen(path, 'mouseenter', (event: MouseEvent) => {
        const stateData = stateNames[(event.target as SVGPathElement).id];
        if (stateData) {
          this.renderer.setProperty(stateNameElement, 'textContent', stateData.name);
          this.renderer.setProperty(numberElement, 'textContent', stateData.number);
          this.renderer.setProperty(detailsElement, 'textContent', stateData.details);
        }
      });

      this.renderer.listen(path, 'mouseleave', () => {
        this.renderer.setProperty(stateNameElement, 'textContent', 'Explore Your Virtual Office Destination!');
        this.renderer.setProperty(numberElement, 'textContent', '');
        this.renderer.setProperty(detailsElement, 'textContent', '');
      });

      this.renderer.listen(path, 'click', (event: MouseEvent) => {
        const stateData = stateNames[(event.target as SVGPathElement).id];
        if (stateData) {
          this.renderer.setProperty(stateNameElement, 'textContent', stateData.name);
          this.router.navigate(['virtual-offices', stateData.name]);
        }
      });
    });

    // Check for IntersectionObserver support
    if (typeof IntersectionObserver !== 'undefined') {
      const mapContainer = this.elementRef.nativeElement.querySelector('.map-container');
      const mapInfo = this.elementRef.nativeElement.querySelector('.map-info');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.renderer.addClass(mapContainer, 'visible');
              this.renderer.addClass(mapInfo, 'visible');
              observer.unobserve(entry.target); 
            }
          });
        },
        { threshold: 0.4 }
      );

      observer.observe(mapContainer);
      observer.observe(mapInfo);
    } else {
      // console.warn('IntersectionObserver is not supported in this environment.');
    }
  }

  showTooltip(tooltip: HTMLElement, pathElement: HTMLElement, tooltip1: HTMLElement, position: string) {
    const name = pathElement.getAttribute('title')?.replace(/_/g, ' ');
    if (name) {
      tooltip1.innerHTML = name;
      this.renderer.setStyle(tooltip, 'display', 'block');

      const pathRect = pathElement.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const offset = 10; // Offset for positioning

      let tooltipX, tooltipY;

      switch (position) {
        case 'bottom':
          tooltipX = pathRect.left + offset;
          tooltipY = pathRect.bottom + offset;
          break;
        case 'top':
          tooltipX = pathRect.left + offset;
          tooltipY = pathRect.top - tooltipRect.height - offset;
          break;
        case 'right':
          tooltipX = pathRect.right + offset;
          tooltipY = pathRect.top + offset;
          break;
        case 'left':
          tooltipX = pathRect.left - tooltipRect.width - offset;
          tooltipY = pathRect.top + offset;
          break;
        default:
          tooltipX = pathRect.left + offset;
          tooltipY = pathRect.bottom + offset;
      }

      this.renderer.setStyle(tooltip, 'left', `${tooltipX}px`);
      this.renderer.setStyle(tooltip, 'top', `${tooltipY}px`);

      this.renderer.listen(pathElement, 'mouseleave', () => {
        this.renderer.setStyle(tooltip, 'display', 'none');
      });
    }
  }

  capitalizeFirstLetter(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  setMapZoomLevel(zoomLevel: number): void {
    this.mapZoomLevel = zoomLevel;
    const mapElement = this.elementRef.nativeElement.querySelector('.map');
    this.renderer.setStyle(mapElement, 'zoom', zoomLevel.toString());
  }
}
