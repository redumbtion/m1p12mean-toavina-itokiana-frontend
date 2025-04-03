import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { MechanicProfileComponent } from './mechanic-profile/mechanic-profile.component';
import { ManagerProfileComponent } from './manager-profile/manager-profile.component';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ClientProfileComponent,
    MechanicProfileComponent,
    ManagerProfileComponent,
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  currentRole: string | null = null;

  constructor(private authService: AuthService) {
    this.currentRole = this.authService.getCurrentUser()?.role || null;
  }
}
