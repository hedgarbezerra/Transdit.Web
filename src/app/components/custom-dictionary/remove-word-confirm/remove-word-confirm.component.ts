import { Component, Input } from '@angular/core';
import { OutDictionary } from 'src/app/classes/Dictionaries/Dictionaries';

@Component({
  selector: 'app-remove-word-confirm',
  templateUrl: './remove-word-confirm.component.html',
  styleUrls: ['./remove-word-confirm.component.css']
})
export class RemoveWordConfirmComponent {

  @Input()
  dict!: OutDictionary;

}
