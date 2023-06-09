import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OutDictionary } from 'src/app/classes/Dictionaries/Dictionaries';
import { RemoveDictionaryConfirmComponent } from '../remove-dictionary-confirm/remove-dictionary-confirm.component';
import { DictionariesService } from 'src/app/services/customDictionary/dictionary-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DictionaryDetailsEditComponent } from '../dictionary-details-edit/dictionary-details-edit.component';
import { DictionaryWordDetailsComponent } from '../dictionary-word-details/dictionary-word-details.component';

@Component({
  selector: 'app-dictionary-details',
  templateUrl: './dictionary-details.component.html',
  styleUrls: ['./dictionary-details.component.css'],
})
export class DictionaryDetailsComponent {

  constructor(private diag: MatDialog, private snackBar: MatSnackBar, private dictionaryService: DictionariesService){}
  @Input()
  dictionary!: OutDictionary;
  
  @Output()
  deleted: EventEmitter<any> = new EventEmitter();
  @Output()
  updated: EventEmitter<any> = new EventEmitter();
  
  EditDictionary(){
    const dialogRef = this.diag.open(DictionaryDetailsEditComponent, { enterAnimationDuration: '200', disableClose: true});
    dialogRef.componentInstance.dictionary = this.dictionary;

    dialogRef.afterClosed()
      .subscribe(res =>{
        if(!res)
          return;
        
        this.dictionaryService.UpdateDictionary(dialogRef.componentInstance.dictionary)
        .subscribe(updated =>{

          this.updated.emit();
          this.snackBar.open(`O dicionário customizado '${this.dictionary.name}' foi atualizado.`, 'Fechar');
        })
      })
  }

  RemoveDictionary(){
    let diag = this.diag.open(RemoveDictionaryConfirmComponent);
    diag.componentInstance.dict = this.dictionary;
    diag.afterClosed()
    .subscribe(result =>{
      if(!result)
        return;

        this.dictionaryService.DeleteDictionary(this.dictionary.id)
        .subscribe(res =>{
          this.deleted.emit();
          this.snackBar.open(`O dicionário customizado '${this.dictionary.name}' foi apagado definitivamente.`, 'Fechar');
        });
      })
  }

  VisualizeMobileWords(){
    let diag = this.diag.open(DictionaryWordDetailsComponent, {height: '80vh', width: '70vw'});
    diag.componentInstance.words = this.dictionary.words;    
  }
}
