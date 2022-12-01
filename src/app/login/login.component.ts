import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { TokenStorageService } from '../services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-connection',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  connectionForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  get f() {
    return this.connectionForm.controls;
  }
  ngOnInit(): void {}

  onSubmit() {
    const val = this.connectionForm.value;
    this.submitted = true;
    if (this.connectionForm.valid) {
      if (val.email && val.password) {
        this.authService.login(val.email, val.password).subscribe((data) => {
          this.tokenStorageService.saveToken(data.accessToken);
          this.tokenStorageService.saveRefreshToken(data.refreshToken);
          this.router.navigateByUrl('/home/menu');
        });
      }
      this.tokenStorageService.timerRefresh();
    }
  }
}
