// src/app/workout-form/workout-form.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../services/workout.services';
import { Workout, WorkoutType, Exercise } from '../models/workout.model';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" #workoutForm="ngForm">
      <div>
        <label for="userName">User Name:</label>
        <input type="text" id="userName" name="userName" [(ngModel)]="workout.userName" required>
      </div>
      <div>
        <label for="workoutType">Workout Type:</label>
        <select id="workoutType" name="workoutType" [(ngModel)]="exercise.workoutType" required>
          <option value="">Select a workout type</option>
          <option *ngFor="let type of workoutTypes" [value]="type">{{type}}</option>
        </select>
      </div>
      <div>
        <label for="minutes">Minutes:</label>
        <input type="number" id="minutes" name="minutes" [(ngModel)]="exercise.minutes" required min="1">
      </div>
      <button type="submit" [disabled]="!workoutForm.form.valid">Add Workout</button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 300px;
      margin: 20px auto;
    }
    label {
      font-weight: bold;
    }
    input, select {
      width: 100%;
      padding: 5px;
      font-size: 16px;
    }
    button {
      padding: 10px;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:disabled {
      background-color: #cccccc;
    }
  `]
})
export class WorkoutFormComponent {
  workout: Workout = {
    id: 0,
    userName: '',
    date: new Date(),
    exercises: [],
    minutes: 0
  };

  exercise: Exercise = {
    workoutType: '',
    minutes: 0
  };

  workoutTypes: WorkoutType[] = ['Running', 'Cycling', 'Swimming', 'Weight-lifting'];

  constructor(private workoutService: WorkoutService) {}

  onSubmit(): void {
    const newWorkout: Workout = {
      ...this.workout,
      date: new Date(),
      exercises: [{ ...this.exercise }],
      minutes: this.exercise.minutes
    };
    this.workoutService.addWorkout(this.exercise, newWorkout.userName);
    this.resetForm();
  }

  resetForm(): void {
    this.workout = {
      id: 0,
      userName: '',
      date: new Date(),
      exercises: [],
      minutes: 0
    };
    this.exercise = {
      workoutType: '',
      minutes: 0
    };
  }
}