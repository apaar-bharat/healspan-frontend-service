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
  statusss:any;
  currentuserdata:any;
  constructor(private router: Router,private apiservice:ApiService,private dataservice : DataService) { }

  ngOnInit(): void {

   this.dataservice.currentuser_data.subscribe((res) =>{
    console.log("currentuserdata" + res);
    this.currentuserdata = res
   })
   
  //healspan/claim/retrieveallclaimsofloggedinuser/"+ this.currentuserdata[0].id
  this.apiservice.getService("healspan/claim/retrieveallclaimsofloggedinuser/3").subscribe((data:any) =>{
    //this.statusDetail = data["stageWiseClaimCount"];
    this.aprrovalDataList = data;
    this.statusss = [];
    this.pendingDataList = data
  })

    // this.dataservice.currentclaimdetails_data.subscribe((res:any) =>
    //    console.log("currentclaimdetails_data" ,res)
    //  );
  }


  GotoClaim(stage:any,claimID:number){
      let url = 'createclaim/'+stage;
      this.apiservice.getService("healspan/claim/retrieveclaim/"+claimID).subscribe((data: any) => {
        this.dataservice.updateclaimdetails_data(data);
        this.router.navigate([url]);

      })
  }

}
