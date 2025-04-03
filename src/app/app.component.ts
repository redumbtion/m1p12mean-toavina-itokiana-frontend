import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isAuthenticated = false;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
