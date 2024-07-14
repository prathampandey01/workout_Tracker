import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private showListSubject = new BehaviorSubject<boolean>(false);
  showList$ = this.showListSubject.asObservable();

  toggleListVisibility() {
    const currentValue = this.showListSubject.value;
    this.showListSubject.next(!currentValue);
  }
}