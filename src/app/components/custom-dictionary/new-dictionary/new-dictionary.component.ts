import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Dictionary, DictionaryWord } from 'src/app/classes/Dictionaries/Dictionaries';
import { getFormFromGroup } from 'src/app/helpers/HelperFunctions';
import { GroupOneOf } from 'src/app/helpers/custom-validators/password-validator';

@Component({
  selector: 'app-new-dictionary',
  templateUrl: './new-dictionary.component.html',
  styleUrls: ['./new-dictionary.component.css']
})
export class NewDictionaryComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  Inputedwords: Array<string> = [];

  newDict = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
  });

  get name() : FormControl{
    return getFormFromGroup('name', this.newDict);
  }

  get description() : FormControl{
    return getFormFromGroup('description', this.newDict);
  }

  get wordsForm(): FormControl{
    return getFormFromGroup('words', this.newDict);
  }

  get dict() {
    return { name: this.name.value, description: this.description.value, words: this.Inputedwords}
  }

  addWord(event: MatChipInputEvent): void {
    let value = (event.value || '').trim();

    if (value) {
      this.Inputedwords.push(value);
    }

    event.chipInput!.clear();
  }

  removeWord(word: string): void {
    let index = this.Inputedwords.indexOf(word);

      if (index >= 0)
        this.Inputedwords.splice(index, 1);
  }
}
