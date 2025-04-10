import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  // login() {
  //   this.message = '';
  //   this.apiService.login(this.email, this.password).subscribe({
  //     next: (response: ApiResponse<any>) => {
  //       this.message = response.message;
  //       if (response.success) {
  //         localStorage.setItem('token', response.data.token);
  //         this.router.navigate(['/tasks']);
  //       }
  //     },
  //     error: (err) => this.message = err.status === 400 ? 'بيانات غير صحيحة' : 'خطأ فى تسجيل الدخول'
  //   });
  // }
  
  login() {
    this.message = '';
    this.apiService.login(this.email, this.password).subscribe({
      next: (response: ApiResponse<any>) => {
        this.message = response.message;
        if (response.success) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId || '1'); // افترض إن الـ API بيرجع userId
          this.router.navigate(['/tasks']);
        }
      },
      error: (err) => this.message = err.status === 400 ? 'بيانات غير صحيحة' : 'خطأ فى تسجيل الدخول'
    });
  }

  goToRegister() {
    this.router.navigate(['/register']); 
  }
}