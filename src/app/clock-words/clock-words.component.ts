import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clock-words',
  templateUrl: './clock-words.component.html',
  styleUrls: ['./clock-words.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ClockWordsComponent implements OnInit {
  timeInWords: string = '';
  time = new Date();

  customHour = this.time.getHours() % 12 || 12; // Formato 12 horas
  customMinute = this.time.getMinutes();
  customSecond = this.time.getSeconds();
  isPM = this.time.getHours() >= 12;

  private timer: any;

  ngOnInit(): void {
    this.updateTimeInWords();
    this.startClock();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  // Inicia el reloj actualizando cada segundo
  startClock(): void {
    this.timer = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1);
      this.syncSliders();
      this.updateTimeInWords();
    }, 1000);
  }

  // Sincroniza los sliders con la hora actual
  syncSliders(): void {
    const hours = this.time.getHours();
    this.customHour = hours % 12 || 12; // Ajusta al formato de 12 horas
    this.customMinute = this.time.getMinutes();
    this.customSecond = this.time.getSeconds();
    this.isPM = hours >= 12;
  }

  // Actualiza las palabras dinámicamente
  updateTimeInWords(): void {
    const hours = this.customHour;
    const minutes = this.customMinute;
    const seconds = this.customSecond;

    this.timeInWords = this.convertToWords(hours, minutes, seconds);
  }

  // Convierte los números en texto
  convertToWords(hours: number, minutes: number, seconds: number): string {
    const hourWords = this.convertHourToWords(hours);
    const minuteWords = this.convertMinuteToWords(minutes);
    const secondWords = this.convertSecondToWords(seconds);
    const period = this.isPM ? 'PM' : 'AM';
    return `Son las ${hourWords} ${minuteWords} con ${secondWords} ${period}`;
  }

  convertHourToWords(hours: number): string {
    const hourWords = [
      'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis',
      'siete', 'ocho', 'nueve', 'diez', 'once', 'doce',
    ];
    return hourWords[hours - 1];
  }

  convertMinuteToWords(minutes: number): string {
    if (minutes === 0) return '';
    if (minutes === 15) return 'y cuarto';
    if (minutes === 30) return 'y media';
    if (minutes === 45) return 'menos cuarto';
    return `y ${this.numberToWords(minutes)}`;
  }

  convertSecondToWords(seconds: number): string {
    return `${this.numberToWords(seconds)} ${seconds === 1 ? 'segundo' : 'segundos'}`;
  }

  numberToWords(num: number): string {
    const numbers = [
      'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis',
      'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece',
      'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho',
      'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés',
      'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete',
      'veintiocho', 'veintinueve', 'treinta', 'treinta y uno',
      'treinta y dos', 'treinta y tres', 'treinta y cuatro',
      'treinta y cinco', 'treinta y seis', 'treinta y siete',
      'treinta y ocho', 'treinta y nueve', 'cuarenta', 'cuarenta y uno',
      'cuarenta y dos', 'cuarenta y tres', 'cuarenta y cuatro',
      'cuarenta y cinco', 'cuarenta y seis', 'cuarenta y siete',
      'cuarenta y ocho', 'cuarenta y nueve', 'cincuenta', 'cincuenta y uno',
      'cincuenta y dos', 'cincuenta y tres', 'cincuenta y cuatro',
      'cincuenta y cinco', 'cincuenta y seis', 'cincuenta y siete',
      'cincuenta y ocho', 'cincuenta y nueve',
    ];
    return numbers[num];
  }

  // Ajusta el tiempo dinámicamente
  adjustHour(hour: number): void {
    const newHour = this.isPM ? hour + 12 : hour;
    this.time.setHours(newHour);
    this.syncSliders();
    this.updateTimeInWords();
  }

  adjustMinute(minute: number): void {
    this.time.setMinutes(minute);
    this.syncSliders();
    this.updateTimeInWords();
  }

  adjustSecond(second: number): void {
    this.time.setSeconds(second);
    this.syncSliders();
    this.updateTimeInWords();
  }

  toggleAMPM(): void {
    const currentHour = this.time.getHours();
    this.time.setHours(this.isPM ? currentHour - 12 : currentHour + 12);
    this.isPM = !this.isPM;
    this.syncSliders();
    this.updateTimeInWords();
  }
}
