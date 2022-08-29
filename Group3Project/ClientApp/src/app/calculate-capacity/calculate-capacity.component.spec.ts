import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateCapacityComponent } from './calculate-capacity.component';

describe('CalculateCapacityComponent', () => {
  let component: CalculateCapacityComponent;
  let fixture: ComponentFixture<CalculateCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateCapacityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
