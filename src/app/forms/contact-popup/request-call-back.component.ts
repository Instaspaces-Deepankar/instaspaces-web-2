import { Component, OnInit, Renderer2 } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import  {jwtDecode} from 'jwt-decode';
import {CallCoordinator} from "../../api-interface/CallCoordinator.model";
import {ContactService} from "../../services/contact.service";
import {Success} from "../success/success";
import {CommonModule} from "@angular/common";


declare var gtag: Function;
declare var ir: Function;

@Component({
  selector: 'app-request-call-back',
  standalone: true,
  templateUrl: './request-call-back.component.html',
  imports: [
    ReactiveFormsModule,
    Success,
    CommonModule
  ],
  styleUrls: ['./request-call-back.component.scss']
})
export class RequestCallBackComponent implements OnInit {

  userForm!: FormGroup;
  isLoading = false;
  success = false;
  sendData = true;
  selectedCoordinator: CallCoordinator | null = null;


  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.initializeForm();
    this.prefillUserData();


    this.contactService.getActiveCoordinators().subscribe(
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

  private initializeForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')]],
      prefLoc: [''],
      telephone: ['', [Validators.required, Validators.minLength(10), this.indianPhoneNumberValidator]],
      selectedPlan: [''],
      message: [''],
    });
  }

  private prefillUserData(): void {
    const token = localStorage.getItem('Token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token); // Use generic to specify the token type
        console.log(decodedToken);
        const userName = decodedToken.user_name;
        const userEmail = decodedToken.user_email;
        let userPno = decodedToken.user_pno.toString();
        userPno = userPno.replace(/^(91|0)/, '');

        this.userForm.patchValue({
          name: userName,
          telephone: userPno,
          email: userEmail
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }

  indianPhoneNumberValidator(control: FormControl): { [key: string]: any } | null {
    const phoneNumberRegex = /^(0|\+91)?[56789]\d{9}$/; // Updated Indian phone number regex pattern

    if (control.value && !phoneNumberRegex.test(control.value)) {
      return { 'indianPhoneNumber': true }; // Return error if pattern doesn't match
    }

    return null; // Return null if validation passes
  }

  onMobileInput(event: any): void {
    const inputValue: string = event.target.value;
    const countryCode = '+91';

    if (!inputValue.startsWith(countryCode)) {
      // If the input does not start with "+91", prepend it
      this.userForm.get('telephone')?.setValue(countryCode + inputValue);
    } else {
      // If the input starts with "+91", update the form value
      this.userForm.get('telephone')?.setValue(inputValue);
    }
  }

  onSubmit(): void {

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
    // console.log(this.callbackForm.value);


    if (this.userForm.valid) {
      this.sendData = false;
      this.isLoading = true;
      this.userForm.get('message')?.setValue(window.location.href);

      this.contactService.submitForm(
        this.userForm.value.name,
        this.userForm.value.email,
        this.userForm.value.telephone,
        "",
        "",
        "",
        currentUrl.href
      ).subscribe(response => {
        this.handleSuccess();
      }, error => {
        this.handleError();
      });
    } else {
      this.markFormAsTouched(this.userForm);
    }
  }

  private handleSuccess(): void {
    this.triggerConversion();
    this.success = true;
    this.isLoading = false;
    alert("Thank You. You will receive a callback from 7314•••••• shortly");
    // this.snackBar.open('Thank You. You will receive a callback from 7314•••••• shortly', 'Close', {
    //   verticalPosition: 'top',
    //   horizontalPosition: 'center',
    //   duration: 5000,
    // });
    this.userForm.reset();
    this.sendData = true;
    this.addScript();
  }

  private handleError(): void {
    this.success = false;
    this.contactService.fallBackSubmitForm(
      this.userForm.value.name,
      this.userForm.value.email,
      this.userForm.value.telephone,
      "",
      "",
      "",
      new Date().toISOString()
    ).subscribe(response => {
      console.log('response', response);
    });
    console.error('Error submitting contact form');
    this.sendData = true;
    // this.snackBar.open('Error submitting contact form', 'Close', {
    //   duration: 3000,
    // });
    alert("Error submitting contact form");
    this.isLoading = false;
  }

  private triggerConversion(): void {
    gtag('event', 'conversion', { 'send_to': 'AW-921070112/IFT_CNSZ6ZIZEKDUmbcD' });

    ir('track', {
      orderID: `${this.userForm.value.telephone}`,
      event: "register",
      fname: `${this.userForm.value.name}`,
      email: `${this.userForm.value.email}`,
      mobile: `${this.userForm.value.telephone}`,
      order_custom_val: ''
    });
  }

  markFormAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormAsTouched(control);
      }
    });
  }

  openSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Set the duration in milliseconds
      panelClass: panelClass, // Set custom CSS classes for styling
    });
  }

  addScript(): void {
    if (!this.isMobileView()) {
      // Show BotPenguin widget if not already visible
      document.querySelectorAll('.botpenguin-right').forEach(el => {
        this.renderer.setStyle(el, 'display', 'block');
      });

      // Check if the script is already added
      if (!document.getElementById('messenger-widget-b')) {
        // Create and append the script element
        const script = this.renderer.createElement('script');
        this.renderer.setAttribute(script, 'id', 'messenger-widget-b');
        this.renderer.setAttribute(script, 'src', 'https://cdn.botpenguin.com/website-bot.js');
        this.renderer.setAttribute(script, 'defer', '');
        script.innerHTML = '668fa50399f33102a0a9e39a,6641fd1f240d7122ecdb038a';
        this.renderer.appendChild(document.body, script);
      }
    }
  }

  private isMobileView(): boolean {
    return window.innerWidth <= 768; // Define mobile view as width <= 768px
  }

}

interface DecodedToken {
  user_name: string;
  user_email: string;
  user_pno: string;
}