import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegistroComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.authService.register(this.username, this.password)) {
      alert('User registered successfully!');
      this.router.navigate(['/login']); // Redirigir al login tras registrarse
    } else {
      this.errorMessage = 'Invalid username or password.';
    }
  }
}
