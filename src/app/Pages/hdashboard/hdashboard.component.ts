import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-hdashboard',
  templateUrl: './hdashboard.component.html',
  styleUrls: ['./hdashboard.component.css']
})
export class HdashboardComponent implements OnInit {
  statusDetail: any;
  aprrovalDataList:any;
  pendingDataList:any;
  currentuserdata:any;
  LoggedInId:any;
  constructor(private router: Router,private apiservice:ApiService,private dataservice : DataService) { }

  ngOnInit(): void {

   this.dataservice.currentuser_data.subscribe((res) =>{
    console.log("currentuserdata" + res);
    this.currentuserdata = res
   })

  let LoggedInId = localStorage.getItem("LoggedInId");
   
  //healspan/claim/retrieveallclaimsofloggedinuser/"+ this.currentuserdata[0].id
  this.apiservice.getService("healspan/claim/retrieveallclaimsofloggedinuser/"+LoggedInId).subscribe((data:any) =>{
    this.statusDetail = data["claimStageCount"];
    this.aprrovalDataList = data["loggedInUserClaimData"].filter((x:any)=>x.status == "Approved");
    this.pendingDataList = data["loggedInUserClaimData"].filter((x:any)=>x.status != "Approved");

    
  })

    // this.dataservice.currentclaimdetails_data.subscribe((res:any) =>
    //    console.log("currentclaimdetails_data" ,res)
    //  );
  }


  GotoClaim(stage:any,claimID:number){
      let url = '/createclaim/'+stage;
      this.apiservice.getService("healspan/claim/retrieveclaim/"+claimID).subscribe((data: any) => {
        this.dataservice.updateclaimdetails_data(data);
        this.router.navigate([url]);
      })

      
  }

}
