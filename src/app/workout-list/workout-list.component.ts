// src/app/workout-list/workout-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../services/workout.services';
import { Workout, WorkoutType } from '../models/workout.model';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="workout-list">
      <h2>Workout List</h2>
      
      <!-- Filters -->
      <div class="filters">
        <input [(ngModel)]="searchTerm" (ngModelChange)="applyFilters()" placeholder="Search by user name">
        <select [(ngModel)]="selectedWorkoutType" (ngModelChange)="applyFilters()">
          <option value="">All workout types</option>
          <option *ngFor="let type of workoutTypes" [value]="type">{{type}}</option>
        </select>
      </div>

      <!-- Workout Table -->
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Date</th>
            <th>Exercises</th>
            <th>Total Minutes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let workout of paginatedWorkouts">
            <td>{{ workout.userName }}</td>
            <td>{{ workout.date | date:'short' }}</td>
            <td>
              <ul>
                <li *ngFor="let exercise of workout.exercises">
                  {{ exercise.workoutType }} - {{ exercise.minutes }} minutes
                </li>
              </ul>
            </td>
            <td>{{ getTotalMinutes(workout) }}</td>
            <td>
              <button (click)="viewPerformanceChart(workout.userName)">View Performance Chart</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="pagination" *ngIf="filteredWorkouts.length > pageSize">
        <button (click)="previousPage()" [disabled]="currentPage === 1">Previous</button>
        <span>Page {{currentPage}} of {{totalPages}}</span>
        <button (click)="nextPage()" [disabled]="currentPage === totalPages">Next</button>
      </div>

      <!-- Performance Chart Modal -->
      <div *ngIf="showChart" class="modal">
        <div class="modal-content">
          <span class="close" (click)="closeChart()">&times;</span>
          <h2>Performance Chart for {{ chartUserName }}</h2>
          <!-- Add your chart component or library here -->
          <div id="chartContainer"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .workout-list {
      margin-top: 20px;
    }
    .filters {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .filters input, .filters select {
      width: 48%;
      padding: 8px;
      font-size: 16px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
    .pagination button {
      padding: 8px 16px;
      cursor: pointer;
    }
    .pagination button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    .modal {
      display: block;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0,0,0);
      background-color: rgba(0,0,0,0.4);
    }
    .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
    }
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  `]
})
export class WorkoutListComponent implements OnInit {
  allWorkouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  paginatedWorkouts: Workout[] = [];
  workoutTypes: WorkoutType[] = ['Running', 'Cycling', 'Swimming', 'Weight-lifting'];
  searchTerm: string = '';
  selectedWorkoutType: WorkoutType = '';
  currentPage: number = 1;
  pageSize: number = 3;
  showChart: boolean = false;
  chartUserName: string = '';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getWorkouts().subscribe(workouts => {
      this.allWorkouts = workouts;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredWorkouts = this.allWorkouts.filter(workout => 
      workout.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedWorkoutType === '' || workout.exercises.some(e => e.workoutType === this.selectedWorkoutType))
    );
    this.currentPage = 1;
    this.updatePaginatedWorkouts();
  }

  updatePaginatedWorkouts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedWorkouts = this.filteredWorkouts.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedWorkouts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedWorkouts();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredWorkouts.length / this.pageSize);
  }

  getTotalMinutes(workout: Workout): number {
    return workout.exercises.reduce((total, exercise) => total + exercise.minutes, 0);
  }

  viewPerformanceChart(userName: string): void {
    this.chartUserName = userName;
    this.showChart = true;
    // Add logic to generate and display the chart
  }

  closeChart(): void {
    this.showChart = false;
  }
}