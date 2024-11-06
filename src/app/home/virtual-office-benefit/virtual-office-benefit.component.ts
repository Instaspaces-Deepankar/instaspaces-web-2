import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestCallBackComponent } from '../../forms/contact-popup/request-call-back.component';

@Component({
  selector: 'app-virtual-office-benefit',
  standalone: true,
  imports: [],
  templateUrl: './virtual-office-benefit.component.html',
  styleUrls: ['./virtual-office-benefit.component.scss']
})
export class VirtualOfficeBenefitComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(RequestCallBackComponent);
  }

  isVisible: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const element = document.querySelector('.promise-container');
    if (element) {
      const rect = element.getBoundingClientRect();
      const topVisible = rect.top < window.innerHeight && rect.top >= 0;
      if (topVisible) {
        this.isVisible = true;
      }
    }
  }
}
