import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private navService: NavigationService) {}

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.navService.login();
          return false;
        }
      })
    );
  }
}
