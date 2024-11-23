import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock-roman',
  standalone: true,
  templateUrl: './clock-roman.component.html',
  styleUrls: ['./clock-roman.component.css'],
  imports: [CommonModule],
})
export class ClockRomanComponent implements OnInit {
  currentHour: number = 0;
  currentMinute: number = 0;
  currentSecond: number = 0;

  romanHour: string = '';
  romanMinute: string = '';
  romanSecond: string = '';

  isManualAdjust: boolean = false; // Bandera para ajustes manuales
  private interval: any;

  ngOnInit(): void {
    this.initializeTime(); // Establece la hora inicial del dispositivo
    this.startClock();
  }

  initializeTime(): void {
    const now = new Date();
    this.currentHour = now.getHours(); // Usa el formato de 24 horas directamente
    this.currentMinute = now.getMinutes();
    this.currentSecond = now.getSeconds();
    this.updateRomanTime();
  }

  startClock(): void {
    if (this.interval) {
      clearInterval(this.interval); // Limpia cualquier intervalo previo
    }
    this.interval = setInterval(() => {
      if (!this.isManualAdjust) {
        this.incrementTime();
      }
    }, 1000); // Incrementa cada segundo
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
    this.updateRomanTime();
  }

  updateRomanTime(): void {
    this.romanHour = this.toRoman(this.currentHour); // No convierte a formato 12 horas
    this.romanMinute = this.toRoman(this.currentMinute);
    this.romanSecond = this.toRoman(this.currentSecond);
  }

  toRoman(num: number): string {
    const romanMap: [number, string][] = [
      [50, 'L'],
      [40, 'XL'],
      [10, 'X'],
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I'],
    ];

    let roman = '';
    for (const [value, numeral] of romanMap) {
      while (num >= value) {
        roman += numeral;
        num -= value;
      }
    }
    return roman || '-'; // Si es 0, muestra '-'
  }

  adjustHour(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentHour = inputElement.valueAsNumber;
      this.updateRomanTime();
      this.resetManualAdjust();
    }
  }

  adjustMinute(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentMinute = inputElement.valueAsNumber;
      this.updateRomanTime();
      this.resetManualAdjust();
    }
  }

  adjustSecond(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentSecond = inputElement.valueAsNumber;
      this.updateRomanTime();
      this.resetManualAdjust();
    }
  }

  resetManualAdjust(): void {
    clearInterval(this.interval); // Detiene el intervalo existente
    setTimeout(() => {
      this.isManualAdjust = false;
      this.startClock(); // Reinicia el reloj
    }, 3000); // Retoma el tiempo automático después de 3 segundos
  }
}
