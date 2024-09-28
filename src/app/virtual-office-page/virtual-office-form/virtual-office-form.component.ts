import { Component, inject, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContactService } from "../../services/contact.service";
import { Success } from "../../forms/success/success";
import { CallCoordinator } from "../../api-interface/CallCoordinator.model";
import { isPlatformBrowser } from '@angular/common';

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
  errorMessage = '';  // Capture error messages
  successMessage = ''; // Capture success messages
  selectedCoordinator: CallCoordinator | null = null;
  isBrowser: boolean;

  constructor(
    private fb: FormBuilder,
    private virtualOfficeService: ContactService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID to check if the platform is browser
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.virtualOfficeForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      preferredLocation: [''],
      planType: ['', [Validators.required]]
    });

    this.virtualOfficeService.getActiveCoordinators().subscribe(
      (data: CallCoordinator[]) => {
        console.log(data);

        if (this.isBrowser) {
          // Only execute localStorage logic in the browser
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
        console.error('Error:', error);
      }
    );
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

    if (this.selectedCoordinator) {
      console.log('Selected coordinator:', this.selectedCoordinator);
      ownerId = this.selectedCoordinator.name;
    } else {
      console.warn('No active coordinators found.');
    }

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('ownerId', ownerId);

    if (this.virtualOfficeForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';  // Reset error message
      this.successMessage = ''; // Reset success message

      const { fullName, email, phoneNumber, preferredLocation, planType } = this.virtualOfficeForm.value;

      this.virtualOfficeService.submitForm(fullName, email, phoneNumber, currentUrl.href, preferredLocation, planType, currentUrl.href)
        .subscribe(
          (response: any) => {
            this.isSubmitting = false;
            this.successMessage = 'Form submitted successfully!';
            this.formSubmitted = true;
            console.log(response);
          },
          (error) => {
            this.isSubmitting = false;
            this.errorMessage = 'An error occurred while submitting the form. Please try again.';
            console.error(error);
          }
        );
    } else {
      this.virtualOfficeForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  get email() {
    return this.virtualOfficeForm.get('email');
  }

  get phoneNumber() {
    return this.virtualOfficeForm.get('phoneNumber');
  }
}
