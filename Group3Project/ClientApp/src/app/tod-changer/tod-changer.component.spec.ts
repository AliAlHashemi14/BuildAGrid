import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TODChangerComponent } from './tod-changer.component';

describe('TODChangerComponent', () => {
  let component: TODChangerComponent;
  let fixture: ComponentFixture<TODChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TODChangerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TODChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
