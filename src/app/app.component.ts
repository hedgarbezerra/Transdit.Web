import { Component } from '@angular/core';
import { LoadingSpinnerService } from './services/loading-spinner.service';
import { routesAnimations } from './helpers/animations/basic-animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[routesAnimations]
})
export class AppComponent {
  title = 'transdit';
  constructor(protected spinnerService: LoadingSpinnerService) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
