import { Component } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Dictionary, DictionaryWord, OutDictionary } from 'src/app/classes/Dictionaries/Dictionaries';
import { TranscriptionInput } from 'src/app/classes/Transcriptions/InputTranscription';
import { TranscriptionResult } from 'src/app/classes/Transcriptions/TranscriptionResult';
import { getFormFromGroup } from 'src/app/helpers/HelperFunctions';
import { OneOf, RequiredIf, PermitedFiles, atLeastOne, GroupOneOf, MaxFileSize } from 'src/app/helpers/custom-validators/password-validator';
import { DictionariesService } from 'src/app/services/customDictionary/dictionary-service.service';
import { TranscriptionsService } from 'src/app/services/transcriptions/transcriptions.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewDictionaryComponent } from 'src/app/components/custom-dictionary/new-dictionary/new-dictionary.component';
import { Observable, map, startWith, tap } from 'rxjs';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { TranscribeConfirmComponent } from '../transcribe-confirm/transcribe-confirm.component';
import { RemoveWordConfirmComponent } from '../../custom-dictionary/remove-word-confirm/remove-word-confirm.component';

@Component({
  selector: 'app-transcribe',
  templateUrl: './transcribe.component.html',
  styleUrls: ['./transcribe.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false, showError: false},
    },
  ],
})

export class TranscribeComponent {
  constructor(private transcriber: TranscriptionsService, private dictionaryService: DictionariesService,
    private diag: MatDialog, private snackBar: MatSnackBar){}

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  languages!: any[];
  dictionaries!: OutDictionary[];
  permitedFiles!: string[];
  acceptFiles!: string;

  toTranscribe!: TranscriptionInput;
  transcriptionResults!: TranscriptionResult;
  
  showTimeRange = false;
  showHints = false;
  showAdditionalLanguages = false;
  isCompleted = false;

  selectedFile!: File|null;
  uploadedFileName!: string;
  uploadedIsConverted!: boolean;
  filteredMainLanguage!: Observable<any[]>;

  get selectedDictionary(): OutDictionary | undefined {
    return this.dictionaries?.find(d => d.id == this.customDictionaryIdForm.value)
  }

  firstPageFormG = new FormGroup({
    youtubeUrl: new FormControl('', [Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]),
    file: new FormControl('', ), //TODO: [MaxFileSize(524288000)]),
    rangeStartTime: new FormControl('00:00:00', [RequiredIf(this.showTimeRange)]),
    rangeEndTime: new FormControl('00:00:00', [RequiredIf(this.showTimeRange)])
  }, [GroupOneOf(Validators.required, ['file', 'youtubeUrl'])]);

  get url() : FormControl{
    return getFormFromGroup('youtubeUrl', this.firstPageFormG);
  }
  get file() : FormControl{
    return getFormFromGroup('file', this.firstPageFormG);
  }
  get rangeStartTime() : FormControl{
    return getFormFromGroup('rangeStartTime', this.firstPageFormG);
  }
  get rangeEndTime() : FormControl{
    return getFormFromGroup('rangeEndTime', this.firstPageFormG);
  }

