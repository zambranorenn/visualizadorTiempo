import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockMorseComponent } from './clock-morse.component';

describe('ClockMorseComponent', () => {
  let component: ClockMorseComponent;
  let fixture: ComponentFixture<ClockMorseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockMorseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockMorseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
