import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileUrl: string = 'http://localhost:3000/profile';

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {}

  getProfile(email: string): Observable<ProfileModel> {
    return this.http.get<any>(
      this.profileUrl + `?email=${email}`,
      this.httpOptions
    );
  }
}
