// header.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen: boolean = false;

  dropdownOpen: { [key: string]: boolean } = {
    admin: false,
    user: false,
  };

  constructor(private router: Router) {}

  goToHomePage(): void {
    this.router.navigate(['/']);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleDropdown(dropdownKey: string): void {
    this.dropdownOpen[dropdownKey] = !this.dropdownOpen[dropdownKey];
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeMenu();
  }

  private closeMenu(): void {
    this.menuOpen = false;
    for (const key in this.dropdownOpen) {
      this.dropdownOpen[key] = false;
    }
  }
}
