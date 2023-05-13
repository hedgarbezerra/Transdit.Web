import { Component, Input, ViewChild } from '@angular/core';
import { ExportFormat } from 'src/app/classes/Transcriptions/ExportFormat.enum';
import { TranscriptionResult } from 'src/app/classes/Transcriptions/TranscriptionResult';
import { base64ToArrayBuffer, saveData } from 'src/app/helpers/HelperFunctions';
import { TranscriptionItemExportconfirmComponent } from '../transcription-item-exportconfirm/transcription-item-exportconfirm.component';
import { ExportService } from 'src/app/services/transcriptions/export.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Player } from '@vime/angular';
import { TranscriptionPlayEvent } from 'src/app/classes/Transcriptions/TranscriptionPlayEvent';

@Component({
  selector: 'app-transcribe-result',
  templateUrl: './transcribe-result.component.html',
  styleUrls: ['./transcribe-result.component.css']
})
export class TranscribeResultComponent {
constructor(private exportService: ExportService, private dialog: MatDialog, private snackBar: MatSnackBar){}
  @ViewChild('player')
   player!: Player;

  @Input()
  result!: TranscriptionResult;

  @Input()
  name!: string;

  currentTime = 0;
  limitTime = 0;

  get uri(){
    return !this.result ? '' : this.result.storageUri;
  }

  playMedia(event: TranscriptionPlayEvent){
    if(!this.player.canPlay)
      return;

    this.currentTime = event.startTimeSeconds;
    this.limitTime = event.endTimeSeconds;

    if(this.player.muted)
      this.player.volume = 100;

    this.player.play();
  }

  onTimeUpdate(event: CustomEvent<number>) {
    this.currentTime = event.detail;
    var stopTime = (this.limitTime > 0 ) ? this.limitTime : this.player.duration;

    if(this.currentTime >= stopTime){
      this.player.pause();
      this.limitTime = this.player.duration;
    }
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
