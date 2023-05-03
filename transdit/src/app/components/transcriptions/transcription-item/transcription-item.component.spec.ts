import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionItemComponent } from './transcription-item.component';

describe('TranscriptionItemComponent', () => {
  let component: TranscriptionItemComponent;
  let fixture: ComponentFixture<TranscriptionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranscriptionItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscriptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
