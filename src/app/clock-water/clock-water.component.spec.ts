import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockWaterComponent } from './clock-water.component';

describe('ClockWaterComponent', () => {
  let component: ClockWaterComponent;
  let fixture: ComponentFixture<ClockWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockWaterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
