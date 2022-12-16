import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-viewclaim',
  templateUrl: './viewclaim.component.html',
  styleUrls: ['./viewclaim.component.css']
})
export class ViewclaimComponent implements OnInit {

  constructor(private api: ApiService) { }
  claimdetailData: any; patientinfo: any; medicalData: any; InsuaranceData: any; InitialData: any; EnhancmentData: any; DischargeData: any;
  finalClaim: any;
  statusmaster: any;
  insuaranceCompanyDetail: any;
  RPADetail:any;
  TPADetail:any
  allmasterData:any;
  ngOnInit(): void {

    this.api.getService("assets/data/claimdetail2.json").subscribe((data: any) => {

      this.claimdetailData = data;
      console.log("213546", data.claimDetailsForStageList[0].patientInformationList)
      this.patientinfo = data.claimDetailsForStageList[0].patientInformationList[0];
      this.medicalData = data.claimDetailsForStageList[0].patientMedicalInfoList[0];
      this.InsuaranceData = data.claimDetailsForStageList[0].patientInsuranceInfoList[0];


      console.log("rr", this.claimdetailData)
    })

    this.api.getService("assets/data/Masters.json").subscribe((data: any) => {
      this.allmasterData=data;
      this.statusmaster = data["status_master"];
      this.insuaranceCompanyDetail = data["insurance_company_master"];

      console.log("master", this.allmasterData.status_master);
      console.log("claimData", this.claimdetailData.claimDetailsForStageList[0].statusId );
      const StatusCt=this.allmasterData.status_master.filter((x:any)=>x.id==Number(this.claimdetailData.claimDetailsForStageList[0].statusId))
      console.log("213546",StatusCt)
    }
    )
    this.api.getService("assets/data/claimdetail.json").subscribe((data: any) => {
      this.InitialData = data["InitialAuthInfo"]
      this.EnhancmentData = data["Enhancement"]
      this.DischargeData = data["Discharge"]
      this.finalClaim = data["FinalClaim"]
      this.RPADetail = data["relationship_master"]
      this.TPADetail = data["tpa_master"];
    })
    //  this.InitialData=data["InitialAuthInfo"]
    //  this.EnhancmentData=data["Enhancement"]
    //  this.DischargeData=data["Discharge"]
    //  this.finalClaim=data["FinalClaim"]

  }

  docopen() {
    window.open('https://www.africau.edu/images/default/sample.pdf')
  }

}
