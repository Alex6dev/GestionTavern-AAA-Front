import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from '../interfaces/currentUser';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-player-menu',
  templateUrl: './player-menu.component.html',
  styleUrls: ['./player-menu.component.css'],
})
export class PlayerMenuComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  currentUser!: CurrentUser;

  ngOnInit(): void {
    this.authService.getPlayer().subscribe((response) => {
      let player: CurrentUser = {
        connected: true,
        player: response,
      };

      this.authService.setCurrentUser(player);
      this.currentUser = player;

      sessionStorage.setItem('connected', 'true');
      sessionStorage.setItem('player', JSON.stringify(response.nickname));
    });
  }
  logOut() {
    this.authService.logOut();
  }
}
