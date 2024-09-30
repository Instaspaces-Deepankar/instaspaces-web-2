import { Component, EventEmitter, Output, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Renderer2 } from '@angular/core';
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ContactService } from "../../services/contact.service";
import { CallCoordinator } from "../../api-interface/CallCoordinator.model";
import { RevealNumberComponent } from "./reveal-number/reveal-number.component";
import {  PLATFORM_ID } from '@angular/core';
declare var gtag: Function;
declare var ir: Function;
@Component({
  selector: 'app-contact-pop-over',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, RevealNumberComponent],
  templateUrl: './contact-pop-over.component.html',
  styleUrls: ['./contact-pop-over.component.scss']
})

export class ContactPopOverComponent implements OnInit {
  isDialogOpen = false;
  success = false;
  @Output() toggleContactEvent = new EventEmitter<string>();
  isSuccess: boolean = false;

  callbackForm!: FormGroup;
  isFormSubmitted = false;
  formDetails!: { name: string; phone: string; time: string };

  isFormVisible: boolean = false; // Initially, the form is hidden

  isLoading: boolean = false;
  selectedTime1: number | null = null;

  exactTime15Min!: string;
  exactTime60Min!: string;

  selectedCoordinator: CallCoordinator | null = null;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private service: ContactService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID for SSR check
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.calculateExactTimes();

    // Check if running in the browser before accessing localStorage
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
      console.log('This code is running on the server.');
    }
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

  showForm() {
    this.isFormVisible = true; // Show the form when the button is clicked
  }

  private initializeForm(): void {
    this.callbackForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      time: ['']
    });
  }

  selectTime(time: number): void {
    this.selectedTime1 = time;
    this.callbackForm.patchValue({ time });
  }

  submitForm(): void {
    if (this.callbackForm.valid) {
      this.formDetails = this.callbackForm.value;
      this.isFormSubmitted = true;
    } else {
      this.handleError('Invalid form submission');
    }
  }

  private handleSuccess(): void {
    // alert('Thank You. Your consultation is scheduled.');
    this.addScript();
  }

  private handleError(error: any): void {
    // alert('Error submitting contact form');
    console.error('Error submitting contact form:', error);
  }

  addScript(): void {
    this.triggerConversion();
    if (!this.isMobileView()) {
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

  private triggerConversion(): void {
    gtag('event', 'conversion', { 'send_to': 'AW-921070112/IFT_CNSZ6ZIZEKDUmbcD' });

    ir('track', {
      orderID: `${this.formDetails.phone}`,
      event: "register",
      fname: `${this.formDetails.name}`,
      email: `${this.formDetails.phone}`,
      mobile: `${this.formDetails.phone}`,
      order_custom_val: ''
    });
  }

  private isMobileView(): boolean {
    return window.innerWidth <= 768;
  }

  editPhone(): void {
    this.isFormSubmitted = false; // Go back to edit mode
  }

  scheduleNow() {
    this.isLoading = true;

    if (this.selectedCoordinator) {
      console.log('Selected coordinator:', this.selectedCoordinator);
      const ownerId = this.selectedCoordinator.name;
      const calltime = this.formDetails.time;

      const currentUrl = new URL(window.location.href);

      currentUrl.searchParams.set('ownerId', ownerId);
      currentUrl.searchParams.set('callTime', calltime);
      currentUrl.searchParams.set('subsource', 'WebsiteCall');

      console.log('Updated URL:', currentUrl.href);

      this.service.submitForm(
        this.callbackForm.value.name,
        "",
        this.callbackForm.value.phone,
        currentUrl.href + ";",
        "",
        "",
        currentUrl.href
      ).subscribe(response => {
        this.isLoading = false;
        this.isSuccess = true;
        this.handleSuccess();
      }, (error) => {
        this.isLoading = false;
        this.handleError(error);
      });
    } else {
      this.isLoading = false;
      console.warn('No active coordinators found.');
    }
  }
}
