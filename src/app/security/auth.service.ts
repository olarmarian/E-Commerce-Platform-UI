import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthCredentialsModel } from './models/auth-credentials.model';
import { SignUpRequestModel } from './models/signup-request.model';
import { AuthResponseModel } from './models/auth-response.model';
import jwt_decode from 'jwt-decode';
import { AUTH_URLS, BASE_URL, CORE_URLS, LABELS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authorizationUrl = BASE_URL + CORE_URLS.AUTH;

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };

  private userEmail = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentialsModel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(
      this.authorizationUrl + AUTH_URLS.LOGIN,
      credentials,
      this.httpOptions
    );
  }

  signup(credentials: SignUpRequestModel) {
    return this.http.post<any>(
      this.authorizationUrl + AUTH_URLS.SIGNUP,
      credentials,
      this.httpOptions
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(LABELS.TOKEN);
    if (token) {
      return true;
    }
    return false;
  }

  getUserEmail(): Observable<string> {
    const token = localStorage.getItem(LABELS.TOKEN);
    if (token) {
      const decodedJwt: any = jwt_decode(token);
      this.userEmail.next(decodedJwt.email);
      return this.userEmail.asObservable();
    }
    return null;
  }

  logout() {
    localStorage.removeItem(LABELS.TOKEN);
  }
}
