import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockRomanComponent } from './clock-roman.component';

describe('ClockRomanComponent', () => {
  let component: ClockRomanComponent;
  let fixture: ComponentFixture<ClockRomanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockRomanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockRomanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
