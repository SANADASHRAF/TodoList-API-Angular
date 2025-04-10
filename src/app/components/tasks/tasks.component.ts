import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  userId: number = parseInt(localStorage.getItem('userId') || '1', 10); 
  statusId: number | undefined = undefined; 
  categoryId: number | undefined = undefined; 
  priorityId: number | undefined = undefined; 

  
  statuses = [
    { id: 1, name: 'غير مكتمل' },
    { id: 2, name: 'جارى' },
    { id: 3, name: 'مكتمل' }
  ];
  categories = [
    { id: 1, name: 'يومى' },
    { id: 2, name: 'اسبوعى' },
    { id: 3, name: 'سنوى' }
  ];
  priorities = [
    { id: 1, name: 'عالى' },
    { id: 2, name: 'متوسط' },
    { id: 3, name: 'منخفض' }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTasks(); 
  }

  loadTasks() {
    this.apiService.getTasksByFilter(this.userId, this.statusId, this.categoryId, this.priorityId).subscribe({
      next: (response) => {
        if (response.success) {
          this.tasks = response.data || [];
        } else {
          console.log('Failed to load tasks:', response.message);
          this.tasks = [];
        }
      },
      error: (err) => {
        console.log('Error fetching tasks:', err);
        this.tasks = [];
      }
    });
  }

  filterTasks() {
    this.loadTasks();
  }
}