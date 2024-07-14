// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { VisibilityService } from './app/services/visibility.service';

bootstrapApplication(AppComponent, {
  providers: [VisibilityService]
})
.catch(err => console.error(err));