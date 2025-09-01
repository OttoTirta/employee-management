import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  getUsername(){
    return this.authService.getFullName();
  }

  onLogout(){
    this.authService.logout();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  redirectToHome(){
    this.router.navigateByUrl('/home');
  }
}
