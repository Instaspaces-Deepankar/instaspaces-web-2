import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-virtual-office-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './virtual-office-form.component.html',
  styleUrls: ['./virtual-office-form.component.scss']
})
export class VirtualOfficeFormComponent implements OnInit {
  virtualOfficeForm!: FormGroup;
  formSubmitted = false;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

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

      setTimeout(() => {
        this.formSubmitted = true;
        this.isSubmitting = false;
        console.log(this.virtualOfficeForm.value);
      }, 2000);
    } else {
      this.virtualOfficeForm.markAllAsTouched();
    }
  }

  get email() {
    return this.virtualOfficeForm.get('email');
  }

  get phoneNumber() {
    return this.virtualOfficeForm.get('phoneNumber');
  }
}
