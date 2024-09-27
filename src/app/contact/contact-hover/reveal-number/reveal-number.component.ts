import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CallCoordinator} from 'src/app/api-interface/CallCoordinator.model';
import {CommonService} from 'src/app/services/common.service';

declare var gtag: Function;
declare var ir: Function;

@Component({
  selector: 'app-reveal-number',
  templateUrl: './reveal-number.component.html',
  styleUrls: ['./reveal-number.component.scss']
})
export class RevealNumberComponent implements OnInit {

  callbackForm: FormGroup;
  showForm = false;
  formSubmitted = false;
  isLoading = false; // New state variable for loading spinner
  isSuccess = false;
  selectedTime: string = '';
  selectedCoordinator: CallCoordinator | null = null;


  constructor(private fb: FormBuilder, private toastr: ToastrService,
              private renderer: Renderer2, private service: CommonService) {
  }

  ngOnInit() {

    this.calculateExactTimes();

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


    this.callbackForm = this.fb.group({
      userName: ['', Validators.required],
      userPhone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]]
    });


  }

  exactTime15Min: string;
  exactTime60Min: string;

  toggleForm() {
    this.showForm = true;
  }

  selectedTime1: number | null = null;


  selectTime(time: number): void {
    this.selectedTime1 = time;

    this.callbackForm.patchValue({time});
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

    this.service.submitPopContactForm(
      this.callbackForm.value.userName,
      "",
      this.callbackForm.value.userPhone,
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
  }


  showErrorMessage() {
    this.toastr.error('Please fill out all required fields with valid information.');
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
    this.exactTime15Min = time15Min.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    // Calculate time 60 minutes after the current time
    const time60Min = new Date(currentTime.getTime() + 60 * 60000);
    this.exactTime60Min = time60Min.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  }

  private handleSuccess(): void {
    this.toastr.success('Thank You. Your consultation is scheduled.');
    this.addScript();
  }

  private handleError(error: any): void {
    this.toastr.error('Error submitting contact form');
    console.error('Error submitting contact form:', error);
  }

  addScript(): void {
    this.triggerConversion();
  }

  private triggerConversion(): void {
    gtag('event', 'conversion', {'send_to': 'AW-921070112/IFT_CNSZ6ZIZEKDUmbcD'});

    ir('track', {
      orderID: `${this.callbackForm.value.userPhone}`,
      event: "register",
      fname: `${this.callbackForm.value.userName}`,
      email: `${this.callbackForm.value.userPhone}`,
      mobile: `${this.callbackForm.value.userPhone}`,
      order_custom_val: ''
    });
  }
}
