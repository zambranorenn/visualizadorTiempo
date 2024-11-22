import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockLoadComponent } from './clock-load.component';

describe('ClockLoadComponent', () => {
  let component: ClockLoadComponent;
  let fixture: ComponentFixture<ClockLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
