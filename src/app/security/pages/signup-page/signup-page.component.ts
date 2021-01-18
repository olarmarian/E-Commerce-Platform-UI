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

  submitted: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.submitted = false;
  }

  performSignUp() {
    if (this.signupForm.invalid) {
      this.submitted = true;
    } else {
      const credentials = {
        credentials: {
          email: this.signupForm.get('email').value,
          password: this.signupForm.get('password').value,
        },
      };
      this.authService.signup(credentials).subscribe(
        (response) => {
          this.snackBar.open(response.message, '', { duration: 3000 });

          if (response.success) {
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          console.log(error.message, 'signup error');
          this.snackBar.open('Unknown error.', '', { duration: 3000 });
        }
      );
    }
  }
}
