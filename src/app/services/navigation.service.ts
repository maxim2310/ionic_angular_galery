import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const NAVURLS = {
  home: () => '/home',
  login: () => '/login',
  registration: () => '/registration',
  itemDetailsL: (id: string) => `/item/${id}`
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  home() {
    this.router.navigateByUrl(NAVURLS.home());
  }
  login() {
    this.router.navigateByUrl(NAVURLS.login());
  }
  registration() {
    this.router.navigateByUrl(NAVURLS.registration());
  }
  itemDetails(id: string) {
    this.router.navigateByUrl(NAVURLS.itemDetailsL(id))
  }
}
