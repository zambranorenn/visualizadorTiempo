import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { CommonModule } from '@angular/common';
import { ClockDigitalComponent } from '../clock-digital/clock-digital.component';
import { ClockWordsComponent } from '../clock-words/clock-words.component';
import { ClockMorseComponent } from '../clock-morse/clock-morse.component';
import { ClockProgressComponent } from "../clock-progress/clock-progress.component";
import { ClockLoadComponent } from '../clock-load/clock-load.component';
import { ClockLoadCircleComponent } from "../clock-load-circle/clock-load-circle.component";
import { ClockBinaryComponent } from '../clock-binary/clock-binary.component';
import { ClockRomanComponent } from '../clock-roman/clock-roman.component';
import { ClockWaterComponent } from '../clock-water/clock-water.component'; 
import { ClockHexComponent } from '../clock-hex/clock-hex.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ClockDigitalComponent, ClockWordsComponent, ClockMorseComponent, 
    ClockProgressComponent, ClockLoadComponent, ClockLoadCircleComponent, ClockBinaryComponent,
    ClockRomanComponent, ClockWaterComponent, ClockHexComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  selectedVisualization: string = 'digital';

  visualizations = [
    { value: 'digital', label: 'Reloj Digital' },
    { value: 'words', label: 'Reloj en Palabras' },
    { value: 'morse', label: 'Reloj en Código Morse' },
    { value: 'progress', label: 'Reloj de Progreso' },
    { value: 'load', label: 'Reloj de Carga' },
    { value: 'load-circle', label: 'Reloj de Carga Circular' },
    { value: 'binary', label: 'Reloj Binario' },
    { value: 'romane', label: 'Reloj Romano'},
    { value: 'water', label: 'Reloj de Agua'},
    { value: 'hex', label: 'Reloj Hexadecimal'}
  ];

  constructor(private router: Router) {} // Inyecta el Router

  onVisualizationChange(event: any): void {
    this.selectedVisualization = event.target.value;
  }

  logout(): void {
    this.router.navigate(['/login']); // Redirige al componente de login
  }
}
