import { Routes } from '@angular/router';
import {VirtualOfficePageComponent} from "./virtual-office-page/virtual-office-page.component";
// import {CareerComponent} from "./career/career.component";
// import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
// import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'virtual-office', redirectTo: 'virtual-office/', pathMatch: 'full' },
  { path: 'virtual-office/', component: VirtualOfficePageComponent },
  // { path: 'WeCareAboutPrivacy', redirectTo: 'WeCareAboutPrivacy/', pathMatch: 'full' },
  // { path: 'WeCareAboutPrivacy/', component: PrivacyPolicyComponent },
  // { path: 'careers', redirectTo: 'careers/', pathMatch: 'full' },
  // { path: 'careers/', component: CareerComponent },

];
