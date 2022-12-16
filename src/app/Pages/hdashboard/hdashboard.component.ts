import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-hdashboard',
  templateUrl: './hdashboard.component.html',
  styleUrls: ['./hdashboard.component.css']
})
export class HdashboardComponent implements OnInit {
  statusDetail: any;
  aprrovalDataList:any;
  pendingDataList:any;
  statusss:any
  constructor(private router: Router,private apiservice:ApiService) { }

  ngOnInit(): void {
    this.apiservice.getService("assets/data/claims2.json").subscribe((data:any) =>{
      // console.log("sdsd",data);
      this.statusDetail = data["stageWiseClaimCount"];
      this.aprrovalDataList = data["claimDtoList"];
      this.statusss = [];

    
      this.pendingDataList = data["claimDtoList"]
      console.log("ere",this.statusDetail);
    })

  }

  Idrouting(){
    this.router.navigate(['createclaim']);
  }
  
}
