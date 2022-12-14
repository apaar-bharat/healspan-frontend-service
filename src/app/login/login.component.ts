import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Modal } from 'src/assets/js/bootstrap.bundle';
import { data } from 'jquery';
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

  constructor(private router: Router, private fb: FormBuilder, private api: ApiService, private http: HttpClient) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],

    });
    this.usermaster = [
      {
        "id": 1,
        "usernamename": 'vishal',
        "password": '123',
        "type": 'huser',
      },
      {
        "id": 2,
        "usernamename": 'divya',
        "password": '123',
        "type": 'ruser'
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
    return throwError(() => error);
  }
  OnLogin() {
    console.log(this.loginForm)

    const abc = this.usermaster.filter((data: any) => (data.usernamename == this.loginForm.get('username')?.value && data.password == this.loginForm.get('password')?.value));
    if (abc.length > 0) {
      sessionStorage.setItem("usertype", abc[0].type)
      if (abc[0].type == 'huser') {
        // alert("huser");
        this.router.navigate(['hdashboard'])

      } else {
        // alert("ruser");
        this.router.navigate(['rdashboard'])
      }
    }
    else {
      alert("Invalid userid and pass");
      // document.getElementById("modalChoice").style.display = "block" ;    
      // let modal  = document.getElementById("modalChoice").getAttribute();
      this.displayStyle = "block";
    }




    // this.loginData={
    //   username:this.loginForm.value.username,
    //   password:this.loginForm.value.password,
    // }

    //     this.api
    //       .post('/authenticate',this.loginData )
    //       .subscribe({
    //         next: (response) => 
    //         {

    //           console.log("response",response)
    //           // if (response.message[0]["WELCOME"]) {
    //           //   this.router.navigate(['hdashboard']);
    //           // }
    //           // else(response[0]);{
    //           // }
    //         },

    //         error: (error) => console.log("error123",error),
    //       });

    //       this.router.navigate(['hdashboard'])


  }


  closepopup() {
    this.displayStyle = "none";
  }

}

