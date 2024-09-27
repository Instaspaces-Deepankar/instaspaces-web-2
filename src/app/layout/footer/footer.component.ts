import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faUserFriends,
  faUndo,
  faFileContract,
  faShieldAlt,
  faQuestionCircle,
  faHome,
  faHandshake,
  faBriefcase,
  faBlog,
  faLocationDot,
  faPhone,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'; // Import brand icons

@Component({
  selector: 'instaspaces-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  public faUserFriends = faUserFriends;
  public faUndo = faUndo;
  public faFileContract = faFileContract;
  public faShieldAlt = faShieldAlt;
  public faQuestionCircle = faQuestionCircle;
  public faHome = faHome;
  public faHandshake = faHandshake;
  public faBriefcase = faBriefcase;
  public faBlog = faBlog;

  public faLocationDot = faLocationDot;
  public faPhone = faPhone;
  public faGlobe = faGlobe;

  // Add Facebook, Twitter, Instagram, and LinkedIn icons
  public faFacebookF = faFacebookF;
  public faTwitter = faTwitter;
  public faInstagram = faInstagram;
  public faLinkedinIn = faLinkedinIn;

  constructor() {}

  ngOnInit(): void {}
}
