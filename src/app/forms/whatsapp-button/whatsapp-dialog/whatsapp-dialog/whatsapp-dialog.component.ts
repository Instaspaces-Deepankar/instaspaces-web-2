import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ContactService} from "../../../../services/contact.service";
declare var gtag: Function;
declare var ir: Function;
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-whatsapp-dialog',
  standalone:true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './whatsapp-dialog.component.html',
  styleUrls: ['./whatsapp-dialog.component.scss']
})
export class WhatsappDialogComponent implements OnInit {
  phoneForm!: FormGroup;
  comment: string = ''; // Add comment property
  isSubmitted: boolean = false; // Add success state
  selectedQuestion: string = ''; // Add selectedQuestion property
  name: string = '';
  userNumber:string='';
  constructor(private fb: FormBuilder,    private contactService: ContactService,
  ) {
  }

  ngOnInit(): void {
    this.phoneForm = this.fb.group({
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
        Validators.maxLength(10)
      ]]
    });
  }

  onPhoneNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const sanitizedValue = value.replace(/\D/g, ''); // Remove non-numeric characters

    if (sanitizedValue.length > 10) {
      input.value = sanitizedValue.slice(0, 10); // Limit to 10 digits
    } else {
      input.value = sanitizedValue;
    }

    this.phoneForm.get('phoneNumber')?.setValue(input.value, {emitEvent: false});
  }
  addSubsourceToURL(url: string, paramName: string, paramValue: string): string {
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.set(paramName, paramValue);
    return parsedUrl.toString();
  }
  onSubmit() {
    if (this.phoneForm.valid) {
      const phoneNumber = '+918882702020';
      const message = `Hi, I'm ${this.name}. I need assistance with ${this.comment}.`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      let currentUrl = window.location.href;
      currentUrl = this.addSubsourceToURL(currentUrl, 'subsource', 'Whatsapp');

      this.contactService.submitForm(this.name, '', this.userNumber, message + " -> " + currentUrl+";", "", this.selectedQuestion,currentUrl).subscribe(response => {
        window.location.href = whatsappUrl;
      }, error => {
        window.location.href = whatsappUrl;
        console.log('response', error);
      });



      // Open WhatsApp with the pre-filled message

      alert('WhatsApp message sent successfully!');
      this.isSubmitted = true; // Set success state

      // Dismiss the form after a brief delay
      setTimeout(() => {
        this.isSubmitted = false; // Reset success state
        this.phoneForm.reset(); // Reset the form
        this.comment = ''; // Clear the comment
      }, 3000); // Adjust the delay as needed (3 seconds in this case)
    } else {
      alert('Please correct the errors in the form.');
    }
  }


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

  selectQuestion(question: string) {
    this.selectedQuestion = question;
    this.comment = question; // Update the comment with the selected question
  }
}
