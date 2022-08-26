import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPlantsComponent } from './list-of-plants.component';

describe('ListOfPlantsComponent', () => {
  let component: ListOfPlantsComponent;
  let fixture: ComponentFixture<ListOfPlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfPlantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
