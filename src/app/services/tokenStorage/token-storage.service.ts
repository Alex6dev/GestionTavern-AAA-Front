import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subscription, timer } from 'rxjs';
import { JwtToken } from 'src/app/interfaces/JwtToken';
import { environment } from 'src/environments/environment';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  timerRefreshToken: Observable<number> = timer(780000, 780000);
  apiRefresh = environment.apiUrl + 'refreshToken';
  constructor(private http: HttpClient) {}

  signOut() {
    window.sessionStorage.clear();
  }
  saveToken(token: string) {
    window.sessionStorage.setItem(ACCESS_TOKEN, token);
  }

  getToken() {
    return window.sessionStorage.getItem(ACCESS_TOKEN);
  }

  saveRefreshToken(token: string): void {
    window.sessionStorage.setItem(REFRESH_TOKEN, token);
  }

  getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESH_TOKEN);
  }

  timerRefresh() {
    this.timerRefreshToken.subscribe((timer) => {
      this.refreshToken();
    });
  }
  refreshToken() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getRefreshToken(),
    });
    const requestOptions = { headers: headers };
    this.http
      .get<JwtToken>(this.apiRefresh, requestOptions)
      .subscribe((data) => {
        this.saveToken(data.accessToken);
        this.saveRefreshToken(data.refreshToken);
      });
  }
}
