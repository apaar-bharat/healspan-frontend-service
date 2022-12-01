import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import {  HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable ,  throwError } from 'rxjs';
import { data } from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private api: ApiService, private http: HttpClient) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],

    });
  }


  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
  private formatErrors(error: any) {
    return  throwError(() => error);
  }
  OnLogin() {
    console.log(this.loginForm)
    const formData: any = new FormData();
    formData.append('username', this.loginForm.get('username')?.value);
    formData.append('password', this.loginForm.get('password')?.value);
    // this.api
    //   .post('/login', formData)
    //   .subscribe({
    //     next: (response) => 
    //     {
          
    //       console.log("response",response)
    //       if (response.message[0]["WELCOME"]) {
    //         this.router.navigate(['hdashboard']);
    //       }
    //       else(response[0]);{
    //       }
    //     },

    //     error: (error) => console.log("error123",error),
    //   });
    
      this.router.navigate(['hdashboard'])

    // this.http.post('http://192.168.15.20:8080/login',formData,{ responseType: 'json' }).subscribe(
    //       {
    //         next: (response) =>{console.log("response",(response))}  ,
    //         error: (error) => {console.log("error123",(error))},          
    //       })};

  }

}
