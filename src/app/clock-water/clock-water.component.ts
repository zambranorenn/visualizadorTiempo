import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock-water',
  templateUrl: './clock-water.component.html',
  styleUrls: ['./clock-water.component.css']
})
export class ClockWaterComponent implements OnInit {
  currentHour: number = 0;
  currentMinute: number = 0;
  currentSecond: number = 0;

  hourPercentage: number = 0;
  minutePercentage: number = 0;
  secondPercentage: number = 0;

  isManualAdjust: boolean = false; // Bandera para ajustes manuales
  private interval: any;

  ngOnInit(): void {
    this.initializeTime(); // Establece la hora inicial del dispositivo
    this.startClock();
  }

  initializeTime(): void {
    const now = new Date();
    this.currentHour = now.getHours();
    this.currentMinute = now.getMinutes();
    this.currentSecond = now.getSeconds();
    this.updateJarAnimation();
  }

  startClock(): void {
    if (this.interval) {
      clearInterval(this.interval); // Limpia cualquier intervalo existente
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
    this.updateJarAnimation();
  }

  updateJarAnimation(): void {
    this.hourPercentage = (this.currentHour / 24) * 100;
    this.minutePercentage = (this.currentMinute / 60) * 100;
    this.secondPercentage = (this.currentSecond / 60) * 100;
  }

  adjustHour(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentHour = inputElement.valueAsNumber;
      this.updateJarAnimation();
      this.resetToAutomaticUpdate();
    }
  }

  adjustMinute(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentMinute = inputElement.valueAsNumber;
      this.updateJarAnimation();
      this.resetToAutomaticUpdate();
    }
  }

  adjustSecond(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentSecond = inputElement.valueAsNumber;
      this.updateJarAnimation();
      this.resetToAutomaticUpdate();
    }
  }

  resetToAutomaticUpdate(): void {
    clearTimeout(this.interval); // Limpia el intervalo actual
    setTimeout(() => {
      this.isManualAdjust = false;
      this.startClock(); // Reinicia el reloj
    }, 3000); // Retoma el tiempo automático después de 3 segundos
  }

  getFillColor(percentage: number): string {
    if (percentage <= 33) {
      return '#add8e6'; // Azul claro
    } else if (percentage <= 66) {
      return '#007bff'; // Azul medio
    } else {
      return '#0056b3'; // Azul oscuro
    }
  }
}
