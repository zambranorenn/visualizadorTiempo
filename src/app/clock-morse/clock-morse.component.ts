import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clock-morse',
  templateUrl: './clock-morse.component.html',
  styleUrls: ['./clock-morse.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ClockMorseComponent implements OnInit {
  timeNumeric: string = '';
  timeMorse: string = '';
  time = new Date();

  customHour = this.time.getHours();
  customMinute = this.time.getMinutes();
  customSecond = this.time.getSeconds();

  private timer: any;

  morseCode: { [key: string]: string } = {
    0: '-----',
    1: '.----',
    2: '..---',
    3: '...--',
    4: '....-',
    5: '.....',
    6: '-....',
    7: '--...',
    8: '---..',
    9: '----.',
  };

  ngOnInit(): void {
    this.updateTime();
    this.startClock();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  // Inicia el reloj
  startClock(): void {
    this.timer = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1);
      this.updateTime();
    }, 1000);
  }

  // Actualiza la hora numérica y en código Morse
  updateTime(): void {
    const hours = this.time.getHours();
    const minutes = this.time.getMinutes();
    const seconds = this.time.getSeconds();

    this.timeNumeric = `${this.formatNumber(hours)}:${this.formatNumber(minutes)}:${this.formatNumber(seconds)}`;
    this.timeMorse = this.convertToMorse(hours, minutes, seconds);

    this.syncSliders(hours, minutes, seconds);
  }

  // Formatea los números a dos dígitos
  formatNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  // Convierte la hora a código Morse
  convertToMorse(hours: number, minutes: number, seconds: number): string {
    const h = this.formatNumber(hours);
    const m = this.formatNumber(minutes);
    const s = this.formatNumber(seconds);

    return `${this.convertDigitToMorse(h[0])} ${this.convertDigitToMorse(h[1])} : ` +
           `${this.convertDigitToMorse(m[0])} ${this.convertDigitToMorse(m[1])} : ` +
           `${this.convertDigitToMorse(s[0])} ${this.convertDigitToMorse(s[1])}`;
  }

  convertDigitToMorse(digit: string): string {
    return this.morseCode[digit] || '';
  }

  // Sincroniza los sliders con la hora actual
  syncSliders(hours: number, minutes: number, seconds: number): void {
    this.customHour = hours;
    this.customMinute = minutes;
    this.customSecond = seconds;
  }

  // Ajusta el tiempo dinámicamente
  adjustHour(hour: number): void {
    this.time.setHours(hour);
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
}
