import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {ContactService} from "../../services/contact.service";
import {Success} from "../../forms/success/success";

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

  constructor(private fb: FormBuilder, private virtualOfficeService: ContactService) {}  // Inject the service

  ngOnInit() {
    this.virtualOfficeForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      preferredLocation: [''],
      planType: ['', [Validators.required]]
    });
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
    if (this.virtualOfficeForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';  // Reset error message
      this.successMessage = ''; // Reset success message

      // Get the individual form values
      const { fullName, email, phoneNumber, preferredLocation, planType } = this.virtualOfficeForm.value;

      // Call the service method with individual parameters
      this.virtualOfficeService.submitForm(fullName, email, phoneNumber,"", preferredLocation, planType,"")
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
