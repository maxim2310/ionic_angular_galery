import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from 'src/models/user';
import { BehaviorSubject } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService  {
  static readonly ACTIVE_USER_KEY = 'active_user';
  private user = new BehaviorSubject<User | null>(null);

  public user$ = this.user.asObservable()

  constructor(private storService: StorageService) {

    this.storService.getData(AuthService.ACTIVE_USER_KEY).then(user => {
      if (user) {
        this.user.next(user)
      }
    })
  }


  async createUser(user: User) {
    const existUser = await this.storService.getData(user.email);
    if (existUser) {
      throw new Error('User already exists');
    }

    this.storService.saveData(user.email, user.password);
    this.storService.saveData(AuthService.ACTIVE_USER_KEY, user);
    this.user.next(user);
  }

  async login(user: User) {
    const password = await this.storService.getData(user.email);

    if (user.password !== password) {
      throw new Error('Email or password is wrong');
    }

    this.user.next(user);
    this.storService.saveData(AuthService.ACTIVE_USER_KEY, user);
  }

  async logOut() {
    this.storService.removeData(AuthService.ACTIVE_USER_KEY).then(() => {
      this.user.next(null)
    })
  }
}
