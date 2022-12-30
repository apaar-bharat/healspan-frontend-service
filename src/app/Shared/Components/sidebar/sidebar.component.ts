import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonserviceService } from 'src/app/service/commonservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  activeurl:string ="";
  constructor(private commonservice:CommonserviceService,private router:Router) { }

  ngOnInit(): void {
  }

 
  redirect(){
    let activeDashboard =  localStorage.getItem("usertype");
    if(activeDashboard== '2'){
      this.activeurl ='/hdashboard';
      //this.router.navigate(['hdashboard'])

    }else{
      this.activeurl ='/rdashboard';
      //this.router.navigate(['rdashboard'])
    }
  }
}
