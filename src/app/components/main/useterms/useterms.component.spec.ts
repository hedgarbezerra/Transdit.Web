import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsetermsComponent } from './useterms.component';

describe('UsetermsComponent', () => {
  let component: UsetermsComponent;
  let fixture: ComponentFixture<UsetermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsetermsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsetermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
