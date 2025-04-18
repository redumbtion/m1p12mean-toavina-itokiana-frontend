import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { MechanicDashboardComponent } from './mechanic-dashboard/mechanic-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ClientDashboardComponent,
    MechanicDashboardComponent,
    ManagerDashboardComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  currentRole: string | null = null;

  constructor(private authService: AuthService) {
    this.currentRole = this.authService.getCurrentUser()?.role || null;
  }
}
