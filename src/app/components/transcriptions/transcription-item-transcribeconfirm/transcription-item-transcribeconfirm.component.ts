import { Component, Input } from '@angular/core';
import { TranscriptionItem } from 'src/app/classes/Transcriptions/TranscriptionItem';

@Component({
  selector: 'app-transcription-item-transcribeconfirm',
  templateUrl: './transcription-item-transcribeconfirm.component.html',
  styleUrls: ['./transcription-item-transcribeconfirm.component.css']
})
export class TranscriptionItemTranscribeconfirmComponent {

  @Input()
  transcription!: TranscriptionItem;
}
