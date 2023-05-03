import { Component } from '@angular/core';
import { LoadingSpinnerService } from './services/loading-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'transdit';
  constructor(protected spinnerService: LoadingSpinnerService){}
}
