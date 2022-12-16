import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  usermaster:any;
  public currentUserSubject!: BehaviorSubject<String>;
  public currentUser!: Observable<String>;
  constructor(private api: ApiService,private http:HttpClient,private router: Router,) { 
    this.usermaster = [
      {
        "id" : 1,
        "usernamename" : 'vishal',
        "password": '123',
        "type" : 'huser',
      },
      {
        "id" : 2,
        "usernamename" : 'divya',
        "password": '123',
        "type" : 'ruser'
      }
    ]

    let user = localStorage.getItem('currentuser');
   // this.currentUserSubject =new BehaviorSubject<String>(JSON.parse(localStorage.getItem('currentuser') || '{}'));

    this.currentUserSubject =new BehaviorSubject<String>(localStorage.getItem('currentuser') || '{}');
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  login(username: string, password: string) {
    let body = {
      "username":username,
      "password":password
      }

    // return this.http.post<any>(`authenticate`,body)
    //     .pipe(map(user => {
    //         // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
    //         user.authdata = window.btoa(username + ':' + password);
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //         this.currentUserSubject.next(user);
    //         return user;
    //     }));

    const abc=this.usermaster.filter((data:any) =>(data.usernamename==username && data.password==password));
    if(abc.length>0)
    {
      localStorage.setItem('currentUser', JSON.stringify(abc[0]));
      //this.currentUserSubject.next(abc[0]);
      //this.currentUserSubject =new BehaviorSubject<String>(JSON.parse(abc[0]) || '{}');
      //this.currentUser = this.currentUserSubject.asObservable();
      
    }
    return abc;
  }
  
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next("");
    const currentUser = this.currentUserValue;

    this.router.navigate(['login'])
  }

  public get currentUserValue(): String {
    return this.currentUserSubject.value;
  }

}
