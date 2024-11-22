import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clock-load',
  standalone: true,
  templateUrl: './clock-load.component.html',
  styleUrls: ['./clock-load.component.css'],
  imports: [CommonModule, FormsModule],
})

export class ClockLoadComponent implements OnInit {
  currentHour: number = 0;
  currentMinute: number = 0;
  currentSecond: number = 0;
  isPM: boolean = false;

  filledHours: number[] = [];
  filledMinutes: number[] = [];
  filledSeconds: number[] = [];

  private interval: any;

  ngOnInit(): void {
    const now = new Date();
    this.currentHour = now.getHours() % 12 || 12; // Hora actual en formato de 12 horas
    this.currentMinute = now.getMinutes();
    this.currentSecond = now.getSeconds();
    this.isPM = now.getHours() >= 12;

    this.updateFilledBlocks();
    this.startClock(); // Inicia el reloj
  }

  startClock(): void {
    this.interval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime(): void {
    this.currentSecond++;

    if (this.currentSecond >= 60) {
      this.currentSecond = 0;
      this.currentMinute++;
    }

    if (this.currentMinute >= 60) {
      this.currentMinute = 0;
      this.currentHour++;
    }

    if (this.currentHour > 12) {
      this.currentHour = 1;
    }

    this.isPM = this.currentHour >= 12;
    this.updateFilledBlocks();
  }

  updateFilledBlocks(): void {
    this.filledHours = Array(12)
      .fill(0)
      .map((_, index) => (index < this.currentHour ? 1 : 0));

    this.filledMinutes = Array(60)
      .fill(0)
      .map((_, index) => (index < this.currentMinute ? 1 : 0));

    this.filledSeconds = Array(60)
      .fill(0)
      .map((_, index) => (index < this.currentSecond ? 1 : 0));
  }

  adjustHour(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.currentHour = parseInt(inputElement.value, 10);
      this.updateFilledBlocks();
    }
  }

  adjustMinute(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.currentMinute = parseInt(inputElement.value, 10);
      this.updateFilledBlocks();
    }
  }

  adjustSecond(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.currentSecond = parseInt(inputElement.value, 10);
      this.updateFilledBlocks();
    }
  }
}
