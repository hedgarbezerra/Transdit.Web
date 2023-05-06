import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveWordConfirmComponent } from './remove-word-confirm.component';

describe('RemoveWordConfirmComponent', () => {
  let component: RemoveWordConfirmComponent;
  let fixture: ComponentFixture<RemoveWordConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveWordConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveWordConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
