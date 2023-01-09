import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { HttpHeaders, HttpClient, HttpParams, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from "rxjs/operators"
import { Subject, throwError } from 'rxjs';
import { ActivatedRoute, Route } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { formatDate } from '@angular/common';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalpopupService } from 'src/app/Providers/modalpopup.service';
import { OthercostComponent } from './othercost/othercost.component';
import { MatDialogRef } from '@angular/material/dialog';
import { claimService } from './claimservice';

declare function verificationForm(): any;
//declare function phoneNoselect():any;
declare function nice_Select(): any;
@Component({
  selector: 'app-creatclaim',
  templateUrl: './creatclaim.component.html',
  styleUrls: ['./creatclaim.component.css']
})
export class CreatclaimComponent implements OnInit {


  IsTypeOfAccident: boolean = false; IspassengerType: boolean = false; IsTypeOfVehicle: boolean = false;
  admissiondata: any; mobilenumber!: number;

  ClaimForm!: UntypedFormGroup; submitted = false; submitted2 = false; submitted3 = false; isEditable = false; ailmentList: any
  InsuaranceForm!: UntypedFormGroup;
  medicalForm!: UntypedFormGroup;
  DocumentsForm!: UntypedFormGroup;
  userId: number = 0;
  title: string = "";
  body: string = "";
  claimformData: Array<any> = [];
  isLinear = false;
  barWidth: string = "0%";
  restest: any;
  selectedFiles!: FileList;
  message = '';
  currentFile!: File;
  maxDate = new Date();

  date: any;
  minDateToFinish = new Subject<string>();
  minDate: any;

  dateSent: any;
  dateReceived: any;
  todaysdate: any;
  show: boolean = false;
  show2: boolean = false;
  doclist: any = []; doclist1: any;
  procedureDetail: any;
  GenderDetail: any;
  OtherCosts: any = [];
  roomsDetail: any;

  showAge: any

  file_data: any = ''; percentDone: any;
  filestatus: any; currentupload: any;
  ActiveStage: any;
  progress: any = 0;
  insuaranceCompanyDetail: any;
  RPADetail: any;
  TPADetail: any;
  specialityDetail: any;
  hospitalDetail: any;
  chronicillnessDetail: any;
  DiagnosisDetail: any; tpaDiagnosisDetail: any; tpaprocedureDetail: any
  claimStageMaster: any = [];
  treatmentTypeDetails: any = [];
  masterData: any = [];

  patientSave: any = {};
  medicalSave: any = {};
  InsuaranceSave: any = {};
  // othercostarray: Array<number> = [];
  // othercostheader: any;
  claimdata: any = [];
  currentuserdata: any;
  IsGroups: boolean = false

  //------Response Field-------------------
  patientInfoResponse: any; medicalInfoResponse: any; insuranceInfoResponse: any; ruleInfoResponse: any;
  questioncostheader: any = []; Questions: any = []; answerparam: any = "";
  claimInfoID: any = null; claimStageId: any = null;
  diagnosis: any = ""; treatmentType: any = ""; procedure: any = ""; duration: any = ""; gender: any = ""
  DocumentIds: any = []; blob: any;
  isChecked: boolean = false; IsSaveSequentialQue: boolean = false;
  dialogRef!: MatDialogRef<any>;
  Othercostlist: any = [];
  LoggedInId: any;
  IsHospitaluser: boolean = true;
  othercostarray: any; Otherclist: any = [];
  visible: boolean = false;

  //
  patientMedicalInfoList: any = []; medicalAndChronicIllnessLink: any = [];
  mindate: any;


  //New VARIBALES
  claimStageLinkId: any = null; patientInfoId: any = null; medicalInfoId: any = null; insuranceInfoId: any = null;
  docbutton: boolean = false;

  //Stage wise Mandatory Documents;
  initialDoc: any = []; enhanceDoc: any = []; dischargeDoc: any = []; finalDoc: any = [];
  patientAndOtherCostLink: any = [];
  alredyUploaddoc: any = []; selectedObjectsFromArray: any = [];
  IfmedicalForm:boolean =false;
  constructor(private fb: UntypedFormBuilder, private api: ApiService, private http: HttpClient,
    private httpClient: HttpClient, private route: ActivatedRoute, private spinnerservice: NgxSpinnerService,
    private dataservice: DataService, private commonservice: CommonserviceService,
    private modalPopupService: ModalpopupService, private claimService: claimService) {

    this.minDateToFinish.subscribe((r: any) => {
      this.minDate = new Date(r);
    })

  }

