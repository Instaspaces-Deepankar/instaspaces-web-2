import {
  Component,
  EventEmitter,
  Output,
  Input,
  HostListener,
  OnInit,
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLinkActive} from "@angular/router";

@Component({
  selector: 'instaspaces-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    RouterLinkActive
  ]
})
export class HeaderComponent implements OnInit {
  @Input() topFixed: boolean = false;
  @Output() toggleMenu = new EventEmitter<void>();
  isScrolled: boolean = false;
  isMenuOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleMenu.emit();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.isScrolled = scrollPosition !== 0;
  }
}
