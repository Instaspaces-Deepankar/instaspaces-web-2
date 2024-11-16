import { Component, Input, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from "../../environments/environment";
import { CallCoordinator } from "../../api-interface/CallCoordinator.model";
import { ContactService } from "../../services/contact.service";
import { jwtDecode } from "jwt-decode";
import { Success } from "../success/success";
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {MatError} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatChip} from "@angular/material/chips";
import {MatTooltip} from "@angular/material/tooltip";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faFacebookF, faInstagram, faLinkedinIn, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faComment, faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons"; // Import this function to check if it's running in the browser
declare var gtag: Function;
declare var ir: Function;

interface DecodedToken {
  user_name: string;
  user_email: string;
  user_pno: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  imports: [
    Success,
    FormsModule, ReactiveFormsModule, CommonModule, MatError, MatIcon, MatChip, MatTooltip, FaIconComponent
  ]
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  private apiUrl: string = environment.apiUrl;
  success: boolean = false;

  selectedCoordinator: CallCoordinator | null = null;
  isBrowser: boolean; // Add this property to check the platform

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private contactService: ContactService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object // Inject the platform ID to check SSR
  ) {
    // Determine if the code is running in a browser environment
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @Input() usermessage: string = '';

  chips = [
    { text: 'How you can help me with virtual office', icon: 'trending_up' },
    { text: 'I want to expand business in', icon: 'trending_up' }
  ];
  selectedType: string = ''; // Initialize selectedType variable

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')]],
      preferredLocation: [''],
      mobile: ['', [Validators.required, Validators.minLength(10), this.indianPhoneNumberValidator]],
      selectedPlan: [''],
      message: [this.usermessage],
      currentPage: ['']
    });

    // Decode JWT token and populate the form only if running in a browser
    if (this.isBrowser) {
      const token = localStorage.getItem('Token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token) as DecodedToken;
          const userName = decodedToken.user_name;
          const userEmail = decodedToken.user_email;
          let userPno = decodedToken.user_pno.toString();
          userPno = userPno.replace(/^(91|0)/, '');

          this.contactForm.patchValue({
            fullName: userName,
            mobile: userPno,
            email: userEmail,
            preferredLocation: this.contactForm.get('preferredLocation')?.value,
            selectedPlan: this.selectedType,
            message: this.contactForm.get('message')?.value
          });

        } catch (error) {
        }
      }



    }
  }

  indianPhoneNumberValidator(control: FormControl): { [key: string]: any } | null {
    const phoneNumberRegex = /^(0|\+91)?[56789]\d{9}$/;
    if (control.value && !phoneNumberRegex.test(control.value)) {
      return { 'indianPhoneNumber': true };
    }
    return null;
  }

  selectChip(chipText: string) {
    this.contactForm.get('message')?.setValue(chipText);
  }

  sendData: boolean = true;

  onSubmit() {
    const storedCoordinator = localStorage.getItem('selectedCoordinator');
    if (storedCoordinator) {

      this.selectedCoordinator = JSON.parse(storedCoordinator);
    }
    let ownerId = '';
    if (this.selectedCoordinator) {
      ownerId = this.selectedCoordinator.name;
    } else {
    }

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('ownerId', ownerId);

    if (this.contactForm.valid) {
      this.sendData = false;

      const currentPage = window.location.href;
      let message = this.contactForm.get('message')?.value || '';
      message += ` Page: ${currentPage}`;
      this.contactForm.get('message')?.setValue(message);

      const { fullName, email, mobile, message: messages, preferredLocation, selectedPlan } = this.contactForm.value;
      const timestamp = new Date().toISOString();

      this.contactService.submitForm(fullName, email, mobile, messages, preferredLocation, selectedPlan, currentUrl.href)
        .subscribe(response => {
          this.success = true;
          this.triggerConversion();
          if (window.innerWidth > 768) {
            this.addScript();
          }
          // alert("Thank You. You will receive callback from 7314•••••• shortly");
          this.contactForm.reset();
          this.sendData = true;
        },
          (error) => {

            if (error.status === 429) {
              this.success = false;
              this.sendData = true;
              this.contactService.fallBackSubmitForm(fullName, email, mobile, messages, preferredLocation, selectedPlan, timestamp)
                .subscribe(response => {
                });
              // alert("Error submitting contact form");
              alert('We have received your submission. Due to high traffic, please wait a moment before attempting another entry. Thank you for your patience.');
              // Handle 429 Too Many Requests error
              // alert('We have received your submission. Due to high traffic, please wait a moment before attempting another entry. Thank you for your patience.');
            } else {
              // alert('An error occurred while submitting the form. Please try again.');

              this.success = false;
              this.sendData = true;
              this.contactService.fallBackSubmitForm(fullName, email, mobile, messages, preferredLocation, selectedPlan, timestamp)
                .subscribe(response => {
                });
              // alert("Error submitting contact form");

              alert('An error occurred while submitting the form. Please try again.');
            }
          });
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  triggerConversion(): void {
    gtag('event', 'conversion', { 'send_to': 'AW-921070112/IFT_CNSZ6ZIZEKDUmbcD' });

    ir('track', {
      orderID: `${this.contactForm.value.mobile}`,
      event: "register",
      fname: `${this.contactForm.value.fullName}`,
      email: `${this.contactForm.value.email}`,
      mobile: `${this.contactForm.value.mobile}`,
      order_custom_val: ''
    });
  }

  addScript(): void {
    if (this.isBrowser) {
      document.querySelectorAll('.botpenguin-right').forEach(el => {
        this.renderer.setStyle(el, 'display', 'block');
      });

      if (!document.getElementById('messenger-widget-b')) {
        const script = this.renderer.createElement('script');
        this.renderer.setAttribute(script, 'id', 'messenger-widget-b');
        this.renderer.setAttribute(script, 'src', 'https://cdn.botpenguin.com/website-bot.js');
        this.renderer.setAttribute(script, 'defer', '');
        script.innerHTML = '668fa50399f33102a0a9e39a,6641fd1f240d7122ecdb038a';
        this.renderer.appendChild(document.body, script);
      }
    }
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: panelClass,
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  public faFacebookF = faFacebookF;
  public faTwitter = faTwitter;
  public faInstagram = faInstagram;
  public faLinkedinIn = faLinkedinIn;
  public faEnvelope = faEnvelope;
  public faPhone = faPhone;
  public faComment = faComment;
}

interface Plan {
  value: string;
  viewValue: string;
}
