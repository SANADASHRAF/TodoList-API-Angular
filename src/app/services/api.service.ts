import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/response.model';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { Priority } from '../models/priority.model';
import { Category } from '../models/category.model';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://job201092001-001-site1.ptempurl.com/api';

  constructor(private http: HttpClient) {}


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  login(email: string, password: string): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.baseUrl}/Authentication/login`, { email, password });
  }
  

  register(userName: string, email: string, password: string): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.baseUrl}/Authentication/Register`, { userName, email, password });
  }

  


  getAllTaskPriorities(): Observable<ApiResponse<Priority[]>> {
    return this.http.get<ApiResponse<Priority[]>>(`${this.baseUrl}/Static/GetAllTaskPriorities`, { headers: this.getHeaders() });
  }

  getAllTaskCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(`${this.baseUrl}/Static/GetAllTaskCategories`, { headers: this.getHeaders() });
  }

  getAllStatuses(): Observable<ApiResponse<Status[]>> {
    return this.http.get<ApiResponse<Status[]>>(`${this.baseUrl}/Static/GetAllStatuses`, { headers: this.getHeaders() });
  }


  
  createTask(task: any): Observable<ApiResponse<Task>> {
    return this.http.post<ApiResponse<Task>>(`${this.baseUrl}/Task/CreateTask`, task, { headers: this.getHeaders() });
  }

  updateTask(task: any): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.baseUrl}/Task/UpdateTask`, task, { headers: this.getHeaders() });
  }

  deleteTask(taskId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/Task/DeleteTask?taskId=${taskId}`, { headers: this.getHeaders() });
  }

  getAllTasks(userId: number, pageNumber: number, pageSize: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/Task/GetAllTasks?userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`, { headers: this.getHeaders() });
  }

  getTaskById(taskId: number): Observable<ApiResponse<Task>> {
    return this.http.get<ApiResponse<Task>>(`${this.baseUrl}/Task/GetTaskById?taskId=${taskId}`, { headers: this.getHeaders() });
  }
     
  getCompletedTasks(userId: number): Observable<ApiResponse<Task[]>> {
    return this.http.get<ApiResponse<Task[]>>(`${this.baseUrl}/Task/GetCompletedTasks?userId=${userId}`, { headers: this.getHeaders() });
  }


  getPendingTasks(userId: number): Observable<ApiResponse<Task[]>> {
    return this.http.get<ApiResponse<Task[]>>(`${this.baseUrl}/Task/GetPendingTasks?userId=${userId}`, { headers: this.getHeaders() });
  }


  getTasksByFilter(userId: number, statusId?: number, categoryId?: number, priorityId?: number): Observable<ApiResponse<Task[]>> {
    let url = `${this.baseUrl}/Task/GetTasksByFilter?userId=${userId}`;
    if (statusId) url += `&statusId=${statusId}`;
    if (categoryId) url += `&categoryId=${categoryId}`;
    if (priorityId) url += `&priorityId=${priorityId}`;
    return this.http.get<ApiResponse<Task[]>>(url, { headers: this.getHeaders() });
  }

  getTaskStatistics(userId: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/Task/GetTaskStatistics?userId=${userId}`, { headers: this.getHeaders() });
  }

}