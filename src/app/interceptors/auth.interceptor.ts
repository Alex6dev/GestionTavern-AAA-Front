import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { TokenStorageService } from '../services/tokenStorage/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.tokenStorageService.getToken();
    if (accessToken) {
      const authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + accessToken),
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
export const AUTH_INTERCEPTOR = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
