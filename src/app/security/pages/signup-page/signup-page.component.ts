import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  performSignUp() {
    const credentials = {
      credentials: {
        email: this.signupForm.get('email').value,
        password: this.signupForm.get('password').value,
      },
    };
    this.authService.signup(credentials).subscribe(
      () => {
        this.snackBar.open('User created!', '', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      (error) => {
        this.snackBar.open(error.message, 'SIGNUP_ERROR', { duration: 3000 });
      }
    );
  }
}
