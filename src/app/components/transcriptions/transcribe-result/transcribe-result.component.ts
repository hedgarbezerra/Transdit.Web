import { Component, Input } from '@angular/core';
import { ExportFormat } from 'src/app/classes/Transcriptions/ExportFormat.enum';
import { TranscriptionResult } from 'src/app/classes/Transcriptions/TranscriptionResult';
import { base64ToArrayBuffer, saveData } from 'src/app/helpers/HelperFunctions';
import { TranscriptionItemExportconfirmComponent } from '../transcription-item-exportconfirm/transcription-item-exportconfirm.component';
import { ExportService } from 'src/app/services/transcriptions/export.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transcribe-result',
  templateUrl: './transcribe-result.component.html',
  styleUrls: ['./transcribe-result.component.css']
})
export class TranscribeResultComponent {
constructor(private exportService: ExportService, private dialog: MatDialog){}

  @Input()
  result!: TranscriptionResult;
  @Input()
  name!: string;

  playMedia(event: any){

  }


  exportPdf(){
    let diag = this.dialog.open(TranscriptionItemExportconfirmComponent);
    diag.componentInstance.format = 'PDF';
    diag.afterClosed()
    .subscribe((res: any) => {
      if(res){
        this.exportService.ExportTranscriptionResult('', ExportFormat.PDF)
        .subscribe(res => {
            var bytes = base64ToArrayBuffer(res);
            saveData(bytes, 'application/pdf', `${this.name}.pdf`);
        })
      }
    })
  }

  exportTxt(){
    let diag = this.dialog.open(TranscriptionItemExportconfirmComponent);
    diag.componentInstance.format = 'TXT';

    diag.afterClosed()
    .subscribe((res: any) => {
      if(res){
        this.exportService.ExportTranscriptionResult('', ExportFormat.TXT)
        .subscribe(res => {
          var bytes = base64ToArrayBuffer(res);
          saveData(bytes, 'text/plain',  `${this.name}.txt`);
        })
      }
    });
  }

  exportDocx(){
    let diag = this.dialog.open(TranscriptionItemExportconfirmComponent);
    diag.componentInstance.format = 'DOCX'

    diag.afterClosed()
    .subscribe((res: any) => {
      if(res){
        this.exportService.ExportTranscriptionResult('', ExportFormat.DOCX)
        .subscribe(res =>{
          var bytes = base64ToArrayBuffer(res);
          saveData(bytes, 'application/vnd.openxmlformats',  `${this.name}.docx`);
        })
      }
    });
  }
}
