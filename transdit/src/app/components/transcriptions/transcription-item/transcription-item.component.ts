import { Component, Input } from '@angular/core';
import { TranscriptionItem } from 'src/app/classes/Transcriptions/TranscriptionItem';

@Component({
  selector: 'app-transcription-item',
  templateUrl: './transcription-item.component.html',
  styleUrls: ['./transcription-item.component.css']
})
export class TranscriptionItemComponent {
  
  @Input()
  transcription: TranscriptionItem ={
    id: 0,
    name: '',
    inputedFileName: '',
    language: '',
    result: '',
    lengthInSeconds: 0,
    date: new Date()
  }
}
