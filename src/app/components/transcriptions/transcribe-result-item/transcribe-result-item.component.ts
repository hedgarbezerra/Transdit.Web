import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranscriptionPlayEvent } from 'src/app/classes/Transcriptions/TranscriptionPlayEvent';
import { TranscriptionResultItem } from 'src/app/classes/Transcriptions/TranscriptionResult';

@Component({
  selector: 'app-transcribe-result-item',
  templateUrl: './transcribe-result-item.component.html',
  styleUrls: ['./transcribe-result-item.component.css']
})
export class TranscribeResultItemComponent {

  @Input()
  item!: TranscriptionResultItem;

  @Input()
  hasVideo: boolean = false;
  
  @Output('played')
  playEvent : EventEmitter<TranscriptionPlayEvent> = new EventEmitter();

  emitTime(){
    this.playEvent.emit(new TranscriptionPlayEvent(this.item.startTimeSeconds, this.item.endTimeSeconds))
  }

  get precisionColor(){
    let precision = this.item.precision * 100;
    if(precision <=40)
      return '#f44336';
    else if(precision < 70)
      return '#f9c300';
    else
      return 'green';
  }
}
