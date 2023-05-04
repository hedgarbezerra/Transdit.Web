import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExportFormat } from 'src/app/classes/Transcriptions/ExportFormat.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private client: HttpClient) { }

  ExportTranscriptionResult(content: string, format: ExportFormat): Observable<any>{
    let obj = { content, format };
    return this.client.post(`${environment.apiUrl}/transcriptions/export`, obj);
  }
}
