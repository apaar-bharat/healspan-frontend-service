import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,private commonservice:CommonserviceService,
    private authservice:AuthenticationService,private dataservice:DataService) { }

  ngOnInit(): void {
  }


  redirect(){
    this.commonservice.redirecttoactivedashboard();
    // this.dataservice.currentuser_data.subscribe((res:any) =>{
    //   if(res[0].type=='huser'){
    //     this.router.navigate(['hdashboard'])
  
    //   }else{
    //     this.router.navigate(['rdashboard'])
    //   }
    // })
   
  }

  logout() {  
    this.authservice.logout();  
    this.router.navigate(['']);  
  } 
}
