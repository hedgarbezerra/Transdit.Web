import { Component, EventEmitter, Injectable, Input, NgModule, Output } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { Pagination } from 'src/app/classes/PaginatedResult';

@Component({
  selector: 'app-paginator-ptbr',
  templateUrl: './paginator-ptbr.component.html',
  styleUrls: ['./paginator-ptbr.component.css']
})
export class PaginatorPtbrComponent {
  @Input()
  pagination! : Pagination;
  @Output()
  paginated: EventEmitter<PageEvent> = new EventEmitter();

  handlePageEvent(event : PageEvent){
    this.paginated.emit(event)
  }
}


@Injectable({
  providedIn: 'root'
})
export class PaginatorPtbrService implements MatPaginatorIntl {
  constructor() { }

  changes = new Subject<void>();
  itemsPerPageLabel = 'Itens por página';
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
