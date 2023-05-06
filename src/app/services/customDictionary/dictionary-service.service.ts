import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OutDictionary, Dictionary } from 'src/app/classes/Dictionaries/Dictionaries';
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
  DeleteWord(idDictionary: number, idWord: number){
    return this.httpClient.delete(`${environment.apiUrl}/dictionaries/${idDictionary}/words/${idWord}`, );
  }

}
