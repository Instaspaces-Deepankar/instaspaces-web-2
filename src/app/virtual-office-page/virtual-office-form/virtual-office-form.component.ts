import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {ContactService} from "../../services/contact.service";
import {Success} from "../../forms/success/success";
import {CallCoordinator} from "../../api-interface/CallCoordinator.model";

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

  constructor(private fb: FormBuilder, private virtualOfficeService: ContactService) {}  // Inject the service

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

        // Retrieve the stored coordinator from localStorage
        const storedCoordinator = localStorage.getItem('selectedCoordinator');
        if (storedCoordinator) {
          const parsedCoordinator = JSON.parse(storedCoordinator);
          this.selectedCoordinator = data.find(coordinator => coordinator.name === parsedCoordinator.name) || null;
        }

        // If no matching coordinator is found, select a random one
        if (!this.selectedCoordinator && data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          this.selectedCoordinator = data[randomIndex];

          // Store the newly selected coordinator in localStorage
          localStorage.setItem('selectedCoordinator', JSON.stringify(this.selectedCoordinator));
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
    // let calltime = '';

    if (this.selectedCoordinator) {
      console.log('Selected coordinator:', this.selectedCoordinator);
      ownerId = this.selectedCoordinator.name;
      // calltime = String(this.selectedTime1);
    } else {
      console.warn('No active coordinators found.');
    }

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('ownerId', ownerId);
    // currentUrl.searchParams.set('callTime', calltime);
    // currentUrl.searchParams.set('subsource', 'WebsiteCall');

    console.log('Updated URL:', currentUrl.href);

    if (this.virtualOfficeForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';  // Reset error message
      this.successMessage = ''; // Reset success message

      // Get the individual form values
      const { fullName, email, phoneNumber, preferredLocation, planType } = this.virtualOfficeForm.value;

      // Call the service method with individual parameters
      this.virtualOfficeService.submitForm(fullName, email, phoneNumber,currentUrl.href, preferredLocation, planType,currentUrl.href)
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
            console.error(error); // Optional: Logging the error
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
