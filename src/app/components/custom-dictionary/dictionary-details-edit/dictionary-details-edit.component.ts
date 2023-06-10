import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { OutDictionary } from 'src/app/classes/Dictionaries/Dictionaries';
import { getFormFromGroup } from 'src/app/helpers/HelperFunctions';
import { RequiredIf } from 'src/app/helpers/custom-validators/password-validator';

@Component({
  selector: 'app-dictionary-details-edit',
  templateUrl: './dictionary-details-edit.component.html',
  styleUrls: ['./dictionary-details-edit.component.css']
})
export class DictionaryDetailsEditComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @Input()
  dictionary!: OutDictionary;

  InputedWords: Array<string> =[];
  form = new FormGroup({
    name: new FormControl(this.dictionary.name, [Validators.required]),
    description: new FormControl(this.dictionary.description, [RequiredIf(!!this.dictionary.description)])
  })

  get name() : FormControl{
    return getFormFromGroup('name', this.form);
  }
  get description() : FormControl{
    return getFormFromGroup('description', this.form);
  }

  UpdateDictionary(){

  }
  
  addWord(event: MatChipInputEvent): void {
    let value = (event.value || '').trim();

    if (value) {
      this.InputedWords.push(value);
    }

    event.chipInput!.clear();
  }

  //considerar iterar utilizando DictionaryWord
  removeWord(word: string): void {
    let index = this.InputedWords.indexOf(word);

      if (index >= 0)
        this.InputedWords.splice(index, 1);
  }
}
