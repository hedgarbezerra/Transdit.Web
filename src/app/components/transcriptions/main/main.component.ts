import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, filter, tap } from 'rxjs';
import { TranscriptionItem } from 'src/app/classes/Transcriptions/TranscriptionItem';
import { TranscribeComponent } from '../transcribe/transcribe.component';
import { Pagination } from 'src/app/classes/PaginatedResult';
import { TranscriptionsService } from 'src/app/services/transcriptions/transcriptions.service';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
constructor(private dialog: MatDialog, private transcriber: TranscriptionsService){}

  transcriptions: Array<TranscriptionItem> = []

  pagination : Pagination = {
    size: 10,
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


  addTranscription(){
    const dialogRef = this.dialog.open(TranscribeComponent, { enterAnimationDuration: '200', width: '90vw', height: '90vh', disableClose: true});

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.paginate();
    });
  }

  paginate(){
    this.transcriber.PaginateTranscriptions(this.pagination)
    .subscribe(result =>{
      this.transcriptions = result.data;
      this.pagination.count = result.totalCount;
    })

  }

  handlePageEvent(event : PageEvent){
    this.pagination.size = event.pageSize;
    this.pagination.index = event.pageIndex;

    this.paginate();
  }

  ngOnInit(): void {
    this.paginate();
  }
}
