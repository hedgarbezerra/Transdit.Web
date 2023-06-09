import { Component, Input } from '@angular/core';
import { OutDictionary } from 'src/app/classes/Dictionaries/Dictionaries';

@Component({
  selector: 'app-dictionary-details-edit',
  templateUrl: './dictionary-details-edit.component.html',
  styleUrls: ['./dictionary-details-edit.component.css']
})
export class DictionaryDetailsEditComponent {

  @Input()
  dictionary!: OutDictionary;
}
