import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnPlantInfoComponent } from './learn-plant-info.component';

describe('LearnPlantInfoComponent', () => {
  let component: LearnPlantInfoComponent;
  let fixture: ComponentFixture<LearnPlantInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnPlantInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnPlantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
