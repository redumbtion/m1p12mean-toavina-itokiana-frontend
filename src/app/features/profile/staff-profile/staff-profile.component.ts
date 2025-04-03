import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-profile.component.html',
  styleUrl: './staff-profile.component.scss',
})
export class StaffProfileComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  department: string = '';
  position: string = '';
  employeeId: string = '';
}
