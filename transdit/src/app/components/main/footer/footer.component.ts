import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsetermsComponent } from '../useterms/useterms.component';
import { UseinformationsComponent } from '../useinformations/useinformations.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentDate = new Date();

  constructor(public dialog: MatDialog){ }


  showUseTerms(){
    const dialogRef = this.dialog.open(UsetermsComponent, { enterAnimationDuration: '200'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showUseInformations(){
    const dialogRef = this.dialog.open(UseinformationsComponent, { enterAnimationDuration: '200'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
