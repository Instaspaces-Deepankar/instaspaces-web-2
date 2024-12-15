import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faClipboardCheck, faCheckCircle, faTimesCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vo-offerings',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './vo-offerings.component.html',
  styleUrls: ['./vo-offerings.component.scss']
})
export class VoOfferingsComponent {
  plans = [
    {
      name: 'Mailing Address Plan',
      benefits: [
        { text: 'Mention the Address on Websites, Visiting Cards, Letterheads, etc.', icon: 'check' },
        { text: 'Use the Address for GST Registration for new GSTIN, APOB, VPOB, etc.', icon: 'close' },
        { text: 'Use the Address for MCA Portal Registration', icon: 'close' },
        { text: 'Demarcated Space for 100% Compliance', icon: 'close' },
      ],
      features: [
        { text: 'Courier Receiving and Forwarding service', icon: 'check' },
        { text: 'Permanent Signage in the Premises (chargeable)', icon: 'close' },
        { text: 'Use Address for Opening Current Account', icon: 'close' },
        { text: 'GST Certificate on Desk', icon: 'close' },
      ],
    },
    {
      name: 'GST Registration Plan',
      benefits: [
        { text: 'Mention the Address on Websites, Visiting Cards, Letterheads, etc.', icon: 'check' },
        { text: 'Use the Address for GST Registration for new GSTIN, APOB, VPOB, etc.', icon: 'check' },
        { text: 'Use the Address for MCA Portal Registration', icon: 'close' },
        { text: 'Demarcated Space for 100% Compliance', icon: 'close' },
      ],
      features: [
        { text: 'Courier Receiving and Forwarding service', icon: 'check' },
        { text: 'Permanent Signage in the Premises (chargeable)', icon: 'close' },
        { text: 'Use Address for Opening Current Account', icon: 'close' },
        { text: 'GST Certificate on Desk', icon: 'close' },
      ],
    },
    {
      name: 'Business Registration Plan',
      benefits: [
        { text: 'Mention the Address on Websites, Visiting Cards, Letterheads, etc.', icon: 'check' },
        { text: 'Use the Address for GST Registration for new GSTIN, APOB, VPOB, etc.', icon: 'check' },
        { text: 'Use the Address for MCA Portal Registration', icon: 'check' },
        { text: 'Demarcated Space for 100% Compliance', icon: 'close' },
      ],
      features: [
        { text: 'Courier Receiving and Forwarding service', icon: 'check' },
        { text: 'Permanent Signage in the Premises (chargeable)', icon: 'check' },
        { text: 'Use Address for Opening Current Account', icon: 'check' },
        { text: 'GST Certificate on Desk', icon: 'close' },
      ],
    },
    {
      name: 'Desk Address Plan',
      benefits: [
        { text: 'Mention the Address on Websites, Visiting Cards, Letterheads, etc.', icon: 'check' },
        { text: 'Use the Address for GST Registration for new GSTIN, APOB, VPOB, etc.', icon: 'check' },
        { text: 'Use the Address for MCA Portal Registration', icon: 'check' },
        { text: 'Demarcated Space for 100% Compliance', icon: 'check' },
      ],
      features: [
        { text: 'Courier Receiving and Forwarding service', icon: 'check' },
        { text: 'Permanent Signage in the Premises (chargeable)', icon: 'check' },
        { text: 'Use Address for Opening Current Account', icon: 'check' },
        { text: 'GST Certificate on Desk', icon: 'check' },
      ],
    },
  ];
}
