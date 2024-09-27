import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VirtualOfficePageComponent } from './virtual-office-page/virtual-office-page.component';
import { FooterComponent } from "./layout/footer/footer.component";
import { HeaderComponent } from './layout/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VirtualOfficePageComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'instaspaces-web-v2';
}
