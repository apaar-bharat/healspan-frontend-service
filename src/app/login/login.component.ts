import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Modal } from 'src/assets/js/bootstrap.bundle';
import { data } from 'jquery';
import { AuthenticationService } from '../service/authentication.service';
import { DataService } from '../service/data.service';
import { CommonserviceService } from '../service/commonservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  usermaster: any;
  displayStyle = "none";
  loginData: any;

  constructor(private router: Router, private fb: FormBuilder, private api: ApiService, 
    private http: HttpClient,private authservice:AuthenticationService,
    private dataservice:DataService,private commonservice:CommonserviceService) { }

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
    return throwError(() => error);
  }

  OnLogin() {
    console.log(this.loginForm)
    if (this.authservice.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)) {  
      this.commonservice.redirecttoactivedashboard();
    }  
    else  {
      this.displayStyle = "block"; 
    }  

  }


  closepopup() {
    this.displayStyle = "none";
  }

}

