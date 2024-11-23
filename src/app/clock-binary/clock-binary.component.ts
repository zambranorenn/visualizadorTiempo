import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock-binary',
  standalone: true,
  templateUrl: './clock-binary.component.html',
  styleUrls: ['./clock-binary.component.css'],
  imports: [CommonModule],
})
export class ClockBinaryComponent implements OnInit {
  currentHour: number = 0;
  currentMinute: number = 0;
  currentSecond: number = 0;

  binaryHours: string[] = [];
  binaryMinutes: string[] = [];
  binarySeconds: string[] = [];

  isManualAdjust: boolean = false; // Bandera para determinar si hay ajuste manual
  private interval: any;

  ngOnInit(): void {
    this.initializeTime(); // Inicia con la hora actual del dispositivo
    this.startClock();
  }

  initializeTime(): void {
    const now = new Date();
    this.currentHour = now.getHours();
    this.currentMinute = now.getMinutes();
    this.currentSecond = now.getSeconds();
    this.updateBinary(); // Actualiza las representaciones binarias
  }

  startClock(): void {
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
    this.updateBinary();
  }

  updateBinary(): void {
    this.binaryHours = this.toBinary(this.currentHour);
    this.binaryMinutes = this.toBinary(this.currentMinute);
    this.binarySeconds = this.toBinary(this.currentSecond);
  }

  toBinary(value: number): string[] {
    return value.toString(2).padStart(6, '0').split('');
  }

  adjustHour(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentHour = inputElement.valueAsNumber;
      this.updateBinary();
      this.resetManualAdjust(); // Permite que el reloj continúe después de ajustar
    }
  }

  adjustMinute(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentMinute = inputElement.valueAsNumber;
      this.updateBinary();
      this.resetManualAdjust();
    }
  }

  adjustSecond(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentSecond = inputElement.valueAsNumber;
      this.updateBinary();
      this.resetManualAdjust();
    }
  }

  resetManualAdjust(): void {
    clearTimeout(this.interval); // Detiene el intervalo temporalmente
    setTimeout(() => {
      this.isManualAdjust = false; // Reactiva la actualización automática después de 3 segundos
      this.startClock();
    }, 3000);
  }
}
