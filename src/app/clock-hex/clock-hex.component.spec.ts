import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockHexComponent } from './clock-hex.component';

describe('ClockHexComponent', () => {
  let component: ClockHexComponent;
  let fixture: ComponentFixture<ClockHexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockHexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockHexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
