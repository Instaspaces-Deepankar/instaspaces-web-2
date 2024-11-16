import {Component, OnInit, Renderer2, Inject, PLATFORM_ID} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CallCoordinator } from '../../../api-interface/CallCoordinator.model';
import { ContactService } from '../../../services/contact.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatSnackBarModule } from '@angular/material/snack-bar';

declare var gtag: Function;
declare var ir: Function;

@Component({
  selector: 'app-reveal-number',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, ReactiveFormsModule,MatSnackBarModule],
  templateUrl: './reveal-number.component.html',
  styleUrls: ['./reveal-number.component.scss']
})
export class RevealNumberComponent implements OnInit {

  callbackForm!: FormGroup;
  showForm = false;
  formSubmitted = false;
  isLoading = false;
  isSuccess = false;
  selectedTime: string = '';
  selectedCoordinator: CallCoordinator | null = null;

  exactTime15Min!: string;
  exactTime60Min!: string;
  selectedTime1: number | null = null;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private service: ContactService,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object  // Inject PLATFORM_ID to check if code is running in the browser
  ) { }

  ngOnInit() {
    this.calculateExactTimes();



    this.callbackForm = this.fb.group({
      userName: ['', Validators.required],
      userPhone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]]
    });
  }

  toggleForm() {
    this.showForm = true;
  }

  selectTime(time: number): void {
    this.selectedTime1 = time;
    this.callbackForm.patchValue({ time });
  }

  onSubmit() {

    if (this.callbackForm.valid) {
      this.formSubmitted = true;
      this.showForm = false;
    } else {
      this.showErrorMessage();
      this.markFormTouched();
    }
  }

  confirmSchedule() {
    this.isLoading = true; // This triggers the loading spinner
    if (isPlatformBrowser(this.platformId)) {
      const storedCoordinator = localStorage.getItem('selectedCoordinator');
      if (storedCoordinator) {

        this.selectedCoordinator = JSON.parse(storedCoordinator);
      }
    } else {
    }
    let ownerId = '';
    let calltime = '';

    if (this.selectedCoordinator) {
      ownerId = this.selectedCoordinator.name;
      calltime = String(this.selectedTime1);
    } else {
    }

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('ownerId', ownerId);
    currentUrl.searchParams.set('callTime', calltime);
    currentUrl.searchParams.set('subsource', 'WebsiteCall');


    this.service.submitForm(
      this.callbackForm.value.userName,
      '',
      this.callbackForm.value.userPhone,
      currentUrl.href + ';',
      '',
      '',
      currentUrl.href
    ).subscribe(response => {
      this.isLoading = false;
      this.isSuccess = true;
      this.handleSuccess();
    },

      (error) => {
        this.isLoading = false;
        this.handleError(error);
        if (isPlatformBrowser(this.platformId)) {

          if (error.status === 429) {
            alert('We have received your submission. Due to high traffic, please wait a moment before attempting another entry. Thank you for your patience.');
            // Handle 429 Too Many Requests error
            // alert('We have received your submission. Due to high traffic, please wait a moment before attempting another entry. Thank you for your patience.');
          } else {
            // alert('An error occurred while submitting the form. Please try again.');
            alert('An error occurred while submitting the form. Please try again.');
          }
        }
      }
    );
  }


  showErrorMessage() {
    alert('Please fill out all required fields with valid information.');
  }

  markFormTouched() {
    this.callbackForm.markAllAsTouched();
  }

  editDetails() {
    this.formSubmitted = false;
    this.showForm = true;
  }

  calculateExactTimes(): void {
    const currentTime = new Date();

    // Calculate time 15 minutes after the current time
    const time15Min = new Date(currentTime.getTime() + 15 * 60000);
    this.exactTime15Min = time15Min.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Calculate time 60 minutes after the current time
    const time60Min = new Date(currentTime.getTime() + 60 * 60000);
    this.exactTime60Min = time60Min.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private handleSuccess(): void {
    // alert('Thank You. Your consultation is scheduled.');
    this.addScript();
  }

  private handleError(error: any): void {
    // alert('Error submitting contact form');
  }

  addScript(): void {
    this.triggerConversion();
  }

  private triggerConversion(): void {
    gtag('event', 'conversion', { 'send_to': 'AW-921070112/IFT_CNSZ6ZIZEKDUmbcD' });

    ir('track', {
      orderID: `${this.callbackForm.value.userPhone}`,
      event: 'register',
      fname: `${this.callbackForm.value.userName}`,
      email: `${this.callbackForm.value.userPhone}`,
      mobile: `${this.callbackForm.value.userPhone}`,
      order_custom_val: ''
    });
  }
}
