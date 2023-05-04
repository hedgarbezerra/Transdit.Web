import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { debounceTime } from 'rxjs';
import { TranscriptionItem } from 'src/app/classes/Transcriptions/TranscriptionItem';
import { TranscribeComponent } from '../transcribe/transcribe.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
constructor(public dialog: MatDialog){}

  transcriptions: Array<TranscriptionItem> =
  [ {id: 1, name: 'transcrição foda', language: 'pt-br', result: 'textão pica', date: new Date(2020, 1, 30), lengthInSeconds: 4783, inputedFileName: 'aa.flac'}]
  pagination = {
    pageSize: 10,
    pageIndex: 0,
    totalCount: 0
  }

  addTranscription(){
    const dialogRef = this.dialog.open(TranscribeComponent, { enterAnimationDuration: '200'});

    dialogRef.afterClosed().subscribe(result => {
      //recarrega página
    });
  }

}
