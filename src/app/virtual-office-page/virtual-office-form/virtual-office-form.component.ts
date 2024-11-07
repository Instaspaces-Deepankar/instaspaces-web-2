import {Component, Inject, inject, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {ContactService} from "../../services/contact.service";
import {Success} from "../../forms/success/success";
import {CallCoordinator} from "../../api-interface/CallCoordinator.model";
import {jwtDecode} from "jwt-decode";
declare var gtag: Function;
declare var ir: Function;
@Component({
  selector: 'app-virtual-office-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Success],
  templateUrl: './virtual-office-form.component.html',
  styleUrls: ['./virtual-office-form.component.scss']
})
export class VirtualOfficeFormComponent implements OnInit {
  virtualOfficeForm!: FormGroup;
  formSubmitted = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  isBrowser: boolean; // Add this property to check the platform
  selectedCoordinator: CallCoordinator | null = null;

  constructor(private fb: FormBuilder, private virtualOfficeService: ContactService
              ,    private renderer: Renderer2,
        @Inject(PLATFORM_ID) private platformId: Object // Inject the platform ID to check SSR
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

  }  // Inject the service

  ngOnInit() {
    this.virtualOfficeForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      preferredLocation: [''],
      planType: ['', [Validators.required]]
    });
    // Decode JWT token and populate the form only if running in a browser
    if (this.isBrowser) {


      // Fetch active coordinators and store the selected one if necessary
      this.virtualOfficeService.getActiveCoordinators().subscribe(
        (data: CallCoordinator[]) => {

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
        },
        (error) => {
        }
      );
    }
  }

  validateNumber(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value.replace(/[^0-9]/g, '');
    if (inputValue.length > 10) {
      inputValue = inputValue.slice(0, 10);
    }
    inputElement.value = inputValue;
  }

  onSubmit() {
    let ownerId = '';
    // let calltime = '';

    if (this.selectedCoordinator) {
      ownerId = this.selectedCoordinator.name;
    } else {
    }

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('ownerId', ownerId);
    // currentUrl.searchParams.set('callTime', calltime);
    // currentUrl.searchParams.set('subsource', 'WebsiteCall');

    if (this.virtualOfficeForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';  // Reset error message
      this.successMessage = ''; // Reset success message

      // Get the individual form values
      const { fullName, email, phoneNumber, preferredLocation, planType } = this.virtualOfficeForm.value;

      // Call the service method with individual parameters
      this.virtualOfficeService.submitForm(fullName, email, phoneNumber,"", preferredLocation,planType,currentUrl.href)
        .subscribe(
          (response: any) => {
            this.triggerConversion();
            if (window.innerWidth > 768) {
              this.addScript();
            }
            this.isSubmitting = false;
            this.successMessage = 'Form submitted successfully!';
            this.formSubmitted = true;
          },
          (error) => {
            this.isSubmitting = false;
            if (error.status === 429) {
              // Handle 429 Too Many Requests error
              alert('We have received your submission. Due to high traffic, please wait a moment before attempting another entry. Thank you for your patience.');
            } else {
              alert('An error occurred while submitting the form. Please try again.');
            }
          }
        );

    } else {
      this.virtualOfficeForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }



  triggerConversion(): void {
    gtag('event', 'conversion', { 'send_to': 'AW-921070112/IFT_CNSZ6ZIZEKDUmbcD' });

    ir('track', {
      orderID: `${this.virtualOfficeForm.value.mobile}`,
      event: "register",
      fname: `${this.virtualOfficeForm.value.fullName}`,
      email: `${this.virtualOfficeForm.value.email}`,
      mobile: `${this.virtualOfficeForm.value.mobile}`,
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


  get email() {
    return this.virtualOfficeForm.get('email');
  }

  get phoneNumber() {
    return this.virtualOfficeForm.get('phoneNumber');
  }
}
