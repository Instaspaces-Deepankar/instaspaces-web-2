import { Component } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Import FontAwesomeModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-happy-customer',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule], // Add FontAwesomeModule here
  templateUrl: './happy-customer.component.html',
  styleUrls: ['./happy-customer.component.scss']
})
export class HappyCustomerComponent {
  currentIndex: number = 0;
  totalItems: number = 3;
  itemsToShow: number = 1

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  customers = [
    {
      name: 'Ed Tech',
      images: [
        'https://isicons.gumlet.io/logo_wall/Cuemath.png',
        'https://isicons.gumlet.io/logo_wall/upgrad.png',
        'https://isicons.gumlet.io/logo_wall/Educational-Excellencia.png'
      ]
    },
    {
      name: 'CA Firm',
      images: [
        'https://isicons.gumlet.io/logo_wall/CA-Shyam-Goel.png',
        'https://isicons.gumlet.io/logo_wall/Clear-tax.png',
        'https://isicons.gumlet.io/logo_wall/Vakil-Search.png'
      ]
    },
    {
      name: 'Finance',
      images: [
        'https://isicons.gumlet.io/logo_wall/pinelabs.png',
        'https://isicons.gumlet.io/logo_wall/hp.png',
        'https://isicons.gumlet.io/logo_wall/Clix-Capita.png'
      ]
    },
    {
      name: 'Entertainment',
      images: [
        'https://isicons.gumlet.io/logo_wall/Book-My-show.png',
        'https://isicons.gumlet.io/logo_wall/dharma.png',
        'https://isicons.gumlet.io/logo_wall/Exotel.png'
      ]
    },
    {
      name: 'Event Management',
      images: [
        'https://isicons.gumlet.io/logo_wall/GIG-Hospitality.png',
        'https://isicons.gumlet.io/logo_wall/JTB-India-Pvt-Ltd.png',
        'https://isicons.gumlet.io/logo_wall/mach.png'
      ]
    },
    {
      name: 'Tour and Travel',
      images: [
        'https://isicons.gumlet.io/logo_wall/Jagat-Pharma.png',
        'https://isicons.gumlet.io/logo_wall/Kaia-Tourism.png',
        'https://isicons.gumlet.io/logo_wall/TRAVLOGUE.png'
      ]
    },
    {
      name: 'Online Travel Portel',
      images: [
        'https://isicons.gumlet.io/logo_wall/ruptub.png',
        'https://isicons.gumlet.io/logo_wall/Ease-My-Trip.png',
        'https://isicons.gumlet.io/logo_wall/Makemytrip.png'
      ]
    },
    {
      name: 'Telecommunication',
      images: [
        'https://isicons.gumlet.io/logo_wall/Myoperator.png',
        'https://isicons.gumlet.io/logo_wall/Exotel.png',
        'https://isicons.gumlet.io/logo_wall/Spectra-Punj-Llyod-Ltd.png'
      ]
    }
  ];

  updateCarousel(indexChange: number): void {
    this.currentIndex = (this.currentIndex + indexChange + this.totalItems) % this.totalItems;
  }
}
