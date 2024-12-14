import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-happy-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './happy-customer.component.html',
  styleUrls: ['./happy-customer.component.scss']
})
export class HappyCustomerComponent {
  currentIndex: number = 0;
  totalItems: number = 6; // Total number of items in the carousel
  itemsToShow: number = 3; // Number of items visible at a time



  // Array of customer data with headings and images
  customers = [
    {
      name: 'Customer 1',
      images: [
        'https://isicons.gumlet.io/logo_wall/Cuemath.png',
        'https://isicons.gumlet.io/logo_wall/Cuemath.png',
        'https://isicons.gumlet.io/logo_wall/Cuemath.png'
      ]
    },
    {
      name: 'Customer 2',
      images: [
        'https://isicons.gumlet.io/logo_wall/Kaia-Tourism.png',
        'https://isicons.gumlet.io/logo_wall/Kaia-Tourism.png',
        'https://isicons.gumlet.io/logo_wall/Kaia-Tourism.png'
      ]
    },
    {
      name: 'Customer 3',
      images: [
        'https://isicons.gumlet.io/logo_wall/Cuemath.png',
        'https://isicons.gumlet.io/logo_wall/Cuemath.png',
        'https://isicons.gumlet.io/logo_wall/Cuemath.png'
      ]
    },
    {
      name: 'Customer 4',
      images: [
        'https://isicons.gumlet.io/logo_wall/Cuemath.png',
        'https://isicons.gumlet.io/logo_wall/Cuemath.png',
        'https://isicons.gumlet.io/logo_wall/Cuemath.png'
      ]
    },
    {
      name: 'Customer 5',
      images: [
        'https://isicons.gumlet.io/logo_wall/Cuemath.png',
        'https://isicons.gumlet.io/logo_wall/Cuemath.png',
        'https://isicons.gumlet.io/logo_wall/Cuemath.png'
      ]
    },
    {
      name: 'Customer 6',
      images: [
        'https://isicons.gumlet.io/logo_wall/Cuemath.png',
        'https://isicons.gumlet.io/logo_wall/Cuemath.png',
        'https://isicons.gumlet.io/logo_wall/Cuemath.png'
      ]
    }
  ];

  updateCarousel(indexChange: number): void {
    this.currentIndex = (this.currentIndex + indexChange + this.totalItems) % this.totalItems;
  }
}
