import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorPtbrComponent } from './paginator-ptbr.component';

describe('PaginatorPtbrComponent', () => {
  let component: PaginatorPtbrComponent;
  let fixture: ComponentFixture<PaginatorPtbrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatorPtbrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorPtbrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
