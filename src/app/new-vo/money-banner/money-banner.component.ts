import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-money-banner',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './money-banner.component.html',
  styleUrls: ['./money-banner.component.scss']
})
export class MoneyBannerComponent {}
