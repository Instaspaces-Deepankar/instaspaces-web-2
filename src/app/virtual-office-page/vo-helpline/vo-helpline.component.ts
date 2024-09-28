import { Component } from '@angular/core';
import {RequestCallBackComponent} from "../../forms/contact-popup/request-call-back.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-vo-helpline',
  standalone: true,
  templateUrl: './vo-helpline.component.html',
  imports: [
    RequestCallBackComponent,
    NgIf
  ],
  styleUrls: ['./vo-helpline.component.scss']
})
export class VoHelplineComponent {

  isPopupOpen = false;  // Variable to control popup visibility

  // Method to open popup
  openPopup() {
    this.isPopupOpen = true;
  }

  // Method to close popup
  closePopup() {
    this.isPopupOpen = false;
  }
}
