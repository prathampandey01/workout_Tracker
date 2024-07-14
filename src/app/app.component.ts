import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { VisibilityService } from './services/visibility.service';
// import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WorkoutFormComponent, WorkoutListComponent,AsyncPipe],
  template: `
    <h1>Workout Tracker</h1>
    <app-workout-form></app-workout-form>
    <button (click)="toggleWorkoutList()">{{ showListButtonText }}</button>
    <ng-container *ngIf="showList$ | async">
      <app-workout-list></app-workout-list>
    </ng-container>
  `,
  styles: [`
    :host {
      max-width: 1200px;
      margin: 0 auto;
      display: block;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    button {
      display: block;
      margin: 20px auto;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  `]
})
export class AppComponent {
  private visibilityService = inject(VisibilityService);
  showList$ = this.visibilityService.showList$;
  showListButtonText = 'Show Workout List';

  toggleWorkoutList(): void {
    this.visibilityService.toggleListVisibility();
    this.showListButtonText = this.showListButtonText === 'Show Workout List' ? 'Hide Workout List' : 'Show Workout List';
  }
}
