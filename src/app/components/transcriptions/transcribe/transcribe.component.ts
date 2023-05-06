import { Component } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { DictionaryWord, OutDictionary } from 'src/app/classes/Dictionaries/Dictionaries';
import { TranscriptionInput } from 'src/app/classes/Transcriptions/InputTranscription';
import { TranscriptionResult } from 'src/app/classes/Transcriptions/TranscriptionResult';
import { getFormFromGroup } from 'src/app/helpers/HelperFunctions';
import { OneOf, RequiredIf } from 'src/app/helpers/custom-validators/password-validator';
import { DictionariesService } from 'src/app/services/customDictionary/dictionary-service.service';
import { TranscriptionsService } from 'src/app/services/transcriptions/transcriptions.service';

@Component({
  selector: 'app-transcribe',
  templateUrl: './transcribe.component.html',
  styleUrls: ['./transcribe.component.css']
})

export class TranscribeComponent {
  constructor(private transcriber: TranscriptionsService, private dictionaryService: DictionariesService){}

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  languages!: any[];
  permitedFiles!: string[];
  dictionaries!: OutDictionary[];

  toTranscribe!: TranscriptionInput;
  uploadedFileName! : string;
  transcriptionResults!: TranscriptionResult;

  showHints = false;
  showAdditionalLanguages = false;

  get selectedDictionary(): OutDictionary | undefined {
    return this.dictionaries.find(d => d.id == this.customDictionaryIdForm.value)
  }

  firstPageFormG = new FormGroup({
    youtubeUrl: new FormControl('', [OneOf(['youtubeUrl', 'file',])]),
    file: new FormControl(File, [OneOf(['youtubeUrl', 'file']), ]),
  });

  get url() : FormControl{
    return getFormFromGroup('youtubeUrl', this.firstPageFormG);
  }
  get file() : FormControl{
    return getFormFromGroup('file', this.firstPageFormG);
  }

  secondPageFormG = new FormGroup({
    name: new FormControl('', [Validators.required]),
    language: new FormControl('pt-BR', [Validators.required]),
    speakers: new FormControl(1, [Validators.required, Validators.min(1)]),
    save: new FormControl(false, [Validators.required]),
    customDictionaryId: new FormControl(0, [Validators.required]),
    hintsImpact: new FormControl(0, [Validators.required]),
    additionalLanguages: new FormControl([], [RequiredIf(this.showAdditionalLanguages)]),
  });

  get languageForm () : FormControl{
    return getFormFromGroup('language', this.secondPageFormG);
  }
  get additionalLanguagesForm () : FormControl{
    return getFormFromGroup('additionalLanguages', this.secondPageFormG);
  }
  get nameForm () : FormControl{
    return getFormFromGroup('name', this.secondPageFormG);
  }
  get speakersForm () : FormControl{
    return getFormFromGroup('speakers', this.secondPageFormG);
  }
  get hintsImpactForm () : FormControl{
    return getFormFromGroup('customDictionaryId', this.secondPageFormG);
  }
  get customDictionaryIdForm () : FormControl{
    return getFormFromGroup('customDictionaryId', this.secondPageFormG);
  }
  get a () : FormControl{
    return getFormFromGroup('customDictionaryId', this.secondPageFormG);
  }

  ShowHintChanged(){
    if(this.showHints){
      this.hintsImpactForm.addValidators(Validators.required);
    }
    else{
      this.hintsImpactForm.removeValidators(Validators.required);
      this.hintsImpactForm.reset();
    }
  }

  showAdditionalLanguagesChanged(){
    if(this.showAdditionalLanguages){
      this.additionalLanguagesForm.addValidators(Validators.required);
    }
    else{
      this.additionalLanguagesForm.removeValidators(Validators.required);
      this.additionalLanguagesForm.reset();
    }
  }

  Teste(){
    let input = this.secondPageFormG.value as unknown as TranscriptionInput;
    console.log(input);
    console.log(this.secondPageFormG.value)
  }

  LoadLanguageCodes(){
    this.transcriber.SupportingLanguages()
    .subscribe(res => {
        this.languages = Object.entries(res).map(([k, v]) => ({
          key: k,
          codes: v
        }))
    })
  }

  LoadPermittedFiles(){
    this.transcriber.PermitedFileExtensions()
    .subscribe(res =>{
      this.permitedFiles = res;
    })
  }

  LoadCustomDictionaries(){
    this.dictionaryService.GetDicionaries()
    .subscribe(res =>{
      this.dictionaries = res;
    })
  }

  ngOnInit(): void {
    this.LoadLanguageCodes();
    this.LoadPermittedFiles();
    this.LoadCustomDictionaries();
  }

  addDictionary(event: MatChipInputEvent): void{

  }
  removeDictionary(dict: OutDictionary): void{

  }

  addWord(event: MatChipInputEvent): void {
    let value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      console.log(value)
      //this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }
  removeWord(word: DictionaryWord): void {
    console.log(word)
  }

  Transcribe(){
    if(this.secondPageFormG.invalid)
      return;

    let input = this.secondPageFormG.value as unknown as TranscriptionInput;
    var result;
    if(this.url.valid){
      result = this.transcriber.TranscribeFromYoutube(input);
    }
    else{
      result = this.transcriber.Transcribe(input);
    }

  }
}
