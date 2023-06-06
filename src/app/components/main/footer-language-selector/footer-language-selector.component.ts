import { HttpClient } from '@angular/common/http';
import { Component, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer-language-selector',
  templateUrl: './footer-language-selector.component.html',
  styleUrls: ['./footer-language-selector.component.css']
})
export class FooterLanguageSelectorComponent {

  languages: Array<string> = [];
  @Output()
  selectedLang: string = '';

  constructor(private http: HttpClient){ }
  LoadLanguages(){
    this.http.get<Array<string>>(`${environment.apiUrl}/app/languages`)
      .subscribe(languages => this.languages = languages);
  }

  ngOnInit(): void {
    this.LoadLanguages();    
  }
}
