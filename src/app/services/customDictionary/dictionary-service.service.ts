import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OutDictionary, Dictionary, DictionaryWord } from 'src/app/classes/Dictionaries/Dictionaries';
import { DictionaryPaginatedResult } from 'src/app/classes/Dictionaries/DictionaryPaginatedResult';
import { Pagination } from 'src/app/classes/PaginatedResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DictionariesService {

  constructor(private httpClient : HttpClient) { }

  GetDicionaries(): Observable<OutDictionary[]>{
    return this.httpClient.get<OutDictionary[]>(`${environment.apiUrl}/dictionaries`);
  }
  GetDicionary(id: number): Observable<OutDictionary>{
    return this.httpClient.get<OutDictionary>(`${environment.apiUrl}/dictionaries/${id}`);
  }
  CreateDictionary(dict: Dictionary){
    return this.httpClient.post(`${environment.apiUrl}/dictionaries`, dict);
  }
  UpdateDictionary(dict: Dictionary){
    return this.httpClient.put(`${environment.apiUrl}/dictionaries`, dict);
  }
  DeleteDictionary(id: number){
    return this.httpClient.delete(`${environment.apiUrl}/dictionaries/${id}`);
  }

  GetWords(idDictionary: number){
    return this.httpClient.get(`${environment.apiUrl}/dictionaries/${idDictionary}/words`);
  }
  CreateWord(idDictionary: number, phrase: string){
    let wordObj = { word: phrase };

    return this.httpClient.post(`${environment.apiUrl}/dictionaries/${idDictionary}/words`, wordObj);
  }
  CreateWords(idDictionary: number, words: DictionaryWord[]){
    return this.httpClient.post(`${environment.apiUrl}/dictionaries/${idDictionary}/words/multiple`, words);
  }
  DeleteWord(idDictionary: number, idWord: number){
    return this.httpClient.delete(`${environment.apiUrl}/dictionaries/${idDictionary}/words/${idWord}`, );
  }
  
  Paginate(pagination: Pagination): Observable<DictionaryPaginatedResult>{
    let params = new HttpParams()
      .set('index', pagination.index)
      .set('size', pagination.size);

    if(pagination.searchTerm.length > 0)
      params = params.set('searchTerm', pagination.searchTerm);

    let options = { params }

    return this.httpClient.get<DictionaryPaginatedResult>(`${environment.apiUrl}/dictionaries/paginate`, options);
  }
}
