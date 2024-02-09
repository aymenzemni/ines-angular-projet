import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProduitService } from '../../services/produit.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

loginForm: FormGroup;
loading: boolean;
loginn = "root";
passwrd = "root";
wrongLogin: boolean;
authRequest =  {username: '', password: ''};

 constructor(private router: Router, private produitService: ProduitService, private authService: AuthService) {}
 ngOnInit(): void {
    this.authService.removeToken();
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.loginForm.setValue({ username: '', password: '' });
    this.loading = false;
    this.wrongLogin = false;

 }

  login() {
    this.loading = true;
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }
    this.authRequest.username = this.loginForm.controls['username'].value;
    this.authRequest.password = this.loginForm.controls['password'].value;
    if(this.authRequest.username == "root" && this.authRequest.password == "root") {
      this.authService.saveToken('auth_token');
      console.log("you are connected !!", this.authService.getToken());
      this.router.navigate(['/produit']);
    } else {
      console.error("Error Login/password");
      this.loading = false;
      this.wrongLogin = true;
    }

  }

}
