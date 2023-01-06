import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError,Subject, timer } from 'rxjs';
import { Modal } from 'src/assets/js/bootstrap.bundle';
import { data } from 'jquery';
import { AuthenticationService } from '../service/authentication.service';
import { DataService } from '../service/data.service';
import { CommonserviceService } from '../service/commonservice.service';
import { environment } from 'src/environments/environment';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  destroy = new Subject();
  loginForm!: UntypedFormGroup;
  usermaster: any;
  displayStyle = "none";
  loginData: any;
  public showPassword: boolean | undefined;
  public showPasswordOnPress: boolean | undefined;
  rxjsTimer = timer(1000, 1000);
  timer: number | undefined;
  constructor(private router: Router, private fb: UntypedFormBuilder, private api: ApiService, 
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

  OnLogin() {
    console.log(this.loginForm)
    let body = {
      "username":this.loginForm.get('username')?.value,
      "password":this.loginForm.get('password')?.value
      }
    this.api.loginpostService(environment.baseUrl+"authentication/login",body).subscribe({
      next: this.handleUpdateResponse.bind(this),
      error: error => {
        //alert(error);
        //let errorMessage = this.api.getServerErrorMessage(error);
        //console.error('There was an error!',errorMessage);
        this.displayStyle = "block"; 
       }
     })
    }



  handleUpdateResponse(userdata:any){
    if(userdata)
    {
      localStorage.setItem('currentUser', "loggedin"); 
      localStorage.setItem("usertype",userdata.userRoleMstId);
      localStorage.setItem("LoggedInId",userdata.id);
      localStorage.setItem("jwttoken",userdata.jwt);
      localStorage.setItem("hospitalMstId",userdata.hospitalMstId);
      localStorage.setItem("userName",userdata.userName);
      
      this.dataservice.updatecurrentuser_data(userdata); 
      this.commonservice.redirecttoactivedashboard();
      
    //   this.rxjsTimer.pipe(takeUntil(this.destroy)).subscribe(val => {
    //     this.timer = val;
  
       
  
    //   if (this.timer >= 1200) {
    //     this.destroy.next(
    //       localStorage.setItem('currentUser', "loggedin")
    //     );
    //     this.destroy.complete();
    //     this.authservice.logout();
       
    //   this.router.navigate(['']); 
    //   }
    // })
    }

    else  {
        this.displayStyle = "block"; 
    }  
  }


  closepopup() {
    this.displayStyle = "none";
  }

  

}

