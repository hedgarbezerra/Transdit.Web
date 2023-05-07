import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmAccount } from 'src/app/classes/Users/Users';
import { getQueryVariable } from 'src/app/helpers/HelperFunctions';
import { UsersService } from 'src/app/services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { UsetermsComponent } from '../../main/useterms/useterms.component';
import { UseinformationsComponent } from '../../main/useinformations/useinformations.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  constructor(private router: Router, private userService : UsersService, private snackBar: MatSnackBar, private dialog: MatDialog){}

  get token(): string | null{
    return getQueryVariable("token");
  }
  get user(): string | null{
    return getQueryVariable("user");
  }
  get name(): string | null{
    return getQueryVariable("name");
  }

  get shouldConfirm(): boolean{
    return this.token != null && this.user != null;
  }

  ngOnInit(): void {
    if(!this.shouldConfirm)
      return;

    let confirmation = { email: this.user ?? '', token: this.token ?? '' } as ConfirmAccount;
    this.userService.ConfirmAccount(confirmation)
    .subscribe(result =>{
      let message = result.messages.join(' \n');
      this.snackBar.open(message, 'Fechar', { duration: 5000, });
    });
  }

  showUseTerms(){
    const dialogRef = this.dialog.open(UsetermsComponent, { enterAnimationDuration: '200'});
  }

  showUseInfo(){
    const dialogRef = this.dialog.open(UseinformationsComponent, { enterAnimationDuration: '200'});
  }
}
