import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common'; // Import NgClass

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule, NgClass], // Include NgClass here
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent {
  faqs = [
    { question: 'What is a virtual office, and how does it work?', answer: '- A virtual office or a business address is a service that provides businesses with access to a professional address, mail handling, meeting room access, and other office services without the need for a permanent physical office space. It allows companies to operate remotely while maintaining a professional business presence at a lower cost than traditional office leasing. InstaSpaces business addresses allow you to apply for Company Registration, GST registration and other licenses on our prestigious business address.' },
    { question: 'Why should I choose a virtual office over a traditional office space?', answer: '- A virtual office or a business address is a cost-effective alternative to traditional office spaces, providing a professional business address, mail handling, and on-demand access to meeting rooms and office services. It offers flexibility, scalability, mobility, and a professional image for businesses of all sizes, while eliminating the overhead costs and commitments associated with leasing and maintaining a physical office. Scaling your presence requires minimal efforts in virtual offices and is the quickest option as compared to physical office space.' },
    { question: 'How can I use the virtual office address for business registration?', answer: '- InstaSpaces provides you with a legally compliant business address that you can use for business registration. We will assist you with the necessary documentation and government compliance requirements such as a Leave and License Agreement, No Objection Certificate and a Utility Bill as per the requirement set by MCA and GST authorities.' },
    { question: 'Is my mail safe and secure with InstaSpaces?', answer: '- Absolutely. We take security seriously. Your mail is handled with confidentiality and can be forwarded to your preferred address. You can also choose to pick it up at our location.' },
    { question: 'Are there any hidden costs or additional fees?', answer: '- We strive for transparency, and our pricing is designed to be straightforward. Any additional fees or costs will be clearly communicated to you before you make a decision.' },
    { question: 'How quickly can I get started with a virtual office?', answer: '- Getting started with InstaSpaces is quick and easy. Once you choose a virtual office package and complete the necessary documentation, your details are sent for KYC and if everything goes well, within few minutes it is approved. You can start using your address in 3 days starting from your KYC approval time.' },
    { question: 'Can I use a virtual office address for GST registration in India?', answer: '- Yes, you can use a virtual office address for GST registration, provided it meets the criteria set by the GST authorities. It\'s essential to ensure that the virtual office address is valid and complies with regulatory requirements.' }
  ];
// Variable to keep track of the currently active question
activeIndex: number | null = null;

// Function to toggle the answer for a question
toggleAnswer(index: number) {
  console.log('Toggled question index:', index);
  // Toggle the activeIndex between the clicked index and null
  this.activeIndex = this.activeIndex === index ? null : index;
}
}
