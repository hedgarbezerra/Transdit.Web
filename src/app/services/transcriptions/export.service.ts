import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ExportFormat } from 'src/app/classes/Transcriptions/ExportFormat.enum';
import { TranscriptionResult } from 'src/app/classes/Transcriptions/TranscriptionResult';
import { TranscriptionItemExportconfirmComponent } from 'src/app/components/transcriptions/transcription-item-exportconfirm/transcription-item-exportconfirm.component';
import { base64ToArrayBuffer, saveData } from 'src/app/helpers/HelperFunctions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private client: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ExportTranscriptionResult(content: string, format: ExportFormat): Observable<any>{
    let obj = { content, format };
    return this.client.post(`${environment.apiUrl}/transcriptions/export`, obj);
  }

  ExportTranscriptionResultObj(transcription: TranscriptionResult, format: ExportFormat): Observable<any>{
    return this.client.post(`${environment.apiUrl}/transcriptions/export/${format}`, transcription);
  }

  exportPdf(name: string, content: string){
    let diag = this.dialog.open(TranscriptionItemExportconfirmComponent);
    diag.componentInstance.format = 'PDF';
    diag.componentInstance.transcriptionName = name;
    diag.afterClosed()
    .subscribe((res: any) => {
      if(res){
        if(!content){
          this.snackBar.open('O conteúdo à ser transcrito parece estar vazio.', 'Fechar');
          return;
        }

        this.ExportTranscriptionResult(content, ExportFormat.PDF)
        .subscribe(res => {
            var bytes = base64ToArrayBuffer(res);
            saveData(bytes, 'application/pdf', `${name}.pdf`);
        })
      }
    })
  }

  exportTxt(name: string, content: string){
    let diag = this.dialog.open(TranscriptionItemExportconfirmComponent);
    diag.componentInstance.format = 'TXT';
    diag.componentInstance.transcriptionName = name;

    diag.afterClosed()
    .subscribe((res: any) => {
      if(res){
        if(!content){
          this.snackBar.open('O conteúdo à ser transcrito parece estar vazio.', 'Fechar');
          return;
        }

        this.ExportTranscriptionResult(content, ExportFormat.TXT)
        .subscribe(res => {
          var bytes = base64ToArrayBuffer(res);
          saveData(bytes, 'text/plain', `${name}.txt`);
        })
      }
    });
  }

  exportDocx(name: string, content: string){
    let diag = this.dialog.open(TranscriptionItemExportconfirmComponent);
    diag.componentInstance.format = 'DOCX'
    diag.componentInstance.transcriptionName = name;

    diag.afterClosed()
    .subscribe((res: any) => {
      if(res){
        if(!content){
          this.snackBar.open('O conteúdo à ser transcrito parece estar vazio.', 'Fechar');
          return;
        }
        this.ExportTranscriptionResult(content, ExportFormat.DOCX)
        .subscribe(res =>{
          var bytes = base64ToArrayBuffer(res);
          saveData(bytes, 'application/vnd.openxmlformats', `${name}.docx`);
        })
      }
    });
  }
}
