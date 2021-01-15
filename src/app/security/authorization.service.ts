import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import LoginRequestModel from './models/login-request.model';
import LoginResponseModel from './models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private authorizationUrl = 'http://localhost:3000/auth';

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };
  constructor(private http: HttpClient) {}

  login(credentials: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(
      this.authorizationUrl + '/login',
      credentials,
      this.httpOptions
    );
  }
}
