import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ContactService } from '../../../../services/contact.service';
import { CommonModule } from '@angular/common';
import { faCheckCircle, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
declare var gtag: Function;
declare var ir: Function;


@Component({
  selector: 'app-whatsapp-dialog',
  standalone: true,
  imports: [CommonModule, FaIconComponent, ReactiveFormsModule],
  templateUrl: './whatsapp-dialog.component.html',
  styleUrls: ['./whatsapp-dialog.component.scss'],
})
export class WhatsappDialogComponent implements OnInit {
  phoneForm!: FormGroup;
  comment: string = '';
  isSubmitted: boolean = false;
  selectedQuestion: string = '';
  name: string = '';
  userNumber: string = '';

  // Icons
  public faCheckCircle = faCheckCircle;
  public faPaperPlane = faPaperPlane;
  public faWhatsapp = faWhatsapp;
  public faPhone = faPhone;

  constructor(private fb: FormBuilder, private contactService: ContactService) {}

  ngOnInit(): void {
    // Initialize the form group with validation
    this.phoneForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Name is required with a minimum length of 3 characters
      comment: ['', [Validators.required, Validators.minLength(10)]], // Comment is required with a minimum length of 10 characters
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/), // Ensure phone number is 10 digits
        ],
      ],
    });
  }

  // Handle phone number input sanitization
  onPhoneNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const sanitizedValue = value.replace(/\D/g, ''); // Remove all non-digit characters
    if (sanitizedValue.length > 10) {
      input.value = sanitizedValue.slice(0, 10); // Limit to 10 digits
    } else {
      input.value = sanitizedValue;
    }
    this.phoneForm.get('phoneNumber')?.setValue(input.value, { emitEvent: false });
  }

  // Method to add a subsource to the URL
  addSubsourceToURL(url: string, paramName: string, paramValue: string): string {
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.set(paramName, paramValue);
    return parsedUrl.toString();
  }

  // Form submission handler
  onSubmit() {
    if (this.phoneForm.valid) {
      const phoneNumber = '+918882702020';
      const message = `Hi, I'm ${this.phoneForm.value.name}. I need assistance with ${this.phoneForm.value.comment}.`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      let currentUrl = window.location.href;
      currentUrl = this.addSubsourceToURL(currentUrl, 'subsource', 'Whatsapp');
      this.triggerConversion();

      // Submit the form data to the service
      this.contactService
        .submitForm(
          this.phoneForm.value.name,
          '',
          this.userNumber,
          message + ' -> ' + currentUrl + ';',
          '',
          this.selectedQuestion,
          currentUrl
        )
        .subscribe(
          (response) => {
            // On successful submission, redirect to WhatsApp
            window.location.href = whatsappUrl;
          },
          (error) => {
            // On error, still redirect to WhatsApp
            window.location.href = whatsappUrl;
            console.log('response', error);
          }
        );

      // Reset form after submission
      this.isSubmitted = true;
      setTimeout(() => {
        this.isSubmitted = false;
        this.phoneForm.reset();
      }, 3000);
    } else {
      // Show validation errors if form is invalid
      alert('Please correct the errors in the form.');
    }
  }

  // Conversion tracking method (e.g., Google Analytics, IR tracking)
  triggerConversion(): void {
    gtag('event', 'conversion', { 'send_to': 'AW-921070112/IFT_CNSZ6ZIZEKDUmbcD' });

    ir('track', {
      orderID: `${this.userNumber}`,
      event: "register",
      fname: `${this.name}`,
      email: `${this.userNumber}`,
      mobile: `${this.userNumber}`,
      order_custom_val: ''
    });
  }

  // Method to handle selection of a suggested question
  selectQuestion(question: string) {
    this.selectedQuestion = question;
    this.comment = question;
    this.phoneForm.get('comment')?.setValue(question); // Set the selected question in the comment field
  }
}