  ngOnInit(): void {
    this.spinnerservice.show();
    let stagename = this.route.snapshot.params['stagename'];
    this.ActiveStage = stagename;
    this.LoggedInId = localStorage.getItem("LoggedInId");
    nice_Select();
    verificationForm();
    this.DefineFormControls();
    this.todaysdate = new Date();
    //new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2) + "  " + (new Date().getHours()) + ":" + (new Date().getMinutes());
    console.log(this.todaysdate)
    this.bindDropdown();
    this.date = new Date().toISOString().slice(0, 10);

    this.dataservice.currentuser_data.subscribe((res) => {
      console.log("currentuserdata" + res);
      this.currentuserdata = res;
      let hospitalMstId = localStorage.getItem("hospitalMstId");
      if (hospitalMstId != "null") {
        this.ClaimForm.controls['Hospital'].setValue(localStorage.getItem("hospitalMstId"));
        this.IsHospitaluser = true;
        //this.ClaimForm.controls['Hospital'].disable();

      } else {
        this.IsHospitaluser = false;

        //this.ClaimForm.controls['Hospital'].enable();

      }
    })

    this.dataservice.currentclaimdetails_data.subscribe((res: any) => {
      this.claimdata = res;
      console.log("hh", this.claimdata)
      if (this.claimdata.length != 0) {
        this.AssignFormControlValues(this.claimdata)
      }
    });

    this.SetExtraFormValidation();
    this.spinnerservice.hide();
  }


  redirect() {
    this.commonservice.redirecttoactivedashboard();
  }

  DefineFormControls() {
    this.ClaimForm = this.fb.group({

      Fname: ['', Validators.required],
      Mname: [''],
      Lname: ['', Validators.required],
      MobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      PHUHID: ['', Validators.required],
      Gender: ['', Validators.required],
      DOB: ['', Validators.required],
      Age: ['', Validators.required],
      Stage: [this.ActiveStage,],
      patientprimaryInsured: [true],
      Hospital: ['', Validators.required],
      DateOfAdmission: ['', Validators.required],
      DateOfDischarge: ['', Validators.required],
      RoomCategory: ['', Validators.required],
      CostPD: ['', Validators.required],
      totalRC: ['',],
      OtherC: ['',],
      OtherCE: ['',],
      // Procedure: ['',],
      InitialCE: ['', Validators.required],

      //enhance stage
      Enhancementestimate: ['',],

      //discharge stage
      FinalbillAmount: ['',],
      ClaimedAmount: ['',],

      //claimsubmission
      BillNumber: ['',],
      //new added
      tpaID:['',Validators.required]
    })

    this.medicalForm = this.fb.group({
      Procedures: ["", Validators.required],
      TreatmentType: ["", Validators.required],
      Provisionaldiagnosis: ["", Validators.required],
      Speciality: ["", Validators.required],
      Dateoffirstdiagnosis: ["", Validators.required],
      Pasthistoryofchronicillness: ["", Validators.required],
      Nameofthetreatingdoctor: ["", Validators.required],
      DrResgistrationnumber: ["", Validators.required],
      Qualificationofthetreatingdoctor: ["", Validators.required],
      Ages: ["",],
      Genders: ["",],
      Duration: ["",],
      Claim: ["",],
      TypeOfAccident: ["",],
      passengerType: ["",],
      TypeOfVehicle: ["",],

    })

    this.InsuaranceForm = this.fb.group({
      InsuranceCompany: ['', Validators.required],
      TPAID: ['', Validators.required],
      TPAnumber: ['', Validators.required],
      PolicyHolder: ['', Validators.required],
      RelationOPH: ['', Validators.required],
      PolicyNumber: [''],
      IsGroupPolicy: [''],
      Groupcompany: [''],
    })

    this.DocumentsForm = this.fb.group({
      file1: [''],
      file2: [''],
      file3: [''],
      file4: [''],
      file5: [''],
    })

  }

