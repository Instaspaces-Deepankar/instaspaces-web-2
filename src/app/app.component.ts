import {Component, HostListener, Inject, OnInit, Renderer2} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {VirtualOfficePageComponent} from './virtual-office-page/virtual-office-page.component';
import {FooterComponent} from "./layout/footer/footer.component";
import {WhatsappButtonComponent} from "./forms/whatsapp-button/whatsapp-button.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Meta, Title} from "@angular/platform-browser";
import {ContactService} from "./services/contact.service";
import {isPlatformBrowser} from '@angular/common';
import {PLATFORM_ID} from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VirtualOfficePageComponent,HeaderComponent, FooterComponent, WhatsappButtonComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'instaspaces';
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.addTags([
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
      { name: 'description', content: 'Get virtual office spaces for GST registration. InstaSpaces provides Virtual Office in Mumbai, Chennai, Delhi, Gurgaon, Kolkata, Bangalore and PAN India.' },
      { name: 'author', content: 'Akshay Rautela' },
      { name: 'language', content: 'EN' },
      { name: 'HandheldFriendly', content: 'true' },
      { name: 'copyright', content: '2018 instaspaces.in' },
      { 'http-equiv': 'Cache-control', content: 'public' },
      { name: 'keywords', content: 'Virtual Office, Meeting Rooms, Virtual Office for GST Registration, Virtual Office Address, Virtual Office for E-commerce Sellers, Conference Room, Training Room, Virtual Office Services, Virtual Office in Delhi, Virtual Office Space, Virtual Office Space in Gurgaon, Virtual Office for Business registration, Instaspaces, Instaspaces Virtual Office, Virtual Office in Mumbai, Virtual Business Address, Virtual Office India, Virtual Address for GST Registration, Office Address, Virtual Office Rental, Virtual Office mailing address, Virtual Office in Bangalore, Virtual Office in Kochi, Wework Virtual Office, Virtual Office in Noida, Virtual Office in Hyderabad, Virtual Office for Company Registration, Cheapest Virtual Office, Office Space Virtual, Virtual Office Space for Rent, Virtual Office Space India, Best Virtual Office Services, Virtual office Service Provider, Virtual Office assistant service, Virtual Office for Rental, Virtual Office Rental Services, Cheap Virtual Office in Bangalore' },
      { name: 'distribution', content: 'Global' },
      { name: 'rating', content: 'General' },
      { name: 'google-site-verification', content: '0ElO6-o5QL0snLLQethVjpsOy_5e1qmTZWkfecm4rKA' },
      { name: 'robots', content: 'index, follow' },
      { name: 'revisit-after', content: '1 day' },
      { name: 'publisher', content: 'www.instaspaces.in' },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Virtual Office Spaces, Virtual Offices for GST Registration | InstaSpaces' },
      { property: 'og:description', content: 'Get virtual office address for GST, Business registration anywhere in India. InstaSpaces provides Virtual Office Space in Mumbai, Chennai, Delhi, Gurgaon, Kolkata, Bangalore and PAN India.' },
      { property: 'og:url', content: '//www.instaspaces.in/virtual-office/' },
      { property: 'og:site_name', content: 'Virtual Office Address in India - InstaSpaces' },
      { property: 'og:image', content: 'https://instaspaceweb.s3.amazonaws.com/webimage/Instaspaces%20Portfolio.jpg' },
      { itemprop: 'name', content: 'Virtual Office Spaces, Virtual Offices for GST Registration | InstaSpaces' },
      { itemprop: 'description', content: 'Get virtual office address for GST, Business registration anywhere in India. InstaSpaces provides Virtual Office Space in Mumbai, Chennai, Delhi, Gurgaon, Kolkata, Bangalore and PAN India.' },
      { itemprop: 'image', content: 'https://instaspaceweb.s3.amazonaws.com/webimage/Instaspaces%20Portfolio.jpg' }

    ]);


    this.metaTagService.addTag({ name: 'robots', content: 'index, follow' });
  }
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
