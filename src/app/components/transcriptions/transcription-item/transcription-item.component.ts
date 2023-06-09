import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExportFormat } from 'src/app/classes/Transcriptions/ExportFormat.enum';
import { TranscriptionItem } from 'src/app/classes/Transcriptions/TranscriptionItem';
import { base64ToArrayBuffer,  saveData } from 'src/app/helpers/HelperFunctions';
import { ExportService } from 'src/app/services/transcriptions/export.service';
import { TranscriptionItemExportconfirmComponent } from '../transcription-item-exportconfirm/transcription-item-exportconfirm.component';
import * as moment from 'moment';
import { TranscriptionsService } from 'src/app/services/transcriptions/transcriptions.service';
import { TranscriptionItemTranscribeconfirmComponent } from '../transcription-item-transcribeconfirm/transcription-item-transcribeconfirm.component';
import { TranscribeResultComponent } from '../transcribe-result/transcribe-result.component';

@Component({
  selector: 'app-transcription-item',
  templateUrl: './transcription-item.component.html',
  styleUrls: ['./transcription-item.component.css']
})
export class TranscriptionItemComponent {
  constructor(private exportService: ExportService, private dialog: MatDialog, private transcriber: TranscriptionsService ){}

  @Input()
  transcription!: TranscriptionItem;
  showResult = false;

  get AllowFromStorage(): boolean{
    let now = moment();
    let transcriptionDate = moment(this.transcription.date);
    return now.diff(transcriptionDate, 'days') <= 3
  }

  exportPdf(){
    this.exportService.exportPdf(this.transcription.name, this.transcription.result)
  }

  exportTxt(){
    this.exportService.exportTxt(this.transcription.name, this.transcription.result)
  }

  exportDocx(){
    this.exportService.exportDocx(this.transcription.name, this.transcription.result)
  }

  TranscreverStorage(){
    let diag = this.dialog.open(TranscriptionItemTranscribeconfirmComponent);
    diag.componentInstance.transcription = this.transcription;
    
    diag.afterClosed()
    .subscribe(res =>{
      if(res){
        this.transcriber.TranscribeFromStorage(this.transcription.storageFileName, this.transcription.language)
        .subscribe(res =>{
          let transcriptioDiag = this.dialog.open(TranscribeResultComponent, { enterAnimationDuration: '200', width: '90vw', height: '90vh', disableClose: true});
          transcriptioDiag.componentInstance.result = res;
          transcriptioDiag.componentInstance.name = this.transcription.name;
        })
      }
    })

  }
}
