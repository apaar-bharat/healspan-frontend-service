import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  usermaster:any;
  public currentUserSubject!: BehaviorSubject<String>;
  public currentUser!: Observable<String>;
  constructor(private api: ApiService,private http:HttpClient,private dataservice:DataService) { 
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
  }
  
  login(username: string, password: string) {
    let body = {
      "username":username,
      "password":password
      }
    //const userdata =this.usermaster.filter((data:any) =>(data.usernamename==username && data.password==password));
    const userdata = this.api.loginpostService(environment.baseUrl+"authentication/login",body).subscribe((userdata:any) =>{
      if(userdata)
      {
        localStorage.setItem('currentUser', "loggedin"); 
        localStorage.setItem("usertype",'huser');
        localStorage.setItem("LoggedInId",userdata.id);
        localStorage.setItem("jwttoken",userdata.jwt);
        this.dataservice.updatecurrentuser_data(userdata); 
        // return userdata; 
        return true;
        
      }
      return true;
    })
    
    return false;
  }
  
  logout() {  
    localStorage.removeItem('currentUser');  
  }  
  
  public get loggedIn(): boolean {  
    return (localStorage.getItem('currentUser') !== null);  
  }  

}
