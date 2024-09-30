import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-add-on-services',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './add-on-services.component.html',
  styleUrls: ['./add-on-services.component.scss']
})
export class AddOnServicesComponent {
  addOnServices = [
    { id: 1, title: 'Complimentary standard signage for limited duration', description: 'Improve your chances of getting approvals by placing a complimentary signage for the first 30 days.' ,price: 'Free',recommended: false},
    { id: 2, title: 'Premium Permanent Signage', description: 'Elevate your brand with a premium framed signage solution prominently displayed at your virtual office location.', price: 'Rs. 12000 (Per Year)' ,recommended: false},
    { id: 3, title: 'Application Services', description: 'Access expert GST advisory services or streamline your business registration with our professional CA partner.', price: 'Rs. 4000 + GST (Per Year)',recommended: false },
    { id: 4, title: 'Cloud Storage Plan', description: 'Securely store your books of accounts with our password-protected cloud storage, accessible upon verification.', price: 'Rs. 3600 + GST (Per Year)', recommended: true },
    { id: 5, title: 'Standard Permanent Sticker Signage', description: 'Enhance your visibility and professionalism with permanent sticker signage placed inside the premises.', price: 'Rs. 6000 (Per Year)', recommended: true },
    { id: 6, title: 'IVR (Call Forwarding)', description: 'Optimize communication with our call-forwarding services that connect customers directly to your team.', price: 'Rs. 12000 (Per Year)' ,recommended: false}
  ];
}
