import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  public currentUserSubject!: BehaviorSubject<String>;
  public currentUser!: Observable<String>;
  constructor(private api: ApiService) { }

  login(username: string, password: string) {
    // return  this.api.post(`authenticate`, { username, password })
    //     .pipe(map(user => {
    //         // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
    //         user.authdata = window.btoa(username + ':' + password);
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //         this.currentUserSubject.next(user);
    //         return user;
    //     }));
  }
  
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next("");
  }

  public get currentUserValue(): String {
    return this.currentUserSubject.value;
  }

}
