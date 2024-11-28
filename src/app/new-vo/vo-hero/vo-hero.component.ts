import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faPhone, faEnvelope, faMapMarkerAlt, faList, faExclamationCircle, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from "../../services/contact.service";
import { CallCoordinator } from "../../api-interface/CallCoordinator.model";
import { Success } from "../../forms/success/success";
declare var gtag: Function;
declare var ir: Function;

@Component({
  selector: 'app-vo-hero',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, Success],
  templateUrl: './vo-hero.component.html',
  styleUrls: ['./vo-hero.component.scss']
})
export class VoHeroComponent implements OnInit, AfterViewInit {
  namePlaceholder: string = 'Full Name';
  phonePlaceholder: string = 'Phone Number';
  emailPlaceholder: string = 'Email ID';
  locationPlaceholder: string = 'Preferred state / city';

  faUser = faUser;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faMapMarkerAlt = faMapMarkerAlt;
  faList = faList;
  faInfoCircle =faInfoCircle;
  faExclamationCircle = faExclamationCircle;


  quoteForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  isBrowser: boolean;
  formSubmitted = false;

  selectedCoordinator: CallCoordinator | null = null;
  locationInputValue: string = ''; // Track the current input value

  filteredLocations: string[] = []; // To store filtered location suggestions

  private locationTexts = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Daman and Diu",
    "Lakshadweep", "Delhi", "Puducherry", "Jammu and Kashmir", "Ladakh"
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.quoteForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      location: [''],
      service: ['']
    });


  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.startTypingEffect(this.locationTexts, (text) => this.locationPlaceholder = text, 50, 200);
    }
  }

  onLocationInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.locationInputValue = input;

    this.filteredLocations = this.locationTexts.filter(location =>
      location.toLowerCase().startsWith(input)
    );
  }

  onFocus(): void {
    if (this.locationInputValue) {
      this.filteredLocations = this.locationTexts.filter(location =>
        location.toLowerCase().startsWith(this.locationInputValue.toLowerCase())
      );
    }
  }


  onBlur(): void {
    setTimeout(() => {
      this.filteredLocations = [];
    }, 200);
  }

  onLocationSelect(location: string): void {
    this.quoteForm.get('location')?.setValue(location);
    this.filteredLocations = [];
    this.locationInputValue = location;
  }

  saveToLocalStorage(): void {
    let mobile = this.quoteForm.get('phone')?.value;

    mobile = typeof mobile === 'string' || typeof mobile === 'number'
      ? String(mobile).replace(/\D/g, '').slice(-10)
      : '';



    const user = {
      name: this.quoteForm.get('name')?.value,
      email:this.quoteForm.get('email')?.value,
      telephone: mobile
    };

    localStorage.setItem('user', JSON.stringify(user));
  }


  onSubmit(): void {
    this.saveToLocalStorage();
    if (this.isBrowser) {
      const storedCoordinator = localStorage.getItem('selectedCoordinator');
      if (storedCoordinator) {

        this.selectedCoordinator = JSON.parse(storedCoordinator);
      }
    } else {

    }
    let ownerId = '';
    if (this.selectedCoordinator) {
      ownerId = this.selectedCoordinator.name;
    }

    const currentUrl = this.isBrowser ? new URL(window.location.href) : null;
    if (currentUrl) {
      currentUrl.searchParams.set('ownerId', ownerId);
    }

    if (this.quoteForm.invalid) {
      this.quoteForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { name, phone, email, location, service } = this.quoteForm.value;

    this.contactService.submitForm(name, email, phone, "", location, service, currentUrl).subscribe(
      (response) => {
        this.formSubmitted = true;
        this.isSubmitting = false;
        this.successMessage = 'Form submitted successfully!';
        this.triggerConversion();
        // alert(response);
      },
      (error) => {
        this.isSubmitting = false;
        // alert(error.status);

        if (error.status === 429 || error.response?.status === 429) {

          // this.contactService.fallBackSubmitForm(name, email, phone, "", location, service, currentUrl)
          //   .subscribe(response => {
          //   });
          // alert('We have received your submission. Due to high traffic, please wait few hours before attempting again. Thank you for your patience.');
        } else {
          // this.contactService.fallBackSubmitForm(name, email, phone, "", location, service, currentUrl)
          //   .subscribe(response => {
          //   });
          // alert('An error occurred while submitting the form. Please try again.');
        }
      }
    );
  }

  triggerConversion(): void {
    gtag('event', 'conversion', { 'send_to': 'AW-921070112/IFT_CNSZ6ZIZEKDUmbcD' });

    ir('track', {
      orderID: `${this.quoteForm.value.mobile}`,
      event: "register",
      fname: `${this.quoteForm.value.fullName}`,
      email: `${this.quoteForm.value.email}`,
      mobile: `${this.quoteForm.value.mobile}`,
      order_custom_val: ''
    });
  }

  private startTypingEffect(
    texts: string[],
    updatePlaceholder: (text: string) => void,
    typingSpeed: number,
    delayBetweenTexts: number
  ): void {
    let textIndex = 0;
    let charIndex = 0;
    let currentText = texts[textIndex];
    let isDeleting = false;

    const type = () => {
      if (isDeleting) {
        if (charIndex > 0) {
          updatePlaceholder(currentText.substring(0, charIndex - 1));
          charIndex--;
          setTimeout(type, typingSpeed);
        } else {
          setTimeout(() => {
            textIndex = (textIndex + 1) % texts.length;
            currentText = texts[textIndex];
            isDeleting = false;
            type();
          }, delayBetweenTexts);
        }
      } else {
        if (charIndex < currentText.length) {
          updatePlaceholder(currentText.substring(0, charIndex + 1));
          charIndex++;
          setTimeout(type, typingSpeed);
        } else {
          setTimeout(() => {
            isDeleting = true;
            type();
          }, delayBetweenTexts);
        }
      }
    };

    if (this.isBrowser) type();
  }

  isInvalid(controlName: string): boolean {
    const control = this.quoteForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

}
