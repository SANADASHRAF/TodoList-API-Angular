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
  message: string = ''; // متغير جديد لتخزين الـ message

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.message = ''; // ريست الرسالة قبل الطلب
    this.apiService.login(this.email, this.password).subscribe({
      next: (response: ApiResponse<any>) => {
        this.message = response.message; // خزن الـ message سواء نجاح أو فشل
        if (response.success) {
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/tasks']);
        }
      },
      error: (err: any) => {
        console.log('Login Error:', err);
        this.message = err.status === 400 ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'حصل خطأ أثناء تسجيل الدخول';
      }
    });
  }
}