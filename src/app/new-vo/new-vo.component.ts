import { Component } from '@angular/core';
import { VoHeroComponent } from "./vo-hero/vo-hero.component";
import { VoOfferingsComponent } from "./vo-offerings/vo-offerings.component";
import { StatsComponent } from "./stats/stats.component";
import { HappyCustomerComponent } from './happy-customer/happy-customer.component';
import { WhyChooseUsComponent } from "../home/why-choose-us/why-choose-us.component";
import { MoneyBannerComponent } from "./money-banner/money-banner.component";
import { ProcessComponent } from "./process/process.component";
import { UniqueFeaturesComponent } from "./unique-features/unique-features.component";
import { TrustedReviewsComponent } from "./trusted-reviews/trusted-reviews.component";
import { ContactFormComponent } from "../forms/contact-form/contact-form.component";
import { FaqsComponent } from "../home/faqs/faqs.component";

@Component({
  selector: 'app-new-vo',
  standalone: true,
  imports: [VoHeroComponent, VoOfferingsComponent, StatsComponent, HappyCustomerComponent, WhyChooseUsComponent, MoneyBannerComponent, ProcessComponent, UniqueFeaturesComponent, TrustedReviewsComponent, ContactFormComponent, FaqsComponent],
  templateUrl: './new-vo.component.html',
  styleUrl: './new-vo.component.scss'
})
export class NewVoComponent {

}