  secondPageFormG = new FormGroup({
    name: new FormControl('', [Validators.required]),
    language: new FormControl('pt-BR', [Validators.required]),
    speakers: new FormControl(1, [Validators.required, Validators.min(1)]),
    save: new FormControl(true, [Validators.required]),
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

  urlChanged(event: any){
    if(this.url.value && this.url.valid){
      this.file.disable();
    }
    else{
      this.file.enable();
    }
    this.file.reset();
  }

  fileChanged(event: any){
    if(this.file.value && this.file.valid){
      this.url.disable();
      this.handleUpdatedFile(event);
    }
    else{
      this.url.enable();
    }
    this.url.reset();
  }

  handleUpdatedFile(event: any){
    if(!event)
      return;

    let files = (event.target as HTMLInputElement)?.files;
    let file = !files ? null: files[0];
    if(!file){
      this.selectedFile = null;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.selectedFile = file;
    //TODO: Considerar tratar o comportamento da validação de mb aqui
  }

  streamUploadFile(file: File) {
    let formData = new FormData();
    formData.append('file', file);

    return this.transcriber.UploadFile(formData);
  }

  LoadLanguageCodes(){
    this.transcriber.SupportingLanguages()
    .subscribe(res => {
        this.languages = Object.entries(res).map(([k, v]) => ({
          key: k,
          codes: v
        }))

        this.filteredMainLanguage = this.languageForm.valueChanges.pipe(
          startWith(''),
          map(value => this.filter(value || ''))
        );
    })
  }

  LoadPermittedFiles(){
    this.transcriber.PermitedFileExtensions()
    .subscribe(res =>{
      this.acceptFiles = res.join(',');
      this.file.addValidators(PermitedFiles(res));
    })
  }

  LoadCustomDictionaries(){
    this.dictionaryService.GetDicionaries()
    .subscribe(res =>{
      this.dictionaries = res;
    })
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.languages?.filter(option => option.key.toLowerCase().includes(filterValue)
    || option.codes.some((code: string) =>code.toLowerCase().includes(filterValue)));
  }

  ngOnInit() {
    this.LoadLanguageCodes();
    this.LoadPermittedFiles();
    this.LoadCustomDictionaries();
  }

  addDictionary(): void{
    let diag = this.diag.open(NewDictionaryComponent, { height: '50vh', width: '50vw'});

    diag.afterClosed()
    .subscribe(result =>{
      if(!result)
        return;

      let dict = result as Dictionary;
      if(!dict)
        return;

      this.dictionaryService.CreateDictionary(dict)
      .subscribe(create =>{
        let id = create as number;
        let words = result.words.map((w: string) => <DictionaryWord>{ word: w}) as DictionaryWord[] ;
        this.dictionaryService.CreateWords(id, words)
        .subscribe(res =>{
          this.snackBar.open(`${dict.name} foi criado, atualizando campo...`, 'Fechar')
          .afterOpened()
          .subscribe(() => this.LoadCustomDictionaries());
        })
      })
    })
  }

  removeDictionary(dict: OutDictionary | undefined): void{
    if(!dict)
      return;

    let diag = this.diag.open(RemoveWordConfirmComponent);
    diag.componentInstance.dict = dict;
    diag.afterClosed()
    .subscribe(result =>{
      if(!result)
        return;

      let index = this.dictionaries.indexOf(dict);
      if (index >= 0){
        this.dictionaries.splice(index, 1);
        this.dictionaryService.DeleteDictionary(dict.id)
        .subscribe(res =>{
          this.snackBar.open(`O dicionário customizado '${dict.name}' foi apagado definitivamente.`, 'Fechar');
        });
      }
    })

  }

  addWord(event: MatChipInputEvent): void {
    if(!this.selectedDictionary)
      return;

    let value = (event.value || '').trim();
    var dictId = this.selectedDictionary.id;

    if (value) {
      this.dictionaryService.CreateWord(dictId, value)
      .subscribe(res =>{
        this.snackBar.open(`Palavra '${value}' adicionada ao dicionário.`, 'Fechar',{ duration: 5000});
        this.dictionaryService.GetWords(dictId)
        .subscribe(res => {
          let updatedWords = res as DictionaryWord[];
          if(this.selectedDictionary)
           this.selectedDictionary.words = updatedWords

        })
      })
    }

    event.chipInput!.clear();
  }

  removeWord(word: DictionaryWord): void {
    if(!this.selectedDictionary)
      return;

    let index = this.selectedDictionary.words.indexOf(word);
    this.selectedDictionary.words.splice(index, 1);

    this.dictionaryService.DeleteWord(this.selectedDictionary.id, word.id)
    .subscribe(res =>{
      this.snackBar.open(`Palavra '${word.word}' removida do dicionário.`, 'Fechar',{ duration: 5000});
    })
  }

  HandleFirstStep(stepper: MatStepper){
    if(this.url.value && this.url.valid){
      stepper.next();
    }
    else{
      if(!this.selectedFile){
        this.snackBar.open('Houve um erro com a mídia selecionada, selecione novamente.', 'OK', {duration: 5000});
        return;
      }
      this.streamUploadFile(this.selectedFile)
      .subscribe(res =>{
        this.uploadedIsConverted = res.isConverted;
        if(res.isConverted)
          this.uploadedFileName = res.convertedFileName;
        else
          this.uploadedFileName = res.fileName;

        this.snackBar.open('Mídia enviada com sucesso.', 'OK', {duration: 5000});
        stepper.next();
      });
    }
  }

  Transcribe(stepper: MatStepper){
    if(this.secondPageFormG.invalid)
      return;

    let confirmation = this.diag.open(TranscribeConfirmComponent);
    confirmation.afterClosed()
    .subscribe(confirmed =>{
      if(!confirmed)
        return;

      let input = this.secondPageFormG.value as unknown as TranscriptionInput;
      if(!input){
        this.snackBar.open('Houve um problema ao transcrever com as configurações selecionadas.', 'OK', {duration: 5000});
        return;
      }

      input.youtubeUrl = this.url.value ?? '';
      input.fileName = this.uploadedFileName ?? '';
      input.additionalLanguages = this.additionalLanguagesForm.value ?? [];
      input.isConverted = this.uploadedIsConverted;

      if(this.showHints && this.selectedDictionary){
        let hints = this.selectedDictionary?.words.map(w => w.word) ?? [];
        input.hints = hints;
        input.hintsImpact = this.hintsImpactForm.value;
      }

      if(this.url.valid){
        var result = this.transcriber.TranscribeFromYoutube(input);
      }
      else{
        var result = this.transcriber.Transcribe(input);
      }

      result.subscribe(result =>{
        this.transcriptionResults = result;
        this.isCompleted = true;
        stepper.next();
      })
    })
  }

  newTranscription(stepper: MatStepper){
    this.transcriptionResults = <TranscriptionResult>{};
    this.isCompleted = false;
    stepper.reset()
  }

}