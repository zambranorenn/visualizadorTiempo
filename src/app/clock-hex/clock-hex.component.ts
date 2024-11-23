import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock-hex',
  templateUrl: './clock-hex.component.html',
  styleUrls: ['./clock-hex.component.css'],
})
export class ClockHexComponent implements OnInit {
  currentHour: number = 0;
  currentMinute: number = 0;
  currentSecond: number = 0;

  hexHour: string = '';
  hexMinute: string = '';
  hexSecond: string = '';

  isManualAdjust: boolean = false; // Flag for manual adjustment
  private interval: any;

  ngOnInit(): void {
    this.initializeTime(); // Set the initial device time
    this.startClock();
  }

  initializeTime(): void {
    const now = new Date();
    this.currentHour = now.getHours();
    this.currentMinute = now.getMinutes();
    this.currentSecond = now.getSeconds();
    this.updateHexTime();
  }

  startClock(): void {
    if (this.interval) {
      clearInterval(this.interval); // Clear any existing interval
    }
    this.interval = setInterval(() => {
      if (!this.isManualAdjust) {
        this.incrementTime();
      }
    }, 1000);
  }

  incrementTime(): void {
    this.currentSecond++;
    if (this.currentSecond >= 60) {
      this.currentSecond = 0;
      this.currentMinute++;
    }
    if (this.currentMinute >= 60) {
      this.currentMinute = 0;
      this.currentHour++;
    }
    if (this.currentHour >= 24) {
      this.currentHour = 0;
    }
    this.updateHexTime();
  }

  updateHexTime(): void {
    this.hexHour = this.toHex(this.currentHour);
    this.hexMinute = this.toHex(this.currentMinute);
    this.hexSecond = this.toHex(this.currentSecond);
  }

  toHex(num: number): string {
    return num.toString(16).toUpperCase().padStart(2, '0');
  }

  adjustHour(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentHour = inputElement.valueAsNumber;
      this.updateHexTime();
      this.resetToAutomaticUpdate();
    }
  }

  adjustMinute(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentMinute = inputElement.valueAsNumber;
      this.updateHexTime();
      this.resetToAutomaticUpdate();
    }
  }

  adjustSecond(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentSecond = inputElement.valueAsNumber;
      this.updateHexTime();
      this.resetToAutomaticUpdate();
    }
  }

  resetToAutomaticUpdate(): void {
    clearTimeout(this.interval);
    setTimeout(() => {
      this.isManualAdjust = false;
      this.startClock();
    }, 3000); // Resume automatic time after 3 seconds
  }
}
