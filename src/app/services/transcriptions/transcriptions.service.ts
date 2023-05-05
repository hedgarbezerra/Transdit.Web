import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResult, Pagination } from 'src/app/classes/PaginatedResult';
import { TranscriptionPaginatedResult } from 'src/app/classes/Transcriptions/TranscriptionPaginatedResult';
import { TranscriptionResult } from 'src/app/classes/Transcriptions/TranscriptionResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranscriptionsService {

  constructor(private httpclient: HttpClient) { }

  TranscribeFromStorage(fileName: string, lang: string): Observable<TranscriptionResult>{
    return this.httpclient.get<TranscriptionResult>(`${environment.apiUrl}/transcribe/storage/${fileName}?lang=${lang}`)
  }

  PaginateTranscriptions(pagination: Pagination): Observable<TranscriptionPaginatedResult>{
    let params = new HttpParams()
      .set('index', pagination.index)
      .set('size', pagination.size);

    if(pagination.searchTerm.length > 0)
      params = params.append('searchTerm', pagination.searchTerm);
      
    let options = { params }

    return this.httpclient.get<TranscriptionPaginatedResult>(`${environment.apiUrl}/transcriptions`, options);
  }
}
