import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, tap } from 'rxjs';
import { Dictionary, DictionaryWord, OutDictionary } from 'src/app/classes/Dictionaries/Dictionaries';
import { Pagination } from 'src/app/classes/PaginatedResult';
import { DictionariesService } from 'src/app/services/customDictionary/dictionary-service.service';
import { NewDictionaryComponent } from '../new-dictionary/new-dictionary.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showStateTrigger } from 'src/app/helpers/animations/basic-animations';

@Component({
  selector: 'app-dictionary-main',
  templateUrl: './dictionary-main.component.html',
  styleUrls: ['./dictionary-main.component.css'],
  animations: [showStateTrigger]
})
export class DictionaryMainComponent {
  constructor(private diag: MatDialog, private snackBar: MatSnackBar, private dictService: DictionariesService){}
  dictionaries: Array<OutDictionary> =[];
  pagination : Pagination = {
    size: 5,
    index: 0,
    count: 0,
    searchTerm: ''
  }

  searchTerm : FormControl = new FormControl('');
  searchTermObs$ = this.searchTerm.valueChanges
  .pipe(debounceTime(1000),
    tap((term) => this.pagination.searchTerm = term),
    tap(() => this.paginate())
  ).subscribe();
  

  paginate(){   
    this.dictService.Paginate(this.pagination)
    .subscribe(result =>{
      
      this.dictionaries = result.data;
      this.pagination.count = result.totalCount;
    })
  }

  handlePageEvent(event : PageEvent){
    this.pagination.size = event.pageSize;
    this.pagination.index = event.pageIndex;

    this.paginate();
  }
  
  addDictionary(): void{
    let diag = this.diag.open(NewDictionaryComponent, { closeOnNavigation: false});

    diag.afterClosed()
    .subscribe(result =>{
      if(!result)
        return;

      let dict = result as Dictionary;
      if(!dict){
        this.snackBar.open(`Houve um problema ao criar seu dicionário customizado, tente novamente em instantes.`, 'Fechar');
        return;
      }

      this.dictService.CreateDictionary(dict)
      .subscribe(create =>{
        let id = create as number;
        let words = result.words.map((w: string) => <DictionaryWord>{ word: w}) as DictionaryWord[] ;
        this.dictService.CreateWords(id, words)
        .subscribe(res =>{
          this.snackBar.open(`${dict.name} foi criado.`, 'Fechar');
          this.paginate();
        })
      })
    })
  }

  ngOnInit(): void {
    this.paginate();
  }
}