  AssignFormControlValues(data: any) {
   
    

    this.doclist = [];
    this.claimStageLinkId = data.id;
    this.claimInfoID = data.claimInfo.id;
    this.claimStageId = data.claimStageMst.id;

    localStorage.setItem("claimStageId", this.claimStageId)


    let patientInformationList = data.patientInfo;
    if (patientInformationList != null) {
      this.patientInfoId = data.patientInfo.id;
    }

    this.patientMedicalInfoList = data.medicalInfo;
    if (this.patientMedicalInfoList != null) {
      this.medicalInfoId = data.medicalInfo.id;
    }

    let patientInsuranceInfoList = data.insuranceInfo;
    if (patientInsuranceInfoList != null) {
      this.insuranceInfoId = data.insuranceInfo.id;
    }

    //alert(JSON.stringify(claimDetailsForStageList));

    let dateBirth = patientInformationList.dateBirth;
    let AdmissionDate = patientInformationList.dateOfAdmission;
    let dischargeDate = patientInformationList.dateOfDischarge;


    if (patientInformationList != null) {
      this.ClaimForm.controls["Fname"].setValue(patientInformationList.firstName);
      this.ClaimForm.controls["Mname"].setValue(patientInformationList.middleName);
      this.ClaimForm.controls["Lname"].setValue(patientInformationList.lastname);
      this.ClaimForm.controls["RoomCategory"].setValue(patientInformationList.roomCategoryId);
      this.ClaimForm.controls["MobileNo"].setValue(patientInformationList.mobileNo);
      this.ClaimForm.controls["PHUHID"].setValue(patientInformationList.hospitalUhid);
      this.ClaimForm.controls["Gender"].setValue(patientInformationList.genderId);
      this.gender = patientInformationList["genderMst"].name;
      //this.ClaimForm.controls["Age"].setValue(patientInformationList.age);
      this.showAge = patientInformationList.age;
      this.medicalForm.controls["Ages"].setValue(this.showAge);
      if (dateBirth != null) {
        this.ClaimForm.get("DOB")?.setValue(formatDate(dateBirth, 'yyyy-MM-dd', 'en'));
      }

      if (AdmissionDate != null) {
        //this.ClaimForm.get("DateOfAdmission")?.setValue(formatDate(AdmissionDate,'yyyy-MM-dd','en'));
        this.ClaimForm.get("DateOfAdmission")?.setValue(AdmissionDate);
      }
      this.dateSent = AdmissionDate;
      // formatDate(AdmissionDate,'yyyy-MM-dd','en'

      if (dischargeDate != null) {
        //this.ClaimForm.get("DateOfDischarge")?.setValue(formatDate(dischargeDate,'yyyy-MM-dd','en'));
        this.ClaimForm.get("DateOfDischarge")?.setValue(dischargeDate);
      }

      this.ClaimForm.controls["CostPD"].setValue(patientInformationList.costPerDay);
      this.ClaimForm.controls["InitialCE"].setValue(patientInformationList.initialCostEstimate);

      this.ClaimForm.controls["Enhancementestimate"].setValue(patientInformationList.enhancementEstimate);
      this.ClaimForm.controls["BillNumber"].setValue(patientInformationList.billNumber);
      this.ClaimForm.controls["FinalbillAmount"].setValue(patientInformationList.finalBillAmount);
      this.ClaimForm.controls["ClaimedAmount"].setValue(patientInformationList.claimedAmount);



      this.ClaimForm.controls["patientprimaryInsured"].setValue(patientInformationList.primaryInsured);
      // this.ClaimForm.controls["Procedure"].setValue(patientInformationList.procedureId);
  

      this.ClaimForm.controls["totalRC"].setValue(patientInformationList.totalRoomCost);

      if (patientInformationList.patientAndOtherCostLink.length > 0) {
        //this.ClaimForm.controls["OtherC"].setValue(patientInformationList.otherCostId);
        this.OtherCosts = patientInformationList.patientAndOtherCostLink;
        this.patientAndOtherCostLink = patientInformationList.patientAndOtherCostLink;
        //sessionStorage.setItem("patientAndOtherCostLink",patientInformationList.patientAndOtherCostLink)
      }

      this.ClaimForm.controls["OtherCE"].setValue(patientInformationList.otherCostsEstimate);

      this.ClaimForm.controls["Hospital"].setValue(patientInformationList.hospitalId);
      this.ClaimForm.controls["PHUHID"].setValue(patientInformationList.hospitalUhid);
      this.ClaimForm.controls["tpaID"].setValue(patientInformationList.tpaId);
      this.InsuaranceForm.controls["TPAID"].setValue(patientInformationList.tpaId),



      this.medicalForm.controls["Genders"].setValue(patientInformationList.genderId);
     

      this.calculateDiffHours();
      this.InitialCeCalculate();

    }

   

    if (patientInsuranceInfoList != null) {
      this.InsuaranceForm.controls["TPAnumber"].setValue(patientInsuranceInfoList.tpaNumber),
        this.InsuaranceForm.controls["PolicyHolder"].setValue(patientInsuranceInfoList.policyHolderName),
        this.InsuaranceForm.controls["PolicyNumber"].setValue(patientInsuranceInfoList.policyNumber),
        this.InsuaranceForm.controls["Groupcompany"].setValue(patientInsuranceInfoList.groupCompany),
      
        this.InsuaranceForm.controls["InsuranceCompany"].setValue(patientInsuranceInfoList.insuranceCompanyMst.id),
        this.InsuaranceForm.controls["RelationOPH"].setValue(patientInsuranceInfoList.relationshipId),
        this.InsuaranceForm.controls["IsGroupPolicy"].setValue(patientInsuranceInfoList.isGroupPolicy)
      if (patientInsuranceInfoList.isGroupPolicy == true) {
        this.IsGroups = true;
        this.InsuaranceForm.controls["Groupcompany"].setValidators([Validators.required]);
      } else {
        this.IsGroups = false;
        this.InsuaranceForm.controls["Groupcompany"].removeValidators([]);
      }
    }
    if (this.patientMedicalInfoList != null) {
      this.medicalForm.controls["Nameofthetreatingdoctor"].setValue(this.patientMedicalInfoList.doctorName);
      this.medicalForm.controls["DrResgistrationnumber"].setValue(this.patientMedicalInfoList.doctorRegistrationNumber);
      this.medicalForm.controls["Qualificationofthetreatingdoctor"].setValue(this.patientMedicalInfoList.doctorQualification);

      //this.diagnosis = this.patientMedicalInfoList["diagnosisMst"].name;

      this.medicalForm.controls["Speciality"].setValue(this.patientMedicalInfoList.specialityId);

      //code for chronic illness setvalue

      //this.procedure = this.patientMedicalInfoList["procedureMst"].name;

      let diseases: any = []; let diseaseinfo: any;
      diseases.push(this.chronicillnessDetail);
      for (const element of data.medicalInfo.medicalAndChronicIllnessLink) {
        diseaseinfo = element.chronicIllnessMst;
        this.selectedObjectsFromArray.push(diseaseinfo.name)
        //const toSelect = diseases[0].find((c:any) => c.id == 1);
        //this.medicalForm.controls["Pasthistoryofchronicillness"].setValue(diseaseinfo.name);
      }



      //this.medicalForm.controls["Pasthistoryofchronicillness"].setValue(this.patientMedicalInfoList.pastChronicIllness);

      this.medicalForm.controls["TreatmentType"].setValue(this.patientMedicalInfoList.treatmentTypeId);
      this.treatmentType = this.patientMedicalInfoList["treatmentTypeMst"].name;

      let uploaddoc :any = [];
      this.alredyUploaddoc = [];
      uploaddoc = this.patientMedicalInfoList["documentList"];

      uploaddoc.forEach((element:any)=>{
        if(element.documentPath != null){
          this.alredyUploaddoc.push(element.documentType)}
      })



      if (this.claimStageLinkId != null) {

      let uploaddoc :any = [];
      this.alredyUploaddoc = [];
      uploaddoc = this.patientMedicalInfoList["documentList"];

      uploaddoc.forEach((element:any)=>{
        if(element.documentPath != null){
          this.alredyUploaddoc.push(element.documentType)}
      })


      //alert(JSON.stringify(this.alredyUploaddoc))
  
      //set ruleengine diagnosisi & procedure

     
        this.medicalForm.controls["Provisionaldiagnosis"].setValue(this.patientMedicalInfoList.diagnosisId);


        // let data1  = this.procedureDetail.filter((a:any)=>a["tpaMst"].id== patientInformationList.tpaId)
        // this.tpaprocedureDetail = data1;
        this.medicalForm.controls["Procedures"].setValue(this.patientMedicalInfoList.procedureId);


     

      }

      let dateofirstdiagDate = this.patientMedicalInfoList.dateOfFirstDiagnosis;

      if (dateofirstdiagDate != null) {
        this.medicalForm.get("Dateoffirstdiagnosis")?.setValue(formatDate(dateofirstdiagDate, 'yyyy-MM-dd', 'en'));
      }


    }
    this.IfmedicalForm = false;
  }

