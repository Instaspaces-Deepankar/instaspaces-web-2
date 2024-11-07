import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Import FontAwesomeModule
import { faUser, faPhone, faEnvelope, faMapMarkerAlt, faList } from '@fortawesome/free-solid-svg-icons'; // Importing icons

@Component({
  selector: 'app-vo-hero',
  standalone: true, // This makes the component standalone
  imports: [FontAwesomeModule], // Add FontAwesomeModule to the imports array
  templateUrl: './vo-hero.component.html',
  styleUrls: ['./vo-hero.component.scss']
})
export class VoHeroComponent implements OnInit, AfterViewInit {
onSubmit() {
throw new Error('Method not implemented.');
}
  namePlaceholder: string = 'Full Name';
  phonePlaceholder: string = 'Phone Number';
  emailPlaceholder: string = 'Email ID';
  locationPlaceholder: string = 'Preferred state / city';

  private locationTexts = [
    "Preferred state / city", 
    "Andhra Pradesh", 
    "Arunachal Pradesh", 
    "Assam", 
    "Bihar", 
    "Chhattisgarh", 
    "Goa", 
    "Gujarat", 
    "Haryana", 
    "Himachal Pradesh", 
    "Jharkhand", 
    "Karnataka", 
    "Kerala", 
    "Madhya Pradesh", 
    "Maharashtra", 
    "Manipur", 
    "Meghalaya", 
    "Mizoram", 
    "Nagaland", 
    "Odisha", 
    "Punjab", 
    "Rajasthan", 
    "Sikkim", 
    "Tamil Nadu", 
    "Telangana", 
    "Tripura", 
    "Uttar Pradesh", 
    "Uttarakhand", 
    "West Bengal", 
    "Andaman and Nicobar Islands", 
    "Chandigarh", 
    "Daman and Diu", 
    "Lakshadweep", 
    "Delhi", 
    "Puducherry", 
    "Jammu and Kashmir", 
    "Ladakh"
  ];
  
  // Icons to be used
  
  faUser = faUser;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faMapMarkerAlt = faMapMarkerAlt;
  faList = faList;
quoteForm: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Initial placeholder values

    this.locationPlaceholder = "Preferred state / city";
  }

  ngAfterViewInit(): void {
    // Only execute the typing effect in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.startTypingEffect(this.locationTexts, (text) => this.locationPlaceholder = text, 50, 200);
    }
  }

  private startTypingEffect(
    texts: string[], 
    updatePlaceholder: (text: string) => void, 
    typingSpeed: number, 
    delayBetweenTexts: number
  ): void {
    let textIndex = 0;
    let charIndex = 0;
    let currentText = texts[textIndex];
    let isDeleting = false;

    const type = () => {
      if (isDeleting) {
        if (charIndex > 0) {
          updatePlaceholder(currentText.substring(0, charIndex - 1));
          charIndex--;
          setTimeout(type, typingSpeed);  // Deleting speed
        } else {
          setTimeout(() => {
            textIndex = (textIndex + 1) % texts.length;
            currentText = texts[textIndex];
            isDeleting = false;
            type();
          }, delayBetweenTexts);
        }
      } else {
        if (charIndex < currentText.length) {
          updatePlaceholder(currentText.substring(0, charIndex + 1));
          charIndex++;
          setTimeout(type, typingSpeed); 
        } else {
          setTimeout(() => {
            isDeleting = true;
            type();
          }, delayBetweenTexts);
        }
      }
    };

    type();
  }
}
