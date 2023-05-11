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

  @Output('played')
  playEvent : EventEmitter<TranscriptionPlayEvent> = new EventEmitter();

  emitTime(){
    this.playEvent.emit(new TranscriptionPlayEvent(this.item.startTimeSeconds, this.item.endTimeSeconds))
  }
}
