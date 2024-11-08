import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faPhone, faEnvelope, faMapMarkerAlt, faList } from '@fortawesome/free-solid-svg-icons';
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

  quoteForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  isBrowser: boolean;
  formSubmitted = false;

  selectedCoordinator: CallCoordinator | null = null;
  private locationTexts = [
    "Preferred state / city",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Jammu and Kashmir",
    "Ladakh"
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
      location: ['', Validators.required],
      service: ['', Validators.required]
    });

    if (this.isBrowser) {
      this.fetchActiveCoordinators();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.startTypingEffect(this.locationTexts, (text) => this.locationPlaceholder = text, 50, 200);
    }
  }

  private fetchActiveCoordinators(): void {
    this.contactService.getActiveCoordinators().subscribe(
      (data: CallCoordinator[]) => {
        if (this.isBrowser) {
          const storedCoordinator = localStorage.getItem('selectedCoordinator');
          if (storedCoordinator) {
            const parsedCoordinator = JSON.parse(storedCoordinator);
            this.selectedCoordinator = data.find(coordinator => coordinator.name === parsedCoordinator.name) || null;
          }

          if (!this.selectedCoordinator && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            this.selectedCoordinator = data[randomIndex];
            localStorage.setItem('selectedCoordinator', JSON.stringify(this.selectedCoordinator));
          }
        }
      },
      (error) => {
        console.error('Error fetching coordinators:', error);
      }
    );
  }

  onSubmit(): void {
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
      },
      (error) => {
        this.isSubmitting = false;
        if (error.status === 429) {
          alert('We have received your submission. Please wait a moment before trying again.');
        } else {
          alert('An error occurred while submitting the form. Please try again.');
        }
      }
    );
  }

  triggerConversion(): void {
    if (this.isBrowser) {
      gtag('event', 'conversion', { 'send_to': 'AW-XXXXX/XXX' });
      ir('track', { /* Tracking params */ });
    }
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
