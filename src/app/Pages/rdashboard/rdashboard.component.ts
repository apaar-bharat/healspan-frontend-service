import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-rdashboard',
  templateUrl: './rdashboard.component.html',
  styleUrls: ['./rdashboard.component.css']
})
export class RdashboardComponent implements OnInit {
  spaData:any = [];
  healspandata:any;
  hospitalData:any;
  ClosedData:any;
  constructor(private apiservice:ApiService,private router: Router,private dataservice : DataService) { }

  ngOnInit(): void {
    // this.api.getService("assets/data/sla.json").subscribe((data:any) =>{
    //   // console.log("sdsd",data);
    //   this.spaData = data["statusdatalist"]
    //   this.healspandata = data["healspanlist"]
    //   this.hospitalData = data["hospitallist"]
    //   this.ClosedData = data["closeslist"]
    //   console.log("spa",this.spaData);
    // })
    let LoggedInId = localStorage.getItem("LoggedInId");
    this.apiservice.getService("healspan/claim/reviewer-claims/"+LoggedInId).subscribe((data:any) =>{
      this.spaData = data["slaClaimsCount"]
      this.healspandata = data["reviewerClaimsDataList"];
      //alert(this.spaData.green)
      //this.aprrovalDataList = data["loggedInUserClaimData"].filter((x:any)=>x.status == "Approved");
      //this.pendingDataList = data["loggedInUserClaimData"].filter((x:any)=>x.status != "Approved"); 
    },(err: HttpErrorResponse) => {
      console.log("HttpErrorResponse" + err.status);
      alert("Something Went Wrong -" + err.status)       
    })

  
  }

  GotoClaim(claimID:number){
    //let url = 'viewclaim;
    this.apiservice.getService("healspan/claim/retrieveclaim/"+claimID).subscribe((data: any) => {
      this.dataservice.updateclaimdetails_data(data);
      this.router.navigate(['viewclaim']);
    },(err: HttpErrorResponse) => {
      console.log("HttpErrorResponse" + err.status);
      alert("Something Went Wrong -" + err.status)       
    });
}


}
