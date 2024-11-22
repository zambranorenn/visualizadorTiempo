import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clock-digital',
  templateUrl: './clock-digital.component.html',
  styleUrls: ['./clock-digital.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ClockDigitalComponent implements OnInit {
  time = new Date();
  customHour = this.time.getHours() % 12 || 12;
  customMinute = this.time.getMinutes();
  customSecond = this.time.getSeconds();
  isPM = this.time.getHours() >= 12;

  private timer: any;

  ngOnInit(): void {
    this.startClock();
  }

  startClock(): void {
    this.timer = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1);
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  // Ajusta el tiempo dinámicamente a medida que se mueve el slider
  adjustHour(hour: number): void {
    this.time.setHours(this.isPM ? hour + 12 : hour);
    this.updateTime();
  }

  adjustMinute(minute: number): void {
    this.time.setMinutes(minute);
    this.updateTime();
  }

  adjustSecond(second: number): void {
    this.time.setSeconds(second);
    this.updateTime();
  }

  toggleAMPM(): void {
    const currentHour = this.time.getHours();
    this.time.setHours(this.isPM ? currentHour - 12 : currentHour + 12);
    this.isPM = !this.isPM;
    this.updateTime();
  }

  private updateTime(): void {
    const hours = this.time.getHours();
    this.customHour = hours % 12 || 12;
    this.customMinute = this.time.getMinutes();
    this.customSecond = this.time.getSeconds();
    this.isPM = hours >= 12;
  }
}
