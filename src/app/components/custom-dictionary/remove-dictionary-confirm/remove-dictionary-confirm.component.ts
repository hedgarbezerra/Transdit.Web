import { Component, Input } from '@angular/core';
import { OutDictionary } from 'src/app/classes/Dictionaries/Dictionaries';

@Component({
  selector: 'app-remove-dictionary-confirm',
  templateUrl: './remove-dictionary-confirm.component.html',
  styleUrls: ['./remove-dictionary-confirm.component.css']
})
export class RemoveDictionaryConfirmComponent {

  @Input()
  dict!: OutDictionary;

}
