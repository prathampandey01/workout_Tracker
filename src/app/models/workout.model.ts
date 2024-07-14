export interface Workout {
    id: number;
    userName: string;
    date: Date;
    exercises: Exercise[];
    minutes: number;
  }
  
  export interface Exercise {
    workoutType: WorkoutType;
    minutes: number;
  }
  
  export type WorkoutType = '' | 'Running' | 'Cycling' | 'Swimming' | 'Weight-lifting';