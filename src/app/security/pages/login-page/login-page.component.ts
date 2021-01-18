import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { AuthCredentialsModel } from '../../models/auth-credentials.model';
import { AuthResponseModel } from '../../models/auth-response.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
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
    const credentials: AuthCredentialsModel = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };

    this.authService.login(credentials).subscribe(
      (response: AuthResponseModel) => {
        localStorage.setItem('TOKEN', response.token);
        this.router.navigate(['/products']);
      },
      (error) => {
        this.snackBar.open(error.message, 'LOGIN_ERROR', { duration: 3000 });
      }
    );
  }
}
