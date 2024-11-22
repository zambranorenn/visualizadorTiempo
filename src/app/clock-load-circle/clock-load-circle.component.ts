import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clock-load-circle',
  standalone: true,
  templateUrl: './clock-load-circle.component.html',
  styleUrls: ['./clock-load-circle.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ClockLoadCircleComponent implements OnInit {
  @ViewChild('clockCanvas', { static: true }) clockCanvas!: ElementRef<HTMLCanvasElement>;

  currentHour: number = 0;
  currentMinute: number = 0;
  currentSecond: number = 0;
  isPM: boolean = false;

  private ctx!: CanvasRenderingContext2D;
  private interval: any;
  private isManualAdjust: boolean = false; // Bandera para evitar el reinicio al cambiar sliders

  ngOnInit(): void {
    const now = new Date();
    this.currentHour = now.getHours() % 12 || 12;
    this.currentMinute = now.getMinutes();
    this.currentSecond = now.getSeconds();
    this.isPM = now.getHours() >= 12;

    this.ctx = this.clockCanvas.nativeElement.getContext('2d')!;
    this.startClock();
  }

  startClock(): void {
    this.updateCanvas();
    this.interval = setInterval(() => {
      if (!this.isManualAdjust) {
        this.updateTime();
        this.updateCanvas();
      }
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
  }

  updateCanvas(): void {
    const canvas = this.clockCanvas.nativeElement;
    const ctx = this.ctx;

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2 - 20;

    ctx.clearRect(0, 0, width, height);

    // Dibujar el círculo base
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dibujar trazos de horas
    this.drawSegments(ctx, width, height, radius, 12, this.currentHour, '#007bff');

    // Dibujar trazos de minutos
    this.drawSegments(ctx, width, height, radius - 15, 60, this.currentMinute, '#28a745');

    // Dibujar trazos de segundos
    this.drawSegments(ctx, width, height, radius - 30, 60, this.currentSecond, '#ff5733');
  }

  drawSegments(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    radius: number,
    segments: number,
    filled: number,
    color: string
  ): void {
    const angleStep = (2 * Math.PI) / segments;

    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep - Math.PI / 2; // Iniciar en la parte superior
      const x1 = width / 2 + radius * Math.cos(angle);
      const y1 = height / 2 + radius * Math.sin(angle);
      const x2 = width / 2 + (radius - 10) * Math.cos(angle);
      const y2 = height / 2 + (radius - 10) * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = i < filled ? color : '#ccc';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  adjustHour(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentHour = inputElement.valueAsNumber;
      this.updateCanvas();
      setTimeout(() => (this.isManualAdjust = false), 2000);
    }
  }

  adjustMinute(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentMinute = inputElement.valueAsNumber;
      this.updateCanvas();
      setTimeout(() => (this.isManualAdjust = false), 2000);
    }
  }

  adjustSecond(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.valueAsNumber !== null) {
      this.isManualAdjust = true;
      this.currentSecond = inputElement.valueAsNumber;
      this.updateCanvas();
      setTimeout(() => (this.isManualAdjust = false), 2000);
    }
  }
}
