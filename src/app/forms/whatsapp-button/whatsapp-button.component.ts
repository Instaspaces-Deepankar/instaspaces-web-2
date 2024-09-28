import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {WhatsappDialogComponent} from "./whatsapp-dialog/whatsapp-dialog/whatsapp-dialog.component";

@Component({
  selector: 'app-whatsapp-button',
  standalone:true,
  imports: [CommonModule, WhatsappDialogComponent],
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss']
})
export class WhatsappButtonComponent {
  isDialogOpen = false;

  openWhatsApp() {
    this.isDialogOpen = true;
    document.body.classList.add('dialog-open');
  }

  closeDialog() {
    this.isDialogOpen = false;
    document.body.classList.remove('dialog-open');
  }
}
