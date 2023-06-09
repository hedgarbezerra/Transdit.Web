import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transcription-item-exportconfirm',
  templateUrl: './transcription-item-exportconfirm.component.html',
  styleUrls: ['./transcription-item-exportconfirm.component.css']
})
export class TranscriptionItemExportconfirmComponent {

  @Input()
  format!: string;
  @Input()
  transcriptionName!: string;
}
