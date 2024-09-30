import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-pricing-plans',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.scss']
})
export class PricingPlansComponent {

  // Pricing Card Data
  cardData = [
    {
      planName: 'Mailing Address',
      features: [
        { feature: 'Mentioning Address on the website', available: true },
        { feature: 'Mentioning Address on the Visiting Card', available: true },
        { feature: 'Courier Service', available: true },
        { feature: 'MCA Portal Registration', available: false },
        { feature: 'GSTIN Registration', available: false }
      ],
      image: 'https://isicons.gumlet.io/north-east/professional-handshakes.avif',
      heading: 'Virtual Office Address for GST Registration',
      infoText: 'Register for GST in Assam with a virtual office address. Our service provides essential documents like NOC, Agreement, Signage, and Electricity Bill for seamless GST registration.'
    },
    {
      planName: 'GST Registration',
      features: [
        { feature: 'Mentioning Address on the website', available: true },
        { feature: 'Mentioning Address on the Visiting Card', available: true },
        { feature: 'Courier Service', available: true },
        { feature: 'GSTIN Registration', available: true },
        { feature: 'MCA Portal Registration', available: false }
      ],
      image: 'https://isicons.gumlet.io/north-east/tax-preparation.avif',
      heading: 'Virtual Office for Business Registration',
      infoText: 'We offer a prime virtual office address, complete documentation, and in-office services to support your business, helping establish your professional presence easily.'
    },
    {
      planName: 'Business Registration',
      features: [
        { feature: 'Mentioning Address on the website', available: true },
        { feature: 'Mentioning Address on the Visiting Card', available: true },
        { feature: 'Courier Service', available: true },
        { feature: 'GSTIN Registration', available: true },
        { feature: 'MCA Portal Registration', available: true }
      ],
      image: 'https://isicons.gumlet.io/north-east/mailing-address.png',
      heading: 'Virtual Office Space for Mailing Address',
      infoText: 'Get a prestigious Assam mailing address through our virtual office service. Perfect for courier handling, displaying on visiting cards, and enhancing your business presence online.'
    },
    {
      planName: 'Desk Address',
      features: [
        { feature: 'Mentioning Address on the website', available: true },
        { feature: 'Mentioning Address on the Visiting Card', available: true },
        { feature: 'Courier Service', available: true },
        { feature: 'GSTIN Registration', available: true },
        { feature: 'MCA Portal Registration', available: true }
      ],
      image: 'https://isicons.gumlet.io/north-east/desk-address.png',
      heading: 'Virtual Office Space for Desk Address',
      infoText: 'Our Desk Address service offers all the benefits of the Virtual Address Plan, including a Unique Desk Number, GST Certification, Cloud Storage, and Permanent Entry Signage.'
    }
  ];

}
