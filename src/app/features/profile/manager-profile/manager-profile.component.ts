import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-profile.component.html',
  styleUrl: './manager-profile.component.scss',
})
export class ManagerProfileComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  department: string = '';
  position: string = '';
  employeeId: string = '';
}
