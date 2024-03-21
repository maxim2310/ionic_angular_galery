import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private navService: NavigationService,
    private storService: StorageService
  ) {}

  canActivate(): Observable<boolean> {
    return from(this.storService.getData(AuthService.ACTIVE_USER_KEY)).pipe(
      map((user) => {
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
