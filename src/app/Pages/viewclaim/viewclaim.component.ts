import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-viewclaim',
  templateUrl: './viewclaim.component.html',
  styleUrls: ['./viewclaim.component.css']
})
export class ViewclaimComponent implements OnInit {



  constructor(private api: ApiService,private dataservice : DataService,private router:Router) { }
  claimdetailData: any; 
  claimInfo :any ;
  patientinfo: any; medicalInfo: any; insuranceInfo: any; 
  InitialDoc :any; EnhancmentDoc: any; DischargeDoc: any;FinalDoc: any;
  finalClaim: any;
  statusmaster: any;
  insuaranceCompanyDetail: any;
  RPADetail:any;
  TPADetail:any
  allmasterData:any;
  claimdata:any;
  IsEdit:boolean = false;
  claimStageId:any;
  claimStageLinkId:any;
  ngOnInit(): void {

    this.dataservice.currentclaimdetails_data.subscribe((res:any) =>{
      this.claimdata = res ;
      this.Assignclaimdata(this.claimdata);
       
    });
    //this.Getdata();

    //this.claimStageId = localStorage.getItem("claimStageId");
  }

  docopen(docid:any) {
    // window.open('https://www.africau.edu/images/default/sample.pdf');
    window.open(environment.baseUrl+'healspan/claim/download/'+docid);

  }

  Getdata(){
    this.api.getService("healspan/claim/retrieveclaim/"+145).subscribe((data: any) => {
      //this.dataservice.updateclaimdetails_data(data);
      //this.router.navigate(['viewclaim']);
      this.claimdata = data ;
      this.Assignclaimdata(this.claimdata);
    })
  }

  Assignclaimdata(data:any){
    console.log("hello",data)
    let activeusertype =  localStorage.getItem("usertype");
   
   

    this.claimdetailData = data[0];
    this.claimStageLinkId = data[0].id;
    this.claimInfo = data[0].claimInfo;
    this.patientinfo = data[0].patientInfo;
    console.log("hi",this.patientinfo)
    this.medicalInfo = data[0].medicalInfo;
    this.insuranceInfo = data[0].insuranceInfo;

    let claimStageMst = data[0].claimStageMst;
    this.claimStageId =   claimStageMst.claimStageMstId; 

    if(claimStageMst.claimStageMstName == "Initial Authorisation"){
      if(this.medicalInfo != null){
      this.InitialDoc = this.medicalInfo['documentList'];}
    }else if(claimStageMst.claimStageMstName == "Enhancement"){
      if(this.medicalInfo != null){
      this.EnhancmentDoc = this.medicalInfo['documentList'];}
    }
    else if(claimStageMst.claimStageMstName == "Discharge"){
      if(this.medicalInfo != null){
      this.DischargeDoc = this.medicalInfo['documentList'];}

    }
    else if(claimStageMst.claimStageMstName == "Final Claim"){
      if(this.medicalInfo != null){
      this.FinalDoc = this.medicalInfo['documentList'];}
    }
    

    if(activeusertype== '2'){
      this.IsEdit = true;
    }else{
      let LoggedInId = localStorage.getItem("LoggedInId");
      if(this.claimInfo.userId == LoggedInId){
        this.IsEdit = true;
      }
    }
  }

  GotoClaim(claimID:number){
    let stage = this.claimdetailData["claimStageMst"].claimStageMstName;
    let url = '/createclaim/'+stage;
    this.api.getService("healspan/claim/retrieveclaim/"+claimID).subscribe((data: any) => {
      this.dataservice.updateclaimdetails_data(data);
      this.router.navigate([url]);
    })
  } 

  approveClick(){
    let param = {
      "claimId":this.claimInfo.id,
      "stageId":this.claimdetailData["claimStageMst"].claimStageMstId
    }
    this.api.postService(environment.baseUrl+"healspan/claim/pushclaimdatatorpa",param).subscribe((data: any) => {
      if(data){
        alert("Claim Details Submission Status to RPA " + data);
      }
    })
  }

  GotoNextStage(claimstageId:any){
    let userId = localStorage.getItem("LoggedInId");
    let param ={   
      "claimStageLinkId": this.claimStageLinkId,
      "claimStageId":claimstageId,
      "statusId": 1,
      "userId": userId
    }
    // let param ={
    //   "claimStageLinkId": 65,
    //   "claimStageId": 2,
    //   "statusId": 1,
    //   "userId": 2
    // }
    this.api.post('healspan/claim/updatestage',param).subscribe((res) =>{
      console.log("updatestage response",res)
    },(err: HttpErrorResponse) => {
        console.log("HttpErrorResponse" + err.status);
      })
    }
}


