import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactsForNerdsComponent } from './facts-for-nerds.component';

describe('FactsForNerdsComponent', () => {
  let component: FactsForNerdsComponent;
  let fixture: ComponentFixture<FactsForNerdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactsForNerdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactsForNerdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
