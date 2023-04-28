import { Component } from '@angular/core';
import { TranscriptionItem } from 'src/app/classes/Transcriptions/TranscriptionItem';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  transcriptions: Array<TranscriptionItem> = []
  pagination = {
    pageSize: 10,
    pageIndex: 1,
    totalCount: 0
  }
}
