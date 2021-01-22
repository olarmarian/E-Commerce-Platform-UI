import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL, CORE_URLS } from 'src/app/constants';
import { AddressModel } from '../models/address.model';
import { CardModel } from '../models/card.model';
import { ProfileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileUrl: string = BASE_URL + CORE_URLS.PROFILES;

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };

  private profile = new BehaviorSubject<ProfileModel>(null);

  constructor(private http: HttpClient) {}

  loadProfile(email: string): void {
    this.http
      .get<ProfileModel>(this.profileUrl + `?email=${email}`, this.httpOptions)
      .subscribe((data) => this.profile.next(data));
  }

  getProfile(email: string): Observable<ProfileModel> {
    this.loadProfile(email);
    return this.profile.asObservable();
  }

  private getProfileId(): string {
    let id: string;
    this.profile.subscribe((data) => {
      console.log(data, 'data');
      id = data._id;
    });
    return id;
  }

  addAddress(address: AddressModel): Observable<any> {
    const id: string = this.getProfileId();
    const postBody = { address };

    return this.http.post<any>(
      this.profileUrl + `/${id}/address`,
      postBody,
      this.httpOptions
    );
  }

  deleteAddress(name: string): Observable<any> {
    const id: string = this.getProfileId();

    return this.http.delete<any>(
      this.profileUrl + `/${id}/address/${name}`,
      this.httpOptions
    );
  }

  editAddress(oldName: string, address: AddressModel): Observable<any> {
    const id: string = this.getProfileId();
    const putBody = { address };

    return this.http.put<any>(
      this.profileUrl + `/${id}/address/${oldName}`,
      putBody,
      this.httpOptions
    );
  }

  addCard(card: CardModel): Observable<any> {
    const id: string = this.getProfileId();
    const postBody = { card };

    return this.http.post<any>(
      this.profileUrl + `/${id}/card`,
      postBody,
      this.httpOptions
    );
  }

  deleteCard(name: string): Observable<any> {
    const id: string = this.getProfileId();

    return this.http.delete<any>(
      this.profileUrl + `/${id}/card/${name}`,
      this.httpOptions
    );
  }

  editCard(oldName: string, card: CardModel): Observable<any> {
    const id: string = this.getProfileId();
    const putBody = { card };

    return this.http.put<any>(
      this.profileUrl + `/${id}/card/${oldName}`,
      putBody,
      this.httpOptions
    );
  }
}
