import {Component, HostListener, Inject, Renderer2} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {VirtualOfficePageComponent} from './virtual-office-page/virtual-office-page.component';
import {FooterComponent} from "./layout/footer/footer.component";
import {HeaderComponent} from './layout/header/header.component';
import {WhatsappButtonComponent} from "./forms/whatsapp-button/whatsapp-button.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Meta, Title} from "@angular/platform-browser";
import {ContactService} from "./services/contact.service";
import {isPlatformBrowser} from '@angular/common';
import {PLATFORM_ID} from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VirtualOfficePageComponent, FooterComponent, HeaderComponent, WhatsappButtonComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'instaspaces-web-v2';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private metaTagService: Meta,
    private commonService: ContactService,
    private router: Router,
    private renderer: Renderer2
  ) {
    // Ensure this only runs in the browser (not server-side rendering)
    if (isPlatformBrowser(this.platformId)) {
      this.manageScriptBasedOnView();  // Add or remove script on initial load
    }
  }

  // Listen to window resize events
  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.manageScriptBasedOnView();  // Trigger script management on resize
    }
  }

  // Check window size and manage BotPenguine script accordingly
  manageScriptBasedOnView(): void {
    if (window.innerWidth > 768) {
      this.addScript();   // Add script for screens larger than 768px
    } else {
      this.removeScript();  // Remove script for smaller screens
    }
  }

  // Add BotPenguine script to the DOM
  addScript(): void {
    document.querySelectorAll('.botpenguin-right').forEach(el => {
      this.renderer.setStyle(el, 'display', 'block');  // Ensure the widget is visible
    });

    if (!document.getElementById('messenger-widget-b')) {
      const script = this.renderer.createElement('script');
      this.renderer.setAttribute(script, 'id', 'messenger-widget-b');
      this.renderer.setAttribute(script, 'src', 'https://cdn.botpenguin.com/website-bot.js');
      this.renderer.setAttribute(script, 'defer', '');
      script.innerHTML = '668fa50399f33102a0a9e39a,6641fd1f240d7122ecdb038a';  // BotPenguine IDs
      this.renderer.appendChild(document.body, script);  // Add the script to the DOM
    }
  }

  // Remove BotPenguine script from the DOM
  removeScript(): void {
    document.querySelectorAll('.botpenguin-right').forEach(el => {
      this.renderer.setStyle(el, 'display', 'none');  // Hide the widget
    });

    const script = document.getElementById('messenger-widget-b');
    if (script) {
      console.log('Removing script:', script);
      script.parentNode?.removeChild(script);  // Remove the script if it exists
    } else {
      console.log('Script not found');
    }
  }
}
