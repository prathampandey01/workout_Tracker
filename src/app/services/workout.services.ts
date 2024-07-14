// src/app/services/workout.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Workout, Exercise } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workouts: Workout[] = [];
  private workoutsSubject = new BehaviorSubject<Workout[]>([]);

  addWorkout(newExercise: Exercise, userName: string): void {
    const existingWorkout = this.workouts.find(w => w.userName.toLowerCase() === userName.toLowerCase());
    
    if (existingWorkout) {
      existingWorkout.exercises.push(newExercise);
      existingWorkout.minutes += newExercise.minutes;
    } else {
      const newWorkout: Workout = {
        id: this.workouts.length + 1,
        userName: userName,
        date: new Date(),
        exercises: [newExercise],
        minutes: newExercise.minutes
      };
      this.workouts.push(newWorkout);
    }
    
    this.workoutsSubject.next(this.workouts);
  }

  getWorkouts(): Observable<Workout[]> {
    return this.workoutsSubject.asObservable();
  }
}