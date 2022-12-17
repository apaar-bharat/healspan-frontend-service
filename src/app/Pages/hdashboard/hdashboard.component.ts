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
  statusss:any
  constructor(private router: Router,private apiservice:ApiService,private dataservice : DataService) { }

  ngOnInit(): void {
    this.apiservice.getService("assets/data/claims2.json").subscribe((data:any) =>{
      this.statusDetail = data["stageWiseClaimCount"];
      this.aprrovalDataList = data["claimDtoList"];
      this.statusss = [];
      this.pendingDataList = data["claimDtoList"]
    })

    // this.dataservice.currentclaimdetails_data.subscribe((res:any) =>
    //    console.log("currentclaimdetails_data" ,res)
    //  );
  }

  Idrouting(){
    this.router.navigate(['createclaim']);
  }

  GotoClaim(stage:any,claimID:number){
      let url = 'createclaim/'+stage;
      this.apiservice.getService("assets/data/claimdetail2.json").subscribe((data: any) => {
        this.dataservice.updateclaimdetails_data(data);
      })
      this.router.navigate([url]);
  }

}
