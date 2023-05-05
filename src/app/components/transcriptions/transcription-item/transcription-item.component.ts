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
    let diag = this.dialog.open(TranscriptionItemExportconfirmComponent);
    diag.componentInstance.format = 'PDF';
    diag.afterClosed()
    .subscribe(res => {
      if(res){
        this.exportService.ExportTranscriptionResult(this.transcription.result, ExportFormat.PDF)
        .subscribe(res => {
            var bytes = base64ToArrayBuffer(res);
            saveData(bytes, 'application/pdf', `${this.transcription.name}.pdf`);
        })
      }
    })
  }

  exportTxt(){
    let diag = this.dialog.open(TranscriptionItemExportconfirmComponent);
    diag.componentInstance.format = 'TXT';

    diag.afterClosed()
    .subscribe(res => {
      if(res){
        this.exportService.ExportTranscriptionResult(this.transcription.result, ExportFormat.TXT)
        .subscribe(res => {
          var bytes = base64ToArrayBuffer(res);
          saveData(bytes, 'text/plain',  `${this.transcription.name}.txt`);
        })
      }
    });
  }

  exportDocx(){
    let diag = this.dialog.open(TranscriptionItemExportconfirmComponent);
    diag.componentInstance.format = 'DOCX'

    diag.afterClosed()
    .subscribe(res => {
      if(res){
        this.exportService.ExportTranscriptionResult(this.transcription.result, ExportFormat.DOCX)
        .subscribe(res =>{
          var bytes = base64ToArrayBuffer(res);
          saveData(bytes, 'application/vnd.openxmlformats',  `${this.transcription.name}.docx`);
        })
      }
    });
  }

  TranscreverStorage(){
    let diag = this.dialog.open(TranscriptionItemTranscribeconfirmComponent);
    diag.afterClosed()
    .subscribe(res =>{
      if(res){
        this.transcriber.TranscribeFromStorage(this.transcription.storageFileName, this.transcription.language)
        .subscribe(res =>{
            //TODO: abrir tela de transcrição(transcribe direto na última página com resultado)
        })
      }
    })

  }
}