  get f() { return this.ClaimForm.controls; }
  get M() { return this.medicalForm.controls; }
  get I() { return this.InsuaranceForm.controls; }



  SetExtraFormValidation() {
    if (this.ActiveStage == 'Final Claim' || this.ActiveStage == 'Discharge') {
      this.ClaimForm.controls["FinalbillAmount"].addValidators(Validators.required);
      this.ClaimForm.controls["ClaimedAmount"].addValidators(Validators.required);
    }
  }



  openDialog() {

    if (this.claimInfoID == null) {
      this.OtherCosts.forEach((element: any) => {
        if (this.Otherclist.length != this.OtherCosts.length) {
          this.Otherclist.push({ id: element.id, name: element.name, value: 0 });
        }
      });

    } else {
      this.patientAndOtherCostLink.forEach((element: any) => {
        if (this.Otherclist.length != this.OtherCosts.length) {
          this.Otherclist.push({ id: element.otherCostsMst.id, name: element.otherCostsMst.name, value: element.amount });

        }
      });

      this.OtherCosts.forEach((element: any) => {

        const data = this.Otherclist.find((x: any) => x.id === element.id)
        console.log("rt",data)
        if (!data) {
          this.Otherclist.push({ id: element.id, name: element.name, value: 0 });

        }
     
      });

    }

    this.dialogRef = this.modalPopupService.openPopup<OthercostComponent>(OthercostComponent, { data: this.Otherclist });
    this.dialogRef.afterClosed().subscribe(result => {
      this.Othercostlist = [];
      let data = [];
      let sum: number = 0;
      this.dataservice.currentothercost_data.subscribe((res: any) => {
        data = res;
        data.forEach((element: any) => {
          this.Othercostlist.push({ id: element.id, amount: parseInt(element.value) });
          if(element.value=='' || element.value==null){
            element.value=0;
          }
          sum = sum + parseInt(element.value)
          console.log("trt",element.value)
        });
      });

      
      this.ClaimForm.controls['OtherCE'].setValue(sum)
      let totalroomcost = this.ClaimForm.get("totalRC")?.value;
      let totalothercoste = this.ClaimForm.get("OtherCE")?.value;
  
      let total = Number(totalroomcost + totalothercoste)
      this.ClaimForm.controls["InitialCE"].setValue(total)
      this.InitialCeCalculate();

    });
  }


  changeDate() {
    this.dateSent = new Date(this.dateSent).getFullYear() + '-' + ('0' + new Date(this.dateSent).getMonth()).slice(-2) + '-' + ('0' + new Date(this.dateSent).getDate()).slice(-2);
    this.dateReceived = this.dateSent;

    this.minDate = this.ClaimForm.value.DateOfAdmission

  }

