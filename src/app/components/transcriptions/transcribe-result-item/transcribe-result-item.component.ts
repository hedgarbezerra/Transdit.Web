import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranscriptionResultItem } from 'src/app/classes/Transcriptions/TranscriptionResult';

@Component({
  selector: 'app-transcribe-result-item',
  templateUrl: './transcribe-result-item.component.html',
  styleUrls: ['./transcribe-result-item.component.css']
})
export class TranscribeResultItemComponent {

  @Input()
  item!: TranscriptionResultItem;

  @Output('played')
  playEvent : EventEmitter<any> = new EventEmitter();

  playButton(){
    this.playEvent.emit({});
  }
}
