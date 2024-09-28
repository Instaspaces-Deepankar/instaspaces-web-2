import {
  Component,
  EventEmitter,
  Output,
  Input,
  HostListener,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {faPhone, faTimes} from '@fortawesome/free-solid-svg-icons';
import {ContactPopOverComponent} from "../../forms/callback/contact-pop-over.component";  // Import the phone icon

@Component({
  selector: 'instaspaces-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    RouterLinkActive,
    FaIconComponent,
    ContactPopOverComponent,
    // Import MatDialogModule
  ]
})
export class HeaderComponent implements OnInit {
  @Input() topFixed: boolean = false;
  @Output() toggleMenu = new EventEmitter<void>();
  isScrolled: boolean = false;
  isMenuOpen: boolean = false;

  public faPhone = faPhone; // Phone icon from FontAwesome
  public faTimes = faTimes; // Phone icon from FontAwesome

  constructor() {} // Inject MatDialog

  ngOnInit(): void {}

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleMenu.emit();
  }

  showContact = false;

  toggleContact() {
    this.showContact = !this.showContact;
  }
  handletoggleContactEvent(term: string){
    console.log('Search term:', term);
    this.toggleContact();
  }

}