  OngrouppolicykCheck(event: any) {

    if (event.target.checked == true) {
      this.IsGroups = true;
      this.InsuaranceForm.controls["Groupcompany"].setValidators([Validators.required]);
    } else {
      this.IsGroups = false;
      this.InsuaranceForm.controls["Groupcompany"].removeValidators([]);
    }
    console.log(event.target.checked)

  }

  OnPatientSubmit(formData: any) {
    console.log("", formData)
    this.submitted = true;

    if (this.ClaimForm.valid) {
      let otherCostDetail: any = [];
      this.Othercostlist.forEach((res: any) => {
        if (res.amount != 0) {
          otherCostDetail.push({ id: res.id, amount: res.amount });
        }
      })

      //Call to savePatientInfo service
      this.claimService.savePatientInfo(this.claimStageId, this.claimInfoID, this.claimStageLinkId, this.patientInfoId, this.ClaimForm, otherCostDetail)
        .subscribe({
          next: (res) => {
            console.log("patientSave response", res);
            if (res.responseStatus == "SUCCESS") {
              this.patientInfoResponse = res;
              this.claimInfoID = this.patientInfoResponse.claimInfoId;
              this.patientInfoId = this.patientInfoResponse.patientInfoId;
              this.claimStageLinkId = this.patientInfoResponse.claimStageLinkId;
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log("HttpErrorResponse" + err.status);
            alert("Something Went Wrong!")
          }
        })

    }
  }

  onMedformSubmit(formData: any) {
    console.log("dfhbd", formData)
    this.submitted2 = true;

    if (this.medicalForm.valid) {
      if (this.claimInfoID != null) {
        this.claimInfoID = this.patientInfoResponse.claimInfoId;
      }

      this.claimService.saveMedicalInfo(this.claimStageId, this.claimStageLinkId, this.medicalInfoId, this.medicalForm, this.medicalAndChronicIllnessLink)
        .subscribe({
          next: (res) => {
            console.log("saveMedicalInfo response", res);
            if (res.responseStatus == "SUCCESS") {
              this.medicalInfoResponse = res;
              this.medicalInfoId = this.medicalInfoResponse.medicalInfoId;
              this.GetSequentialquestion();
              this.IsSaveSequentialQue = true;
              this.IfmedicalForm =true;
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log("HttpErrorResponse" + err.status);
            alert("Something Went Wrong!")
          }
        })
    }

  }

  SaveSequentialQue() {
    let questionlist: any = [];

    this.questioncostheader.forEach((element: any) => {
      questionlist.push({ "question": element.label, "answer": element.value })
    });

    //remove alredy existing documents
    
    this.alredyUploaddoc.forEach((element: any) => {
      this.doclist.forEach((item: any, index: any) => {
        if (item === element) this.doclist.splice(index, 1);
      });
    })

    this.claimService.saveSequentialQue(this.medicalInfoId, questionlist, this.doclist)
      .subscribe({
        next: (ruleres) => {
          console.log("saveSequentialQue response", ruleres);
          //if(ruleres.responseStatus == "SUCCESS"){
          this.ruleInfoResponse = ruleres;
          this.doclist = [];
          for (var obj in ruleres.documentId) {
            if (ruleres.documentId.hasOwnProperty(obj)) {
              //----loop--------------------


              //display alredy existing documents  with status
              const alredyUploadedStatus = this.alredyUploaddoc.find((x: any) => x === obj)
              if (alredyUploadedStatus) {
                let element = { "docid": ruleres.documentId[obj], "docname": obj, "docstatus": true }
                this.doclist.push(element);
              } else {
                let element = { "docid": ruleres.documentId[obj], "docname": obj, "docstatus": false }
                this.doclist.push(element);
              }


            }
          }
          //}
        },
        error: (err: HttpErrorResponse) => {
          console.log("HttpErrorResponse" + err.status);
          alert("Something Went Wrong!")
        }
      })
  }

  OnInsuarancecontinue(formData: any) {
    console.log("dwefw", formData)
    this.submitted3 = true;

    if (this.InsuaranceForm.valid) {
      if (this.claimInfoID != null) {
        this.claimInfoID = this.patientInfoResponse.claimInfoId;
      }


      this.claimService.saveInsuranceInfo(this.claimStageId, this.claimStageLinkId, this.insuranceInfoId, this.InsuaranceForm)
        .subscribe({
          next: (res) => {
            console.log("saveInsuranceInfo response", res);
            if (res.responseStatus == "SUCCESS") {

            }
          },
          error: (err: HttpErrorResponse) => {
            console.log("HttpErrorResponse" + err.status);
            alert("Something Went Wrong!")
          }
        })


    }
  }

  FinalSubmit(){
    this.docbutton = true;
    this.doclistvalidation();
    // if(this.docbutton  == true){
    // let param ={   
    //      "claimId":this.claimInfoID,
    //      "stageId": this.claimStageId,
    //      "statusId":3
    // }
    // this.api.post('healspan/claim/updateclaimstatus',param).subscribe((res) =>{
    //   console.log("updateclaimstatus response",res)
    // },(err: HttpErrorResponse) => {
    //     console.log("HttpErrorResponse" + err.status);
    //     //alert("Something Went Wrong -" + err.status)       
    //   })
    // }else{
    //   alert("Please Upload all documents")
    // }
  }



  //-----Start File Upload Logic ------------------------
  fileChange(event: any, i: any, docid: any) {
    this.docbutton = false
    this.spinnerservice.show();
    this.currentupload = docid;
    //alert('progress_' + docid);
    const fileList: FileList = event.target.files;
    //check whether file is selected or not
    if (fileList.length > 0) {

      const file = fileList[0];
      //get file information such as name, size and type
      console.log('finfo', file.name, file.size, file.type);
      //max file size is 4 mb
      if ((file.size / 1048576) <= 50) {
        // ----Cooment----------
        // let formData = new FormData();
        // formData.append('file', file, file.name);
        // formData.append('tz', new Date().toISOString())
        // this.file_data = formData
        // console.log(this.file_data);
        //this.uploadAndProgressSingle(id,file);
        // ----EndCooment----------

        let body = new FormData();
        body.append('file', file),
        body.append('inputDocId', docid),
        body.append('medicalInfoId', this.medicalInfoResponse.medicalInfoId),
        body.append('claimInfoId', this.claimInfoID),
    
        this.http.post(environment.baseUrl+'healspan/claim/upload',body).subscribe((res:any) =>{
          let input = document.getElementById('status_' + i) as HTMLInputElement | undefined;
          input!.innerText = file.name;
          this.spinnerservice.hide();
        },(err: HttpErrorResponse) => {
          console.log("HttpErrorResponse" + err.status);
        });


      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }

    }

    //this.docbutton = true


  }

  OnDownload(docid: any) {
    window.open(environment.baseUrl + 'healspan/claim/download/' + docid);
  }


  //-----------------Bind all dropdown
  bindDropdown() {
    this.api.getService('healspan/claim/admin/masters').subscribe((data: any) => {
      this.masterData = data;
      this.insuaranceCompanyDetail = data["insurance_company_mst"];
      this.roomsDetail = data["room_category_mst"];
      this.OtherCosts = data["other_costs_mst"];
      this.procedureDetail = data["procedure_mst"];

      this.specialityDetail = data["speciality_mst"];
      this.hospitalDetail = data["hospital_mst"];
      this.chronicillnessDetail = data["chronic_illness_mst"];
      this.DiagnosisDetail = data["diagnosis_mst"];


      this.RPADetail = data["relationship_mst"];
      this.GenderDetail = data["gender_mst"];
      this.claimStageMaster = data["claim_stage_mst"];
      this.treatmentTypeDetails = data["treatment_type_mst"];
      this.TPADetail = data["tpa_mst"];
      let claim = this.claimStageMaster.filter((x: any) => x.name == this.ActiveStage);
      this.claimStageId = claim[0].id;
      //alert(claim[0].id+claim[0].name)


      this.initialDoc = data["initial_stage"];
      this.enhanceDoc = data["enhancement_stage"];
      this.dischargeDoc = data["discharge_stage"];
      this.finalDoc = data["final_stage"];
      // 

    })
  }

  //---------Start Binding Values on basis of tpa
  tpaselect(event: any) {
    this.InsuaranceForm.controls['TPAID'].setValue(event.target.value)

    this.api.getService('healspan/claim/admin/masters').subscribe((data: any) => {
      this.procedureDetail = data["procedure_mst"];
      this.DiagnosisDetail = data["diagnosis_mst"];
    })


    let res  = this.DiagnosisDetail.filter((a:any)=>a["tpaMst"].id== event.target.value)
    this.DiagnosisDetail = res;
    console.log("this.DiagnosisDetail" + JSON.stringify(this.tpaDiagnosisDetail))

    // let Pdata: [] = this.procedureDetail;
    // this.tpaprocedureDetail = [];
    // Pdata.forEach((element: any) => {
    //   if (element["tpaMst"].id == event.target.value) {
    //     this.tpaprocedureDetail.push(element)
    //   }
    // });
    let res1  = this.procedureDetail.filter((a:any)=>a["tpaMst"].id== event.target.value)
    this.procedureDetail = res1;
    console.log("this.DiagnosisDetail" + JSON.stringify(this.tpaprocedureDetail))

  }





  OnGenderSelect(event: any) {
    this.gender = event.target.options[event.target.options.selectedIndex].text;
    this.medicalForm.controls['Genders'].setValue(event.target.value)
  }
  // -------------End Binding Values on selection to Next medical Form

  ageCalculator() {
    if (this.ClaimForm.value.DOB) {
      const convertAge = new Date(this.ClaimForm.value.DOB);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
    let age = this.ClaimForm.get("Age")?.value;
    this.medicalForm.controls['Ages'].setValue(this.showAge)
  }

  calculateDiff() {
    let DateOfAdmission = new Date(this.ClaimForm.get("DateOfAdmission")?.value);
    let DateOfDischarge = new Date(this.ClaimForm.get("DateOfDischarge")?.value);
    let costperday = this.ClaimForm.get("CostPD")?.value;

    let days = Math.ceil((DateOfDischarge.getTime() - DateOfAdmission.getTime()) / 1000 / 60 / 60 / 24);
    //let days = Math.floor((DateOfDischarge.getTime() - DateOfAdmission.getTime()) / (1000 * 3600 * 24));

    let totalcost: number = days * costperday;
    this.ClaimForm.controls["totalRC"].setValue(totalcost);    //alert(days);
    //return days;

//InitialCostEstimate Set Value
    let totalroomcost = this.ClaimForm.get("totalRC")?.value;
    let totalothercoste = this.ClaimForm.get("OtherCE")?.value;

    let total = Number(totalroomcost + totalothercoste)
    this.ClaimForm.controls["InitialCE"].setValue(total)
    this.InitialCeCalculate();



    let hours = Math.abs(DateOfDischarge.getTime() - DateOfAdmission.getTime()) / 3600000;

    let value1 = ">24 hours";
    let value2 = "<24 hours";
    let value3 = "> 7 days";

    if (hours > 24 && hours < 168) {
      this.medicalForm.controls["Duration"].setValue(value1);

    }
    else if (hours <= 24) {
      this.medicalForm.controls["Duration"].setValue(value2);
    }
    else if (hours >= 168) {
      this.medicalForm.controls["Duration"].setValue(value3);
    }
  }

  // Binding Values on selection to Next Form----end

  // --------------------------------------------------------------------------------------------------


  chronicillnessSelect(event: any) {
    this.medicalAndChronicIllnessLink = [];
    for (let i = 0; i < event.value.length; i++) {
      const dvar = this.chronicillnessDetail.filter((x: any) => x.name == event.value[i]);
      this.medicalAndChronicIllnessLink.push({
        "id": dvar[0].id,
      });

    }
    //alert(JSON.stringify(this.medicalAndChronicIllnessLink));
  }

  Ondiagnosis(event: any) {
    //this.diagnosis = event.target.options[event.target.options.selectedIndex].text;
    let res = this.DiagnosisDetail.filter((a:any) => a.id == event.target.value)
    this.diagnosis = res[0].ruleEngineName;
    //alert(res[0].ruleEngineName)
  }

  onprocedureSelect(event: any) {
    //this.procedure = event.target.options[event.target.options.selectedIndex].text;
    this.medicalForm.controls['Procedures'].setValue(event.target.value)

    let res = this.procedureDetail.filter((a:any) => a.id == event.target.value)
    this.procedure = res[0].ruleEngineName;
    //alert(res[0].ruleEngineName)
  }

  OntreatmentType(event: any) {
    this.treatmentType = event.target.options[event.target.options.selectedIndex].text;
  }

  OnGender(event: any) {
    this.gender = event.target.options[event.target.options.selectedIndex].text;
  }
  // ng multiselect Dropdown Start

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onItemDeSelect(item: any) {
    console.log(item);
  }

  GetSequentialquestion() {
    // let bodyparam ={
    //   "diagnosis": "Maternity",
    //   "claimStage":"Final",
    //   "treatmentType":"Medical management",
    //   "gender":"Female",
    //   "age":"",
    //   "procedure":"FTND",
    //   "duration":"> 7 days",
    //   "claimValue":""
    //   }
    let res = this.DiagnosisDetail.filter((a:any) => a.id == this.medicalForm.value.Provisionaldiagnosis)
    this.diagnosis = res[0].ruleEngineName;
    //alert(   this.diagnosis)  this.patientMedicalInfoList.diagnosisId;

    
    let res1 = this.procedureDetail.filter((a:any) => a.id == this.medicalForm.value.Procedures)
    this.procedure = res1[0].ruleEngineName;

    if (this.ActiveStage == "Initial Authorisation") {
      this.ActiveStage = "Initial"
    }
    let bodyparam = {
      "diagnosis": this.diagnosis,
      "claimStage": this.ActiveStage,
      "treatmentType": this.treatmentType,
      "gender": this.gender,
      "age": this.ClaimForm.get("Age")?.value,
      "procedure": this.procedure,
      "duration": this.medicalForm.get("Duration")?.value,
      "claimValue": this.medicalForm.get("Claim")?.value
    }
    this.GenerateRuleEngineModel(bodyparam)
  }

  GenerateRuleEngineModel(bodyparam: any) {

    this.api.postService(environment.ruleBaseUrl, bodyparam).subscribe(res => {
      console.log(res);
      let data: any = [];
      this.doclist = [];
      data.push(res)
      if (data[0].operation == "Question") {
        //console.log(this.countObectKeys(apiresponse));
        var object: any = {};
        if (data[0].question != null) {
          //----loop for answer---------------------
          //------Declare and split options ,push value to array---------------
          let options: any = [];
          var substring = data[0].options.split("|");
          //console.log(substring)

          substring.forEach((element: any) => {
            let optionsres = { "label": element, "value": element }
            options.push(optionsres);
          });
          object["rlabel"] = data[0].question;
          object["roptions"] = options;
          object["value"] = "",
            object["type"] = "select",

            // object["question"] = data[0].question;
            // object["answer"] = options
            this.Questions = [];
          this.Questions.push(object);


        }
        this.BuildRuleForm();

      } else {
        if (data[0].document != null) {
          var docsubstring = data[0].document.split("|");
          docsubstring.forEach((element: any) => {
            //let optionsres = {element}
            this.doclist.push(element);
          });
        }
        let mandatorydoc: any = [];
        // mandatorydoc.push([
        //   'Report supporting the diagnosis',
        //   'Etiology of ailment/Consultation papers',
        //   'Patient address proof (Pref. Aadhar)',
        //   'Insured PAN Card',
        //   'Claim Form (Part A)'

        // ]);

        if (this.ActiveStage == "Initial") {
          mandatorydoc = this.initialDoc
        } else if (this.ActiveStage == "Enhancement") {
          mandatorydoc = this.enhanceDoc
        } else if (this.ActiveStage == "Discharge") {
          mandatorydoc = this.dischargeDoc
        } else if (this.ActiveStage == "Final Claim") {
          mandatorydoc = this.finalDoc
        }

        mandatorydoc.forEach((element: any) => {
          //let val ={"docname" : element.name}
          this.doclist.push(element.name);
        });
      }
    })
  }

  BuildRuleForm() {
    //this.questioncostheader = [];
    this.questioncostheader.push({
      label: this.Questions[0].rlabel,
      value: "",
      type: "select",
      options: this.Questions[0].roptions,
    });
    console.log("questioncostheader", this.questioncostheader);
  }

  OnQuestionSelect(event: any, question: any) {
    //alert(event.target.value);

    let item = this.questioncostheader.find((x: any) => x.label == question);
    Object.assign(item, { 'value': event.target.value })

    if (this.answerparam == "") {
      this.answerparam = event.target.value;
    } else {
      this.answerparam = this.answerparam + '|' + event.target.value;
    }
    // let bodyparam ={
    //   "diagnosis": "Maternity",
    //   "treatmentType":"Medical/Surgical management",
    //   "procedure":"FTND/LSCS",
    //   "duration":">24 hours",
    //   "answer":this.answerparam
    // }

    let bodyparam = {
      "diagnosis": this.diagnosis,
      "claimStage": this.ActiveStage,
      "treatmentType": this.treatmentType,
      "gender": this.gender,
      "age": this.ClaimForm.get("Age")?.value,
      "procedure": this.procedure,
      "duration": this.medicalForm.get("Duration")?.value,
      "claimValue": this.medicalForm.get("Claim")?.value,
      "answer": this.answerparam
    }

    this.GenerateRuleEngineModel(bodyparam)
  }

  getreceiveothercost(event: any) {
    //alert(event.target.value)
  }


  calculateDiffHours() {
    let DateOfAdmission = new Date(this.ClaimForm.get("DateOfAdmission")?.value);
    let DateOfDischarge = new Date(this.ClaimForm.get("DateOfDischarge")?.value);

    let hours = Math.abs(DateOfDischarge.getTime() - DateOfAdmission.getTime()) / 3600000;

    let value1 = ">24 hours";
    let value2 = "<24 hours";
    let value3 = "> 7 days";

    if (hours > 24 && hours < 168) {
      this.medicalForm.controls["Duration"].setValue(value1);

    }
    else if (hours <= 24) {
      this.medicalForm.controls["Duration"].setValue(value2);
    }
    else if (hours >= 168) {
      this.medicalForm.controls["Duration"].setValue(value3);
    }

  }


  InitialCeCalculate() {

    let value1 = "< 1 lac"
    let value2 = "> 1 Lac"
    let value3 = "<= 1 Lac"
    let InitialCES = (this.ClaimForm.get("InitialCE")?.value);
    if (InitialCES < 100000) {
      this.medicalForm.controls["Claim"].setValue(value1);
    }
    else if (InitialCES > 100000) {
      this.medicalForm.controls["Claim"].setValue(value2);

    } else {
      this.medicalForm.controls["Claim"].setValue(value3);
    }
  }


  doclistvalidation() {
    if (this.claimInfoID != null) {
      this.claimInfoID = this.patientInfoResponse.claimInfoId;
      this.api.getService("healspan/claim/retrieveclaim/" + this.claimStageLinkId).subscribe({
        next: (data: any) => {
          console.log("hello", data["medicalInfo"].documentList)
          let docdata :any =[];
          docdata = data["medicalInfo"].documentList;
          docdata.forEach((element: any) => {
            if (element.documentPath == null) {
              this.docbutton = false;
             
            }
          })

          //Final Submit
          if(this.docbutton  == true){
            let param ={   
                 "claimId":this.claimInfoID,
                 "stageId": this.claimStageId,
                 "statusId":3
            }
            this.claimService.UpdateClaimStage(param)
            .subscribe({
              next: (res) => {
                console.log("UpdateClaimStage response", res);
                document.getElementById("btnsubmit")?.click();
              },
              error: (err: HttpErrorResponse) => {
                console.log("HttpErrorResponse" + err.status);
                //alert("Something Went Wrong!")
              }
            })
          }else{
            alert("Please Upload All documents")
          }
        },
        }
      )
    }
  
  }

  numericOnly(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  }

  validateNumber(event:any) {
    const keyCode = event.keyCode;
    const excludedKeys = [8, 37, 39, 46];
    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }
}



