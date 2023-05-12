import { Component, Input } from '@angular/core';
import { ExportFormat } from 'src/app/classes/Transcriptions/ExportFormat.enum';
import { TranscriptionResult } from 'src/app/classes/Transcriptions/TranscriptionResult';
import { base64ToArrayBuffer, saveData } from 'src/app/helpers/HelperFunctions';
import { TranscriptionItemExportconfirmComponent } from '../transcription-item-exportconfirm/transcription-item-exportconfirm.component';
import { ExportService } from 'src/app/services/transcriptions/export.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transcribe-result',
  templateUrl: './transcribe-result.component.html',
  styleUrls: ['./transcribe-result.component.css']
})
export class TranscribeResultComponent {
constructor(private exportService: ExportService, private dialog: MatDialog, private snackBar: MatSnackBar){}

  @Input()
  result!: TranscriptionResult;

  @Input()
  name!: string;

  playMedia(event: any){
    console.log(event);
  }

  getContent(){
    let main = document.getElementsByClassName('transcription-content');
    if(main.length <= 0) return;

    let children = main[0].getElementsByClassName('transcription-phrase');
    var childrenContent: string[] = [];
    for (let index = 0; index < children.length; index++) {
      let child = children[index];
      childrenContent.push(child.textContent ?? '')
    }

    return childrenContent.join('\n\n');
  }

  exportPdf(){
    let diag = this.dialog.open(TranscriptionItemExportconfirmComponent);
    diag.componentInstance.format = 'PDF';
    diag.afterClosed()
    .subscribe((res: any) => {
      if(res){
        let content = this.getContent() ?? '';
        if(!content){
          this.snackBar.open('O conteúdo à ser transcrito parece estar vazio.', 'Fechar');
          return;
        }

        this.exportService.ExportTranscriptionResult(content, ExportFormat.PDF)
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
        let content = this.getContent() ?? '';
        if(!content){
          this.snackBar.open('O conteúdo à ser transcrito parece estar vazio.', 'Fechar');
          return;
        }

        this.exportService.ExportTranscriptionResult(content, ExportFormat.TXT)
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
        let content = this.getContent() ?? '';
        if(!content){
          this.snackBar.open('O conteúdo à ser transcrito parece estar vazio.', 'Fechar');
          return;
        }
        
        this.exportService.ExportTranscriptionResult(content, ExportFormat.DOCX)
        .subscribe(res =>{
          var bytes = base64ToArrayBuffer(res);
          saveData(bytes, 'application/vnd.openxmlformats',  `${this.name}.docx`);
        })
      }
    });
  }
}
