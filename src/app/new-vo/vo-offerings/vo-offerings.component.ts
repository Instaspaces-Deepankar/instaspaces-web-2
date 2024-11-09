import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faClipboardCheck, faBuilding, faChair, faCheckCircle, faTimesCircle, faArrowRight, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vo-offerings',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './vo-offerings.component.html',
  styleUrls: ['./vo-offerings.component.scss']
})
export class VoOfferingsComponent {
  // Icons for each card type
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faArrowRight = faArrowRight;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  offerings = [
    {
      title: 'Mailing Address',
      icon: faEnvelope,
      features: [
        { text: 'Mention the Address on Websites, Visiting Cards, Letterheads, etc.', available: true },
        { text: 'Use the Address for GST Registration for new GSTIN, ABOB, VPOB, etc.', available: false },
        { text: 'Use the Address for MCA Portal Registration', available: false },
        { text: 'Demarcated Space for 100% Compliance', available: false }
      ],
      benefits: [
        { text: 'Professional mailing address to enhance credibility.', available: true },
        { text: 'Maintain privacy by not exposing personal address.', available: true },
        { text: 'Useful for initial brand-building efforts.', available: true },
        { text: 'Simplifies communication with clients and partners.', available: true }
      ],
      showBenefits: false
    },
    {
      title: 'GST Registration',
      icon: faClipboardCheck,
      features: [
        { text: 'Mention the Address on Websites, Visiting Cards, Letterheads, etc.', available: true },
        { text: 'Use the Address for GST Registration for new GSTIN, ABOB, VPOB, etc.', available: true },
        { text: 'Use the Address for MCA Portal Registration', available: false },
        { text: 'Demarcated Space for 100% Compliance', available: false }
      ],
      benefits: [
        { text: 'Allows for GST compliance, building trust.', available: true },
        { text: 'Eligible for input tax credits.', available: true },
        { text: 'Compliance with tax regulations.', available: true },
        { text: 'Easy to handle transactions under GST framework.', available: true }
      ],
      showBenefits: false
    },
    // Additional offerings as needed
  ];

  toggleDetails(index: number) {
    this.offerings[index].showBenefits = !this.offerings[index].showBenefits;
  }
}
