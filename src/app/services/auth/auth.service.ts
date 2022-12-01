import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUser } from 'src/app/interfaces/currentUser';
import { Player, PlayerModel } from 'src/app/interfaces/player';
import { Status } from 'src/app/interfaces/status';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenStorageService } from '../tokenStorage/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private curUser = new BehaviorSubject<CurrentUser>({
    connected: false,
  });

  curUserObs$ = this.curUser.asObservable();
  apiProfile = environment.apiUrl + 'api/game/profile';

  apiRegister = environment.apiUrl + 'api/register';
  apiLogin = environment.apiUrl + 'login';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    let body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    return this.http
      .post<any>(this.apiLogin, body.toString(), httpOptions)
      .pipe(
        map((userData) => {
          sessionStorage.setItem('email', email);
          return userData;
        })
      );
  }
  register(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiRegister, player);
  }

  getPlayer(): Observable<PlayerModel> {
    return this.http.get<PlayerModel>(this.apiProfile);
  }

  setCurrentUser(auth: CurrentUser) {
    this.curUser.next(auth);
  }

  isUserLoggedIn() {
    let email = sessionStorage.getItem('email');
    return !(email === null);
  }

  isPlayer(obj: any): obj is Player {
    return 'email' in obj;
  }

  isStatus(obj: any): obj is Status {
    return 'response' in obj;
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }
}
