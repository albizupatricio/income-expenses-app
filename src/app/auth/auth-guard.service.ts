import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/internal/operators/take';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private authService: AuthService) {}

  canActivate() {
    return this.authService.isAuth();
  }

  canLoad() {
    //Debe cancelar subscripción para poder volver a acceder, porque el objeto no está cargado aún.
    return this.authService.isAuth()
            .pipe(
              take(1)
            );
  }
}
