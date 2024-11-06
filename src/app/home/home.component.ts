import { Component } from '@angular/core';
import { SliderComponent } from "./slider/slider.component";
import { FaqsComponent } from './faqs/faqs.component';
import { ContactFormComponent } from "../forms/contact-form/contact-form.component";
import { PlansTableComponent } from './plans-table/plans-table.component';
import { FeaturedPlanComponent } from "./featured-plan/featured-plan.component";
import { WhyChooseUsComponent } from "./why-choose-us/why-choose-us.component";
import { VirtualOfficeBenefitComponent } from "./virtual-office-benefit/virtual-office-benefit.component";
import { OurProcessComponent } from "./our-process/our-process.component";
import { IndiaMapComponent } from "./india-map/india-map.component";
import { MobileMapComponent } from "./mobile-map/mobile-map.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, FaqsComponent, ContactFormComponent, PlansTableComponent, FeaturedPlanComponent, WhyChooseUsComponent, VirtualOfficeBenefitComponent, OurProcessComponent, IndiaMapComponent, MobileMapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  
}
