import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockBinaryComponent } from './clock-binary.component';

describe('ClockBinaryComponent', () => {
  let component: ClockBinaryComponent;
  let fixture: ComponentFixture<ClockBinaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockBinaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockBinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
