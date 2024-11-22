import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockLoadCircleComponent } from './clock-load-circle.component';

describe('ClockLoadCircleComponent', () => {
  let component: ClockLoadCircleComponent;
  let fixture: ComponentFixture<ClockLoadCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockLoadCircleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockLoadCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
