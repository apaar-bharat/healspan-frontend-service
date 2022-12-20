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
  RPADetail: any;
  TPADetail: any
  allmasterData: any;
  statuss: any;
  insuarancecom:any;
  relation:any;
  tpam:any;
  ngOnInit(): void {

    this.api.get("assets/data/viewclaim2.json").subscribe((data: any) => {

      this.claimdetailData = data;
      console.log("213546", data.claimDetailsForStageList[0].patientInformationList)
      this.patientinfo = data.claimDetailsForStageList[0].patientInformationList[0];
      this.medicalData = data.claimDetailsForStageList[0].patientMedicalInfoList[0];
      this.InsuaranceData = data.claimDetailsForStageList[0].patientInsuranceInfoList[0];


      console.log("rr", this.claimdetailData)
    })

    this.api.get("assets/data/Masters.json").subscribe((data: any) => {
      this.allmasterData = data;
     

      console.log("master", this.allmasterData.status_master);
      console.log("claimData", this.claimdetailData.claimDetailsForStageList[0].statusId);
      const StatusCt = this.allmasterData.status_master.filter((x: any) => x.id == Number(this.claimdetailData.claimDetailsForStageList[0].statusId))
      this.statuss = StatusCt[0].name
      console.log("213546", StatusCt[0].name)

      const insuarancecoms = this.allmasterData.insurance_company_master.filter((x: any) => x.id == Number(this.claimdetailData.claimDetailsForStageList[0].patientInsuranceInfoList[0].insuranceCompanyId))
      console.log("hello", insuarancecoms)
      this.insuarancecom = insuarancecoms[0].name
     
      const rpa = this.allmasterData.relationship_master.filter((x: any) => x.id == Number(this.claimdetailData.claimDetailsForStageList[0].patientInsuranceInfoList[0].relationshipId))
      console.log("hello", rpa)
      this.relation = rpa[0].relationshipName

      const tpa = this.allmasterData.tpa_master.filter((x: any) => x.id == Number(this.claimdetailData.claimDetailsForStageList[0].patientInsuranceInfoList[0].tpaId))
      console.log("hello", tpa)
      this.tpam = tpa[0].name
    }
    )
    this.api.get("assets/data/claimdetail.json").subscribe((data: any) => {
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
