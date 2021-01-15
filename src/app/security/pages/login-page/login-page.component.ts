import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../authorization.service';
import LoginRequestModel from '../../models/login-request.model';
import LoginResponseModel from '../../models/login-response.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  performLogin() {
    const credentials: LoginRequestModel = {
      credentials: {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      },
    };

    this.authService.login(credentials).subscribe(
      (response: LoginResponseModel) => {
        localStorage.setItem('TOKEN', response.token);
        this.router.navigate(['/products']);
      },
      (error) => {
        this.snackBar.open(error.message, 'LOGIN_ERROR', { duration: 3000 });
      }
    );
  }
}
