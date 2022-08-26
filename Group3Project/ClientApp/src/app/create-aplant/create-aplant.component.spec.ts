import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAPlantComponent } from './create-aplant.component';

describe('CreateAPlantComponent', () => {
  let component: CreateAPlantComponent;
  let fixture: ComponentFixture<CreateAPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAPlantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
