import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseinformationsComponent } from './useinformations.component';

describe('UseinformationsComponent', () => {
  let component: UseinformationsComponent;
  let fixture: ComponentFixture<UseinformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseinformationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseinformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
