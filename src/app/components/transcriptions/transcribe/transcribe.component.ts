import { Component } from '@angular/core';
import {COMMA, D, ENTER} from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Dictionary, DictionaryWord, OutDictionary } from 'src/app/classes/Dictionaries/Dictionaries';
import { TranscriptionInput } from 'src/app/classes/Transcriptions/InputTranscription';
import { TranscriptionResult } from 'src/app/classes/Transcriptions/TranscriptionResult';
import { getFormFromGroup } from 'src/app/helpers/HelperFunctions';
import { OneOf, RequiredIf } from 'src/app/helpers/custom-validators/password-validator';
import { DictionariesService } from 'src/app/services/customDictionary/dictionary-service.service';
import { TranscriptionsService } from 'src/app/services/transcriptions/transcriptions.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewDictionaryComponent } from 'src/app/components/custom-dictionary/new-dictionary/new-dictionary.component';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-transcribe',
  templateUrl: './transcribe.component.html',
  styleUrls: ['./transcribe.component.css']
})

export class TranscribeComponent {
  constructor(private transcriber: TranscriptionsService, private dictionaryService: DictionariesService,
    private diag: MatDialog, private snackBar: MatSnackBar){}

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public files: NgxFileDropEntry[] = [];

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
    customDictionaryId: new FormControl(0, []),
    hintsImpact: new FormControl(0, []),
    additionalLanguages: new FormControl([], []),
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
    return getFormFromGroup('hintsImpact', this.secondPageFormG);
  }
  get customDictionaryIdForm () : FormControl{
    return getFormFromGroup('customDictionaryId', this.secondPageFormG);
  }


  ShowHintChanged(){
    this.customDictionaryIdForm.reset();
    this.hintsImpactForm.reset();

    if(this.showHints){
      this.customDictionaryIdForm.addValidators(Validators.required);
      this.hintsImpactForm.addValidators(Validators.required);
    }
    else{
      this.customDictionaryIdForm.removeValidators(Validators.required);
      this.hintsImpactForm.removeValidators(Validators.required);
    }

    this.hintsImpactForm.updateValueAndValidity();
    this.customDictionaryIdForm.updateValueAndValidity();
  }

  showAdditionalLanguagesChanged(){
    this.additionalLanguagesForm.reset();
    if(this.showAdditionalLanguages)
      this.additionalLanguagesForm.addValidators(Validators.required);
    else
      this.additionalLanguagesForm.removeValidators(Validators.required);

    this.additionalLanguagesForm.updateValueAndValidity();
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

  addDictionary(): void{
    let diag = this.diag.open(NewDictionaryComponent);

    diag.afterClosed()
    .subscribe(result =>{
      if(!result)
        return;

      let dict = result as Dictionary;
      this.dictionaryService.CreateDictionary(dict)
      .subscribe(create =>{
        this.snackBar.open(`${dict.name} foi criado, atualizando campo...`, 'Fechar').afterOpened()
        .subscribe(() => this.LoadCustomDictionaries());
      })
      // if(result)
      //   this.LoadCustomDictionaries();
    })
  }

  removeDictionary(dict: OutDictionary): void{
    let diag = this.diag.open(NewDictionaryComponent);

    diag.afterClosed()
    .subscribe(result =>{
      if(!result)
        return;

      let index = this.dictionaries.indexOf(dict);

      if (index >= 0){
        this.dictionaries.splice(index, 1);
        this.dictionaryService.DeleteDictionary(dict.id)
        .subscribe(res =>{
          this.snackBar.open(`${dict.name} foi apagado definitivamente.`, 'Fechar');
        });
    }
      // if(result)
      //   this.LoadCustomDictionaries();
    })

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

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }

  Transcribe(){
    if(this.secondPageFormG.invalid)
      return;

    let input = this.secondPageFormG.value as unknown as TranscriptionInput;
    var result;
    if(this.url.valid){
      input.youtubeUrl = this.url.value;
      result = this.transcriber.TranscribeFromYoutube(input);
    }
    else{
      input.fileName = this.file.value;
      result = this.transcriber.Transcribe(input);
    }
  }

}
