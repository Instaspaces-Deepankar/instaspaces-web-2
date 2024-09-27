import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'instaspaces-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule], // Add CommonModule to imports
})
export class HeaderComponent implements OnInit {
  searchText: string = '';
  @Input() topFixed: boolean = false;
  @Output() toggleSidenav = new EventEmitter();
  isScrolled: boolean = false;
  menuList = [];
  isLessThanLargeDevice: boolean = false;
  cartProductCount: any;
  item: any[] = [];
  showTranslate = true;
  isFormVisible = true;
  isDialogOpen = false;
  dialogRef: any;
  fullQueryString: string | null = null;
  isDropdownOpen: boolean = false;
  showMenu = false;
  showSearch = false;
  showLogin = false;
  showHelp = false;
  showContact = false;
  receivedValue: string = '';

  private localStorage: Storage | null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage = window.localStorage;
    } else {
      this.localStorage = null;
    }
  }

  ngOnInit(): void {
    // Uncomment if you have a static menu list
    // this.menuList = staticMenuList;
  }

  toggleTranslate() {
    this.showTranslate = !this.showTranslate;
  }

  routeToVirtualOffice() {
    window.location.href = 'https://www.instaspaces.in/virtual-office/';
  }

  closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  handleCloseForm(): void {
    this.isFormVisible = false;
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

  openDialog(templateRef: TemplateRef<any>) {
    if (this.isDialogOpen) {
      this.dialogRef.close();
    } else {
      this.dialogRef = this.dialog.open(templateRef, {
        width: '1000px',
      });

      this.dialogRef.afterClosed().subscribe(() => {
        this.isDialogOpen = false;
      });
      this.isDialogOpen = true;
    }
  }

  contactDialog(templateRef: TemplateRef<any>) {
    if (this.isDialogOpen) {
      this.dialogRef.close();
    } else {
      this.dialogRef = this.dialog.open(templateRef, {});

      this.dialogRef.afterClosed().subscribe(() => {
        this.isDialogOpen = false;
      });
      this.isDialogOpen = true;
    }
  }

  navigateToRouteWithGetQuote() {
    this.fullQueryString = this.router.url.split('?')[1];
    window.location.href =
      'https://www.instaspaces.in/virtual-office/' + (this.fullQueryString ? '?' + this.fullQueryString : '');
  }

  navigateToRouteWithGetDesk() {
    this.fullQueryString = this.router.url.split('?')[1];
    window.location.href =
      'https://desk.instaspaces.in/' + (this.fullQueryString ? '?' + this.fullQueryString : '');
  }

  toggleNavbarDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  handleDropdownItemClick() {
    this.isDropdownOpen = false;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  navigateToVirtualOffices(): void {
    this.showMenu = !this.showMenu;
    this.router.navigate(['virtual-offices']);
  }

  navigateToPartnerWithUs() {
    this.showMenu = !this.showMenu;
    this.router.navigate(['partner']);
  }

  handleSearch(term: string): void {
    console.log('Search term:', term);
    this.toggleSearch();
  }

  handleToggleContactEvent(term: string) {
    console.log('Search term:', term);
    this.toggleContact();
  }

  requestCall(term: string): void {
    console.log('Search term:', term);
    this.toggleHelp();
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

  toggleContact() {
    this.showContact = !this.showContact;
  }
}
