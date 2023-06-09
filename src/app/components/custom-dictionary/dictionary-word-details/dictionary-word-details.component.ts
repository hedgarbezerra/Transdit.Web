import { Component, Input } from '@angular/core';
import { DictionaryWord } from 'src/app/classes/Dictionaries/Dictionaries';

@Component({
  selector: 'app-dictionary-word-details',
  templateUrl: './dictionary-word-details.component.html',
  styleUrls: ['./dictionary-word-details.component.css']
})
export class DictionaryWordDetailsComponent {

  @Input()
  words: Array<DictionaryWord> = []
}
