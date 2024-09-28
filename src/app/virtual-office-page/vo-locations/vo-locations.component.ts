import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RequestCallBackComponent} from "../../forms/contact-popup/request-call-back.component";


@Component({
  selector: 'app-vo-locations',
  standalone: true,
  imports: [CommonModule, RequestCallBackComponent],
  templateUrl: './vo-locations.component.html',
  styleUrls: ['./vo-locations.component.scss']
})
export class VoLocationsComponent {
  isPopupOpen = false;

  openPopup(event: Event): void {
    event.stopPropagation(); // Prevent click event from propagating to parent elements
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }
}
