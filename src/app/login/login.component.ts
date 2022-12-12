import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import {  HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable ,  throwError } from 'rxjs';
import { Modal } from 'src/assets/js/bootstrap.bundle';
import { data } from 'jquery';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  usermaster:any;
  displayStyle = "none";


  constructor(private router: Router, private fb: FormBuilder, private api: ApiService, private http: HttpClient) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],

    });
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

    // let body = {
    //   "username":this.loginForm.get('username')?.value,
    //   "password":this.loginForm.get('password')?.value
    //   }
    // this.api.postService('authenticate',JSON.stringify(body)).subscribe((res:any) =>{
    //   console.log(res);
    //   if(res)
    //   {
    //     sessionStorage.setItem("usertype",res.userTypeId)
    //       if(res.userTypeId=='1'){
    //         this.router.navigate(['hdashboard'])

    //       }else{
    //         this.router.navigate(['rdashboard'])
    //       }
    //   }
    //   else{   
    //     this.displayStyle = "block";
    //   }
    // })

    const abc=this.usermaster.filter((data:any) =>(data.usernamename==this.loginForm.get('username')?.value && data.password==this.loginForm.get('password')?.value));
    if(abc.length>0)
    {
      sessionStorage.setItem("usertype",abc[0].type)
        if(abc[0].type=='huser'){
          this.router.navigate(['hdashboard'])
        }else{
          this.router.navigate(['rdashboard'])
        }
    }
    else{   
      this.displayStyle = "block";
    }
  }

  closepopup(){
    this.displayStyle = "none";
  }

}

