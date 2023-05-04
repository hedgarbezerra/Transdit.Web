import { Component, Injectable, Input, NgModule } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-paginator-ptbr',
  templateUrl: './paginator-ptbr.component.html',
  styleUrls: ['./paginator-ptbr.component.css']
})
export class PaginatorPtbrComponent {
  @Input()
  pagination = {
    pageSize: 10,
    pageIndex: 0,
    totalCount: 0
  }
}

@Injectable({
  providedIn: 'root'
})
export class PaginatorPtbrService implements MatPaginatorIntl {
  constructor() { }

  changes = new Subject<void>();
  itemsPerPageLabel = 'Transcrições por página';
  nextPageLabel = 'Próxima página';
  previousPageLabel = 'Página anterior';
  firstPageLabel = 'Primeira página';
  lastPageLabel = 'Última página';

  getRangeLabel(page: number, pageSize: number, length: number){
    if (length === 0) {
      return `Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  }
}
