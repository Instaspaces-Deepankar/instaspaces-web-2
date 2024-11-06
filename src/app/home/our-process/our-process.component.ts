import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-our-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-process.component.html',
  styleUrls: ['./our-process.component.scss']
})
export class OurProcessComponent implements OnInit, OnDestroy {
  tabs = [
    { id: '0', label: 'Choose a Preferred Location / Plan' },
    { id: '1', label: 'Make a Payment' },
    { id: '2', label: 'KYC Approved' },
    { id: '3', label: 'Launch Your Virtual Workspace' }
  ];

  contents = [
    { id: '0', title: 'Choose a Preferred Location / Plan', image: 'https://instaspaceweb.s3.ap-southeast-1.amazonaws.com/www-image-icons/our_process/virtual_location.png', text: 'Select Your Preferred Location and Plan with Ease! Our user-friendly interface makes booking a virtual office space a breeze. Simply click on the ‘Book Virtual Office’ button, choose your ideal virtual office space from our curated options, and finalize your booking effortlessly using Cashfree. Experience a seamless booking process and find the perfect virtual office space tailored to your needs today!' },
    { id: '1', title: 'Make a Payment', image: 'https://instaspaceweb.s3.ap-southeast-1.amazonaws.com/www-image-icons/our_process/payment.png', text: 'After you successfully complete the payment process, you will receive a detailed confirmation email. This email will include all pertinent information regarding your transaction, as well as the contact details of your dedicated account manager. Your account manager is specifically assigned to assist you with any documentation needs and provide personalized support throughout the process. This ensures that you have a direct point of contact for any queries or assistance you may require, helping to facilitate a smooth and efficient experience.' },
    { id: '2', title: 'KYC Approved', image: 'https://instaspaceweb.s3.ap-southeast-1.amazonaws.com/www-image-icons/our_process/approve.png', text: 'Implementing a straightforward KYC (Know Your Customer) process ensures that the plan is utilized for legitimate purposes. By verifying the identity and background of users, KYC helps prevent misuse and supports efficient field verification. This additional layer of scrutiny not only strengthens the integrity of the plan but also facilitates smoother and more accurate verification procedures.' },
    { id: '3', title: 'Launch Your Virtual Workspace', image: 'https://instaspaceweb.s3.ap-southeast-1.amazonaws.com/www-image-icons/our_process/vo_office.png', text: 'Typically, documents are processed and shared with you within 3 days from the date of KYC approval. However, for Tatkal requests, we expedite the process and ensure that documents are completed and shared within 36 hours of KYC approval. This streamlined approach ensures quicker turnaround times for urgent cases.' }
  ];

  selectedTab = '0'; // Default to the first tab
  intervalId: any; // To store the interval ID

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initializeTimeline();
    this.startAutoTabChange();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check if we are in the browser environment before accessing window
    if (typeof window !== 'undefined') {
      const element = this.el.nativeElement.querySelector('#our-process-section');
      if (element) {
        const position = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (position.top < viewportHeight && position.bottom >= 0) {
          element.classList.add('active');
        } else {
          element.classList.remove('active');
        }
      }
    }
  }

  onTabClick(id: string) {
    this.selectedTab = id;
    this.resetAutoTabChange(); // Reset the interval on manual tab change
  }

  private startAutoTabChange() {
    if (typeof window !== 'undefined') { // Ensure this runs only in the browser
      this.intervalId = setInterval(() => {
        this.selectedTab = ((parseInt(this.selectedTab) + 1) % this.tabs.length).toString();
      }, 3000); // Change tabs every 3 seconds
    }
  }

  private resetAutoTabChange() {
    clearInterval(this.intervalId); // Clear the previous interval
    this.startAutoTabChange(); // Restart the auto tab change process
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear interval on component destroy
    }
  }

  private initializeTimeline() {
    // Logic for initializing any timelines, animations, or other components goes here.
    // Since it's empty, ensure to update this based on your app’s specific needs.
  }
}
