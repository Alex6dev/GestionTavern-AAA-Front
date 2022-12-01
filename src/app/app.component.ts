import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { TokenStorageService } from './services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  jwtTimer: Observable<number> = timer(0, 24000);
  isLoggedIn = false;
  title = ' ';

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    const refreshToken = this.tokenStorageService.getRefreshToken();
    if (refreshToken) {
      this.tokenStorageService.refreshToken();
      this.tokenStorageService.timerRefresh();
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
  }
}
