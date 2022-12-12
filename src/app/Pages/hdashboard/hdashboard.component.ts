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
  constructor(private router: Router,private apiservice:ApiService) { }

  ngOnInit(): void {
    this.apiservice.getService("assets/data/claim.json").subscribe((data:any) =>{
      // console.log("sdsd",data);
      this.statusDetail = data["statusdatalist"];
      this.aprrovalDataList = data["approvaldatalist"];
      this.pendingDataList = data["pendingdatalist"]
      console.log("ere",this.statusDetail);
    })

  }

  Idrouting(){
    this.router.navigate(['createclaim']);
  }
  
}
