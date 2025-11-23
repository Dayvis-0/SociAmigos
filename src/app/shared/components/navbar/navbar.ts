import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  searchOpen = false;
  searchQuery = '';
  userMenuOpen = false;

  constructor(private router: Router) {}

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  closeUserMenu(): void {
    this.userMenuOpen = false;
  }

  logout(): void {
    alert('Sesión cerrada');
    this.router.navigate(['/auth/login']);
  }
}