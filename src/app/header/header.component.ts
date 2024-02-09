import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
constructor(private authService: AuthService, private router: Router) {}
 ngOnInit(): void {}

 logOut() {
 this.authService.removeToken();
 this.router.navigate(['/login']);
 }

}
