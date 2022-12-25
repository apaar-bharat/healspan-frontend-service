import { Component, OnInit } from '@angular/core';
import { CommonserviceService } from 'src/app/service/commonservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  activeurl:string ="";
  constructor(private commonservice:CommonserviceService) { }

  ngOnInit(): void {
  }

  redirect(){
    //this.commonservice.redirecttoactivedashboard();
    let activeDashboard=localStorage.getItem("usertype");
    if(activeDashboard=='huser'){
      this.activeurl ='/hdashboard';
      //this.router.navigate(['hdashboard'])

    }else{
      this.activeurl ='/rdashboard';
      //this.router.navigate(['rdashboard'])
    }
  }

}
