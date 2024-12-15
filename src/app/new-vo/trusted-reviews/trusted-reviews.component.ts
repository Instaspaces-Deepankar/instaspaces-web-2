import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var require: any;  // To allow usage of OwlCarousel from the node_modules folder

@Component({
  selector: 'app-trusted-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trusted-reviews.component.html',
  styleUrls: ['./trusted-reviews.component.scss']
})
export class TrustedReviewsComponent {
}