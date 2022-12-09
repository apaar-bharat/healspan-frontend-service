import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-viewclaim',
  templateUrl: './viewclaim.component.html',
  styleUrls: ['./viewclaim.component.css']
})
export class ViewclaimComponent implements OnInit {

  constructor(private api:ApiService) { }
  claimdetailData:any;patientinfo:any;medicalData:any;InsuaranceData:any;InitialData:any;EnhancmentData:any;DischargeData:any;
  finalClaim:any;
  ngOnInit(): void {

    this.api.getService("assets/data/claimdetail.json").subscribe((data:any) =>{
 
      this.claimdetailData = data;
     this.patientinfo=data["PatientInfo"]
     this.medicalData=data["MedicalInfo"]
     this.InsuaranceData=data["InsuranceInfo"]
     this.InitialData=data["InitialAuthInfo"]
     this.EnhancmentData=data["Enhancement"]
     this.DischargeData=data["Discharge"]
     this.finalClaim=data["FinalClaim"]
    })

  }

  docopen(){
    window.open('https://www.africau.edu/images/default/sample.pdf')
  }

}
