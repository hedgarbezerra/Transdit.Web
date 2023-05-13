import { Component } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Dictionary, DictionaryWord, OutDictionary } from 'src/app/classes/Dictionaries/Dictionaries';
import { TranscriptionInput } from 'src/app/classes/Transcriptions/InputTranscription';
import { TranscriptionResult } from 'src/app/classes/Transcriptions/TranscriptionResult';
import { getFormFromGroup } from 'src/app/helpers/HelperFunctions';
import { OneOf, RequiredIf, PermitedFiles, atLeastOne, GroupOneOf } from 'src/app/helpers/custom-validators/password-validator';
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
  transcriptionResults: TranscriptionResult ={
    "fileName": "",
    "storageUri": "https://storage.googleapis.com/download/storage/v1/b/transditbucket/o/cjvckbpo.flac?generation=1683957432148576&alt=media",
    "date": new Date(),
    "successful": false,
    "data": [
      {
        "precision": 0.9771533,
        "text": "In this video, I'll show you what JavaScript promises why we need them, how to use the special then and catch methods. And then how to convert the same CO2, using the much needs to a sink on a way to keep Woods. My name is Chris Roberts, when dating with simple types in javascript's. It just rings and numbers are code. Executes sequentially. Nice and simple. However, when writing real-world code, we often make call to databases open files and speak to remote API over the Internet. How long the running tasks. Like this will usually not return. The results play to buy, they were all the return a promise. Now A promise is a special type of object in JavaScript that represents the eventual completion or failure of an asynchronous operation and its resulting value on a little bit hard to understand. Maybe we can imagine it as a real world scenario and you are at the restaurant having dinner and you ask the waiter to bring you another cup of coffee. The whites that promises to come back with your coffee.",
        "speakerTag": 0,
        "startTimeSeconds": 0,
        "endTimeSeconds": 59.97
      },
      {
        "precision": 0.96389705,
        "text": " How do you count and drink it? At that point, you have to wait until he returns with your coffee and the promise is fulfilled and she's the same sort of concept in JavaScript. If for example, you requested information from a remote API and you'll be immediately given I promise, that's how I could eventually either complete or fail is not until some time later the promise yourself is actually resolved or rejected and you can use a result of that promised. Let's have a look at an example, in JavaScript things to do when you are bored. So you'll be using the Bold IPI, the board AP, I just returned from them suggestions of things that you can do along with a number of POTUS Miss required. Let's just keep it really simple by going to the API console vibrate and the get message with sentence immediately. But that doesn't mean through Quest as finished processing. What we have is a promise of the request will be fulfilled in the future. So this card will fail because the response",
        "speakerTag": 0,
        "startTimeSeconds": 59.97,
        "endTimeSeconds": 120.02
      },
      {
        "precision": 0.9742619,
        "text": " Object is not what we were expecting, so the data and activity properties that do not exist. So is there any way for us to get access to the result of the request and run code when it returns? Well, thankfully, yes, because JavaScript give us a couple of ways to wait until the task is finished and he was a result or catch any errors of the cooker. The first way is by using a couple of special methods on the promise of object. The first one is cool. Then then it's cold. When the task complete saw the barometer, it receives a result of the task and the catch method is cool. If anything goes wrong while processing our request and it's received, that's accurate as a promise. So, so that's your place this code. Use the excuse request library on, cool to get method. Now, because get return. The promise object, we can immediately chain on the inside out. That message will look out for the consult, the suggested activity from the API. Then off of this, we can chain on the couch method. So be cool. If anything goes wrong while processing, I request that should slow down.",
        "speakerTag": 0,
        "startTimeSeconds": 120.02,
        "endTimeSeconds": 179.99
      },
      {
        "precision": 0.9684885,
        "text": " Cancel the error message that is returned. Then we can run this and do that in the right place. Now to see me like this and are recovering a request, last replace the URL, always a call to the HTTP status API. This is really useful for testing, different codes and we'll just request a 404, not found error. We can run this again and see that area is neatly caught by a text message and print it out to the console. It's worth noting that place after this promise chain will be executed immediately. So if he put a console log here with the Boston would expect it to be written out. After I request with sons printed out first, this is because only the code inside the van on the couch methods, it executed after the request returns particularly nice to look at. And if you got a lot of complicated code inside you a message, as soon as not to get quiet on, will be. So what we need really is a way of receiving the results about promises sequentially just as if we were",
        "speakerTag": 0,
        "startTimeSeconds": 179.99,
        "endTimeSeconds": 239.96
      },
      {
        "precision": 0.97533584,
        "text": " Simple types like strings and numbers and this is where the white keyboard comes in on a white. Does exactly what it says it allows us to wait until the promise has completed before moving on to the next line this makes a coat. I'll look nice and easy to read, JavaScript requires out awake, he was be used inside functions with the async keyword lesser place out from his chamber that function marked with the ACT. Would I call it gets activity? And now we're going to make the same request, tri-board API but notice. We have their weight keyword for the mythical and immediately. After the next line of code, we can use the response unlock out for the console. The suggested activity this console of line will not run until the promise results or is returned. We can call, I'll get activity. And will say that all code executes perfectly happy to see a white queue. It allows us to move this kind of a synchronous code. I came to the main flaw of, all right, we don't have access to this specialized cats method to handle any errors occur. So, what happens if something goes",
        "speakerTag": 0,
        "startTimeSeconds": 239.96,
        "endTimeSeconds": 299.93
      },
      {
        "precision": 0.9538972,
        "text": " Oh because I code executes sequentially. We can just wrap this with a normal. Try cats block inside a cat's method. We can just log out of the console, the era best time to see me like this city, be safe y'all again. And this time we request a 500 Severa elog activity. Noticed our request era has been nice because I'm locked out. The console has helped to demystify using promises and the icing on a weight keyword in Java Script. If you enjoy this kind of content that mean videos every week, so make sure to subscribe on ring that Bell icon. So, you know how I missed out on one of our videos. Thank you so much for watching and we'll see you next time.",
        "speakerTag": 0,
        "startTimeSeconds": 299.93,
        "endTimeSeconds": 339.47
      }
    ],
    "messages": []
  }
  
  showHints = false;
  showAdditionalLanguages = false;
  isCompleted = false;

  selectedFile!: File;
  uploadedFileName!: string;
  uploadedIsConverted!: boolean;
  filteredMainLanguage!: Observable<any[]>;

  get selectedDictionary(): OutDictionary | undefined {
    return this.dictionaries.find(d => d.id == this.customDictionaryIdForm.value)
  }

  firstPageFormG = new FormGroup({
    youtubeUrl: new FormControl('', [Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]),
    file: new FormControl('', []),
  }, [GroupOneOf(Validators.required, [])]);

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
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.selectedFile = file;
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
