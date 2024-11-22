import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly MAX_LENGTH = 16;
  private readonly MIN_LENGTH = 8;
  private readonly SPECIAL_CHARACTERS = /[!@#\$%\^&\*\.]/;
  private readonly ALLOWED_PATTERN = /^[a-zA-Z0-9!@#\$%\^&\*]+$/;

  constructor() {}

  register(username: string, password: string): boolean {
    if (localStorage.getItem(username)) {
      return false; // Usuario duplicado
    }

    if (!this.validateUsername(username) || !this.validatePassword(password)) {
      return false;
    }

    localStorage.setItem(username, password);
    return true;
  }

  login(username: string, password: string): boolean {
    const storedPassword = localStorage.getItem(username);
    return storedPassword === password;
  }

  private validateUsername(username: string): boolean {
    return (
      username.length >= this.MIN_LENGTH &&
      username.length <= this.MAX_LENGTH &&
      this.ALLOWED_PATTERN.test(username) &&
      this.SPECIAL_CHARACTERS.test(username) &&
      !username.includes(' ')
    );
  }

  private validatePassword(password: string): boolean {
    return (
      password.length >= this.MIN_LENGTH &&
      password.length <= this.MAX_LENGTH &&
      this.ALLOWED_PATTERN.test(password) &&
      this.SPECIAL_CHARACTERS.test(password) &&
      !password.includes(' ')
    );
  }
}
