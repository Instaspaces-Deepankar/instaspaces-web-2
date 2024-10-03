import { Routes } from '@angular/router';
import {VirtualOfficePageComponent} from "./virtual-office-page/virtual-office-page.component";
// import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'virtual-office', redirectTo: 'virtual-office/', pathMatch: 'full' },
  { path: 'virtual-office/', component: VirtualOfficePageComponent },

];
