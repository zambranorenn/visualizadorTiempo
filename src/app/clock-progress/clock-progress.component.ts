import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clock-progress',
  templateUrl: './clock-progress.component.html',
  styleUrls: ['./clock-progress.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ClockProgressComponent implements OnInit {
  timeNumeric: string = '';
  progress: number = 0; // Porcentaje de progreso
  time = new Date();

  customHour = this.time.getHours();
  customMinute = this.time.getMinutes();
  customSecond = this.time.getSeconds();

  private timer: any;

  ngOnInit(): void {
    this.updateProgress();
    this.startClock();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  // Inicia el reloj y actualiza cada segundo
  startClock(): void {
    this.timer = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1);
      this.updateProgress();
    }, 1000);
  }

  // Calcula el progreso del día/noche y la hora numérica
  updateProgress(): void {
    const hours = this.time.getHours();
    const minutes = this.time.getMinutes();
    const seconds = this.time.getSeconds();

    // Actualiza los sliders con el tiempo actual
    this.customHour = hours;
    this.customMinute = minutes;
    this.customSecond = seconds;

    // Calcula el total de segundos transcurridos desde el inicio del día
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const daySeconds = 24 * 3600; // Total de segundos en un día

    this.progress = ((totalSeconds / daySeconds) * 100).toFixed(2) as unknown as number; // Porcentaje
    this.timeNumeric = `${this.formatNumber(hours)}:${this.formatNumber(minutes)}:${this.formatNumber(seconds)}`;
  }

  // Formatea los números a dos dígitos
  formatNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  // Ajustar horas
  adjustHour(hour: number): void {
    this.time.setHours(hour);
    this.updateProgress();
  }

  // Ajustar minutos
  adjustMinute(minute: number): void {
    this.time.setMinutes(minute);
    this.updateProgress();
  }

  // Ajustar segundos
  adjustSecond(second: number): void {
    this.time.setSeconds(second);
    this.updateProgress();
  }
}
