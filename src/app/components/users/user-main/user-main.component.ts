import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { showStateTrigger, usersRoutingAnimations } from 'src/app/helpers/animations/basic-animations';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css'],
  animations:[usersRoutingAnimations, showStateTrigger]
})
export class UserMainComponent {
  constructor(){}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
