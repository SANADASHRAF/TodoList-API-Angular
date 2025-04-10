import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  Username: string = '';
  Email: string = '';
  Password: string = '';
  message: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  register() {
    this.message = '';
    this.apiService.register(this.Username, this.Email, this.Password).subscribe({
      next: (response: ApiResponse<any>) => {
        this.message = response.message;
        if (response.success) {
          if (response.data?.token) {
            localStorage.setItem('token', response.data.token);
          }
          this.router.navigate(['/']); 
        }
      },
      error: (err) => {
        console.log('Register Error:', err);
        this.message = err.status === 400 ? 'بيانات غير صحيحة' : 'خطأ فى التسجيل';
      }
    });
  }
}