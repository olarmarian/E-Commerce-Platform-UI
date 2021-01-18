import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthCredentialsModel } from './models/auth-credentials.model';
import { SignUpRequestModel } from './models/signup-request.model';
import { AuthResponseModel } from './models/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authorizationUrl = 'http://localhost:3000/auth';

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };
  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentialsModel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(
      this.authorizationUrl + '/login',
      credentials,
      this.httpOptions
    );
  }

  signup(credentials: SignUpRequestModel) {
    return this.http.post<any>(
      this.authorizationUrl + '/signup',
      credentials,
      this.httpOptions
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('TOKEN');
  }
}
