import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mechanic-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mechanic-profile.component.html',
  styleUrl: './mechanic-profile.component.scss',
})
export class MechanicProfileComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  specialization: string = '';
  certifications: string = '';
  experience: number = 0;
}
