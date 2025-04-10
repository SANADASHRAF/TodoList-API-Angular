import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllTasks(5, 1, 10).subscribe({
      next: (response) => {
        if (response.success) {
          this.tasks = response.data.tasks;
        }
      },
      error: (err) => console.log(err)
    });
  }
}