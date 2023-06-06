import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsetermsComponent } from '../useterms/useterms.component';
import { UseinformationsComponent } from '../useinformations/useinformations.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FooterLanguageSelectorComponent } from '../footer-language-selector/footer-language-selector.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentDate = new Date();

  constructor(private bottomSheet: MatBottomSheet,public dialog: MatDialog){ }


  showUseTerms(){
    const dialogRef = this.dialog.open(UsetermsComponent, { enterAnimationDuration: '200'});

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  showUseInformations(){
    const dialogRef = this.dialog.open(UseinformationsComponent, { enterAnimationDuration: '200'});

    dialogRef.afterClosed().subscribe(result => {
       
    });
  }

  showLanguageSelection(){
    let selector = this.bottomSheet.open(FooterLanguageSelectorComponent);

    selector.afterDismissed()
      .subscribe(() =>{
        let lang = selector.instance.selectedLang;
        localStorage.setItem('app-lang', lang);
    })
  }
}
