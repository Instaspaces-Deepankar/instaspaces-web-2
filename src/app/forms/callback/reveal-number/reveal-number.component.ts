import {Component, OnInit, Renderer2, Inject, PLATFORM_ID} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CallCoordinator } from '../../../api-interface/CallCoordinator.model';
import { ContactService } from '../../../services/contact.service';

declare var gtag: Function;
declare var ir: Function;

@Component({
  selector: 'app-reveal-number',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './reveal-number.component.html',
  styleUrls: ['./reveal-number.component.scss']
})
export class RevealNumberComponent implements OnInit {

  callbackForm!: FormGroup;
  showForm = false;
  formSubmitted = false;
  isLoading = false; // New state variable for loading spinner
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
    @Inject(PLATFORM_ID) private platformId: Object  // Inject PLATFORM_ID to check if code is running in the browser
  ) { }

  ngOnInit() {
    this.calculateExactTimes();

    if (isPlatformBrowser(this.platformId)) {
      this.service.getActiveCoordinators().subscribe(
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
    } else {
      console.log('localStorage is not available because this is not a browser environment.');
    }

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

    let ownerId = '';
    let calltime = '';

    if (this.selectedCoordinator) {
      console.log('Selected coordinator:', this.selectedCoordinator);
      ownerId = this.selectedCoordinator.name;
      calltime = String(this.selectedTime1);
    } else {
      console.warn('No active coordinators found.');
    }

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('ownerId', ownerId);
    currentUrl.searchParams.set('callTime', calltime);
    currentUrl.searchParams.set('subsource', 'WebsiteCall');

    console.log('Updated URL:', currentUrl.href);
    console.log(this.callbackForm.value);

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
    }, (error) => {
      this.isLoading = false;
      this.handleError(error);
    });
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
    alert('Thank You. Your consultation is scheduled.');
    this.addScript();
  }

  private handleError(error: any): void {
    alert('Error submitting contact form');
    console.error('Error submitting contact form:', error);
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
