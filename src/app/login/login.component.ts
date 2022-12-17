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
    private http: HttpClient,private authservice:AuthenticationService,private dataservice:DataService) { }

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
        this.dataservice.currentuser_data.subscribe((res:any) =>{
          if (res.length > 0) {
            if (res[0].type == 'huser') {
              this.router.navigate(['hdashboard'])

            } else {
              this.router.navigate(['rdashboard'])
            }
          }
          else {
            alert("Invalid userid and pass");
            this.displayStyle = "block";
          } 
        })
      
    }  
    else  {
      alert("Wrong username or password");  
    }  

  }


  closepopup() {
    this.displayStyle = "none";
  }

}

