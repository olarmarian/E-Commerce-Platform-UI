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
  loginForm: FormGroup;
  submitted: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.submitted = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  performLogin() {
    if (this.loginForm.invalid) {
      this.submitted = true;
    } else {
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
          console.log(error.message, 'login error');
          this.snackBar.open('Invalid credentials.', '', { duration: 3000 });
        }
      );
    }
  }
}
