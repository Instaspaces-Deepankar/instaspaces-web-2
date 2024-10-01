import {Component, OnInit} from '@angular/core';
import { VirtualOfficeFormComponent } from "./virtual-office-form/virtual-office-form.component";
import { WhatIsVirtualOfficeComponent } from "./what-is-virtual-office/what-is-virtual-office.component";
import { BenefitsOfVoComponent } from "./benefits-of-vo/benefits-of-vo.component";
import { WhyChooseVoComponent } from "./why-choose-vo/why-choose-vo.component";
import { VoLocationsComponent } from "./vo-locations/vo-locations.component";
import { VoHelplineComponent } from "./vo-helpline/vo-helpline.component";
import { VoNeedHelpComponent } from "./vo-need-help/vo-need-help.component";
import { VoFaqComponent } from "./vo-faq/vo-faq.component";
import { VirtualOfficePlanComponent } from "./virtual-office-plan/virtual-office-plan.component";
import {ContactFormComponent} from "../forms/contact-form/contact-form.component";
import {PricingPlansComponent} from "./pricing-card/pricing-card.component";
import {AddOnServicesComponent} from "./add-on-services/add-on-services.component";
import {Meta, Title} from "@angular/platform-browser";
// import {RequestCallBackComponent} from "../forms/contact-popup/request-call-back.component";

@Component({
  selector: 'app-virtual-office-page',
  standalone: true,
  imports: [VirtualOfficeFormComponent, WhatIsVirtualOfficeComponent, BenefitsOfVoComponent, WhyChooseVoComponent, VoLocationsComponent, VoHelplineComponent, VoNeedHelpComponent, VoFaqComponent, VirtualOfficePlanComponent, ContactFormComponent, PricingPlansComponent, AddOnServicesComponent],
  templateUrl: './virtual-office-page.component.html',
  styleUrls: ['./virtual-office-page.component.scss'],
})
export class VirtualOfficePageComponent implements OnInit{
  title = 'Virtual Office for GST Registration PAN India | Instaspaces';

    constructor(   private titleService: Title,
                   private metaTagService: Meta,) {}

    ngOnInit(): void {

      this.titleService.setTitle(this.title);

    }

}
