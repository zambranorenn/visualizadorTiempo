import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockWordsComponent } from './clock-words.component';

describe('ClockWordsComponent', () => {
  let component: ClockWordsComponent;
  let fixture: ComponentFixture<ClockWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
