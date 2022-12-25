import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { HttpHeaders, HttpClient, HttpParams, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
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
  DiagnosisDetail: any;
  claimStageMaster:any = [];
  treatmentTypeDetails:any =[];
  masterData :any=[];
 
  patientSave: any = {};
  medicalSave: any = {};
  InsuaranceSave: any = {};
  // othercostarray: Array<number> = [];
  // othercostheader: any;
  claimdata:any=[];
  currentuserdata:any;

  //------Response Field-------------------
  patientInfoResponse:any;medicalInfoResponse:any ; insuranceInfoResponse:any ;ruleInfoResponse:any;
  questioncostheader: any =[];Questions:any=[];answerparam:any="";
  claimInfoID:any = null;claimStageId :any = null;
  diagnosis:any="" ; treatmentType:any="";procedure:any="";duration:any="";gender:any =""
  DocumentIds:any=[];blob:any;
  isChecked:boolean= false;IsSaveSequentialQue:boolean=false;
  dialogRef!: MatDialogRef<any>;
  Othercostlist :any=[];
  LoggedInId:any;
  IsHospitaluser:boolean = true;
  othercostarray:any;Otherclist:any = [];

  constructor(private fb: UntypedFormBuilder, private api: ApiService, private http: HttpClient,
    private httpClient: HttpClient, private route: ActivatedRoute,private spinnerservice:NgxSpinnerService ,
    private dataservice : DataService,private commonservice:CommonserviceService,
    private modalPopupService: ModalpopupService) {

    this.minDateToFinish.subscribe((r: any) => {
      this.minDate = new Date(r);
    })

  }

  ngOnInit(): void {
    let stagename = this.route.snapshot.params['stagename'];
    this.ActiveStage = stagename;
    this.LoggedInId = localStorage.getItem("LoggedInId");
    nice_Select();
    verificationForm();
    this.DefineFormControls();
    this.todaysdate = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2) + "  " + (new Date().getHours()) + ":" + (new Date().getMinutes());
    console.log(this.todaysdate)  
    this.bindDropdown();
    this.date = new Date().toISOString().slice(0, 10);
    
    this.dataservice.currentuser_data.subscribe((res) =>{
      console.log("currentuserdata" + res);
      this.currentuserdata = res;
      if(localStorage.getItem("hospitalMstId") == null){
        
        this.IsHospitaluser = false;
      }
     else{
      this.ClaimForm.controls['Hospital'].setValue(localStorage.getItem("hospitalMstId"));
      this.IsHospitaluser = true;
    }
      
     })

    this.dataservice.currentclaimdetails_data.subscribe((res:any) =>{
        this.claimdata = res ;
        console.log("hh",this.claimdata)
        if(this.claimdata.length != 0){
          this.AssignFormControlValues(this.claimdata)
        }
         
    });
  }
  redirect(){
    this.commonservice.redirecttoactivedashboard();
  }
  
  DefineFormControls(){
    this.ClaimForm = this.fb.group({

      Fname: ['', Validators.required],
      Mname: [''],
      Lname: ['', Validators.required],
      MobileNo: ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      PHUHID: ['',Validators.required],
      Gender: ['', Validators.required],
      DOB: ['',Validators.required],
      Age: ['', Validators.required],
      Stage: [this.ActiveStage,],
      patientprimaryInsured: [true],
      Hospital: ['', Validators.required],
      DateOfAdmission: ['',Validators.required],
      DateOfDischarge: ['',Validators.required],
      RoomCategory: ['',Validators.required],
      CostPD: ['', Validators.required],
      totalRC: ['',],
      OtherC: ['',],
      OtherCE: ['',],
      Procedure: ['',],
      InitialCE: ['',],

      // TotalBillAmount: ['', Validators.required],
      // ClaimAmount: ['', Validators.required],
    })

    this.medicalForm = this.fb.group({
      Procedures: ["",Validators.required],
      TreatmentType: ["",Validators.required],
      Provisionaldiagnosis: ["",Validators.required],
      Speciality: ["",Validators.required],
      Dateoffirstdiagnosis: ["",Validators.required],
      Pasthistoryofchronicillness: ["",Validators.required],
      Nameofthetreatingdoctor: ["",Validators.required],
      DrResgistrationnumber: ["",Validators.required],
      Qualificationofthetreatingdoctor: ["",Validators.required],
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

  AssignFormControlValues(data:any){
    this.doclist =[];
    this.claimInfoID = data[0].claimInfo.id;
    this.claimStageId = data[0].claimStageMst.id;
    //alert(this.claimInfoID + '-'+ this.claimStageId);
    console.log("qq",data[0].patientInfo)
    let patientInformationList =data[0].patientInfo;
    let patientMedicalInfoList = data[0].medicalInfo;
    let patientInsuranceInfoList = data[0].insuranceInfo;

  
    //alert(JSON.stringify(claimDetailsForStageList));

    let dateBirth =patientInformationList.dateBirth;
    let AdmissionDate=patientInformationList.dateOfAdmission;
    let dischargeDate=patientInformationList.dateOfDischarge;
   

  if(patientInformationList != null){
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
    if(dateBirth !=null){
    this.ClaimForm.get("DOB")?.setValue(formatDate(dateBirth,'yyyy-MM-dd','en'));}

    if(AdmissionDate !=null){
    //this.ClaimForm.get("DateOfAdmission")?.setValue(formatDate(AdmissionDate,'yyyy-MM-dd','en'));
    this.ClaimForm.get("DateOfAdmission")?.setValue(AdmissionDate);}
    this.dateSent = AdmissionDate;
    // formatDate(AdmissionDate,'yyyy-MM-dd','en'

    if(dischargeDate !=null){
    //this.ClaimForm.get("DateOfDischarge")?.setValue(formatDate(dischargeDate,'yyyy-MM-dd','en'));
    this.ClaimForm.get("DateOfDischarge")?.setValue(dischargeDate);
   }
    
    this.ClaimForm.controls["CostPD"].setValue(patientInformationList.costPerDay);
    this.ClaimForm.controls["InitialCE"].setValue(patientInformationList.initialCostEstimate);
    //this.ClaimForm.controls["TotalBillAmount"].setValue(patientInformationList.finalBillAmount);
    //this.ClaimForm.controls["ClaimAmount"].setValue(patientInformationList.claimedAmount);
    this.ClaimForm.controls["patientprimaryInsured"].setValue(patientInformationList.primaryInsured);
    this.ClaimForm.controls["Procedure"].setValue(patientInformationList.procedureId);
    this.procedure =patientInformationList["procedureMst"].name;
    
    this.ClaimForm.controls["totalRC"].setValue(patientInformationList.totalRoomCost);
    
    if(patientInformationList.otherCostId !=null){
    this.ClaimForm.controls["OtherC"].setValue(patientInformationList.otherCostId);
    }

    this.ClaimForm.controls["OtherCE"].setValue(patientInformationList.otherCostsEstimate);

    this.ClaimForm.controls["Hospital"].setValue(patientInformationList.hospitalId);
    this.ClaimForm.controls["PHUHID"].setValue(patientInformationList.hospitalUhid);

    
    
    this.medicalForm.controls["Genders"].setValue(patientInformationList.genderId);
    this.medicalForm.controls["Procedures"].setValue(patientInformationList.procedureId);

  }
  
  if(patientMedicalInfoList!=null){
    this.medicalForm.controls["Nameofthetreatingdoctor"].setValue(patientMedicalInfoList.doctorName);
    this.medicalForm.controls["DrResgistrationnumber"].setValue(patientMedicalInfoList.doctorRegistrationNumber);
    this.medicalForm.controls["Qualificationofthetreatingdoctor"].setValue(patientMedicalInfoList.doctorQualification);
    
    this.medicalForm.controls["Provisionaldiagnosis"].setValue(patientMedicalInfoList.diagnosisId);
    this.diagnosis = patientMedicalInfoList["diagnosisMst"].name;

    this.medicalForm.controls["Speciality"].setValue(patientMedicalInfoList.specialityId);
    this.medicalForm.controls["Pasthistoryofchronicillness"].setValue(patientMedicalInfoList.pastChronicIllness);
    
    this.medicalForm.controls["TreatmentType"].setValue(patientMedicalInfoList.treatmentTypeId);
    this.treatmentType = patientMedicalInfoList["treatmentTypeMst"].name;

    this.medicalForm.controls["Dateoffirstdiagnosis"].setValue(patientMedicalInfoList.dateOfFirstDiagnosis);
   
    
    let dateofirstdiagDate=patientMedicalInfoList.dateOfFirstDiagnosis;

    if(dateofirstdiagDate !=null){
    this.ClaimForm.get("Dateoffirstdiagnosis")?.setValue(formatDate(dateofirstdiagDate,'yyyy-MM-dd','en'));}
 
    // Pasthistoryofchronicillness
    // DrResgistrationnumber

  }
  
  if(patientInsuranceInfoList != null){
    this.InsuaranceForm.controls["TPAnumber"].setValue(patientInsuranceInfoList.tpaNumber),
    this.InsuaranceForm.controls["PolicyHolder"].setValue(patientInsuranceInfoList.policyHolderName),
    this.InsuaranceForm.controls["PolicyNumber"].setValue(patientInsuranceInfoList.policyNumber),
    // this.ClaimForm.controls["TreatmentType"].setValue(patientInsuranceInfoList[0].patientRelation),
    this.InsuaranceForm.controls["Groupcompany"].setValue(patientInsuranceInfoList.groupCompany),
    this.InsuaranceForm.controls["TPAID"].setValue(patientInsuranceInfoList.tpaMst.id),
    this.InsuaranceForm.controls["InsuranceCompany"].setValue(patientInsuranceInfoList.insuranceCompanyMst.id),
    // this.ClaimForm.controls["TreatmentType"].setValue(patientInsuranceInfoList[0].tpaId),
    this.InsuaranceForm.controls["RelationOPH"].setValue(patientInsuranceInfoList.relationshipId),
    this.InsuaranceForm.controls["IsGroupPolicy"].setValue(patientInsuranceInfoList.isGroupPolicy)
    }

  }
  
  get f() { return this.ClaimForm.controls; }
  get M() { return this.medicalForm.controls; }
  get I() { return this.InsuaranceForm.controls; }

  openDialog() {
   
    //this.othercostarray = this.OtherCosts;

    this.OtherCosts.forEach((element:any) => {
    
    //this.Otherclist.push({ id:element.id,name: element.name,value: 0});
    if (this.Otherclist.length ==this.OtherCosts.length) {
      //alert('User already exists');
     } else {
      this.Otherclist.push({ id:element.id,name: element.name,value: 0});
     }
      
    });

   
    this.dialogRef = this.modalPopupService.openPopup<OthercostComponent>(OthercostComponent,{data:this.Otherclist});
    //this.modalPopupService.openPopup(OthercostComponent);
   // modalRef.componentInstance.user = this.user;
    //this.modalPopupService.openPopup<OthercostComponent>(OthercostComponent, null);
    
    //this.dialogRef.afterOpened().subscribe
    
    this.dialogRef.afterClosed().subscribe(result => {
      //alert("dialogRef" + result);
      this.Othercostlist = [];
      let data = [];
      let sum :number = 0;
      this.dataservice.currentothercost_data.subscribe((res:any) =>{
        data = res;
        data.forEach((element:any) => {
          this.Othercostlist.push({ id:element.id,amount:parseInt(element.value)});
          sum = sum + parseInt(element.value)
        });
        //alert("dialogRef" + JSON.stringify(this.Othercostlist));

      });
      this.ClaimForm.controls['OtherCE'].setValue(sum)
    });
  }

  changeDate() {
    this.dateSent = new Date(this.dateSent).getFullYear() + '-' + ('0' + new Date(this.dateSent).getMonth()).slice(-2) + '-' + ('0' + new Date(this.dateSent).getDate()).slice(-2);
    this.dateReceived = this.dateSent
  }

  OngrouppolicykCheck(event:any){
    this.isChecked = !event;
    // alert(this.isChecked);
    // if(event){
    //   this.InsuaranceForm.controls["IsGroupPolicy"].setValidators([Validators.required])
    //     // [Validators.minLength(1), Validators.maxLength(30)]);
    // }else{
    //   this.InsuaranceForm.controls["IsGroupPolicy"].setValidators([]);
    // }
  }

  OnPatientSubmit(formData: any) {
    console.log("", formData)
    this.submitted = true;
    if (this.ClaimForm.invalid) {
      //alert('form invalid');
    }
    else {
      let otherCostDetail :any = [];
      this.Othercostlist.forEach((res:any)=>{
        if(res.amount != 0){
          otherCostDetail.push({ id:res.id,amount:res.amount});
        }
      })
      //alert("form valid") id is claimid
      let patientbody = {
        "id": this.claimInfoID,
        "tpaClaimId" : null,
        "userId" : this.LoggedInId,
        "hospitalId" : this.ClaimForm.value.Hospital,
        "claimStageId" : this.claimStageId,
        "statusId" : 2,
        "patientInfoDto" : {
            "firstName" : this.ClaimForm.value.Fname,
            "middleName" : this.ClaimForm.value.Mname,
            "lastname" : this.ClaimForm.value.Lname,
            "mobileNo" : this.ClaimForm.value.MobileNo,
            "dateBirth" : this.ClaimForm.value.DOB,
            "age" : this.ClaimForm.value.Age,
            "dateOfAdmission" : this.ClaimForm.value.DateOfAdmission,
            "estimatedDateOfDischarge" : this.ClaimForm.value.DateOfDischarge,
            "dateOfDischarge" : this.ClaimForm.value.DateOfDischarge,
            "costPerDay" : this.ClaimForm.value.CostPD,
            "totalRoomCost" : this.ClaimForm.value.totalRC,
            "otherCostsEstimate" : this.ClaimForm.value.OtherCE,
            "initialCostEstimate" : this.ClaimForm.value.InitialCE,
            "billNumber" : "",
            "claimedAmount" : this.ClaimForm.value.ClaimAmount,
            "enhancementEstimate" : 0,
            "finalBillAmount" : this.ClaimForm.value.TotalBillAmount,
            "hospitalUhid" : this.ClaimForm.value.PHUHID,
            "hospitalId" : this.ClaimForm.value.Hospital,
            // this.ClaimForm.value.OtherC,
            "roomCategoryId" : this.ClaimForm.value.RoomCategory,
            "procedureId" : this.ClaimForm.value.Procedure,
            "genderId" : this.ClaimForm.value.Gender,
            "otherCostDetail" : otherCostDetail
        }
      }

      this.api.post('healspan/claim/createorupdateclaimandpatientinfo',patientbody).subscribe((res) =>{
        console.log("patientSave response",res);
        if(res.responseStatus == "SUCCESS"){
          this.patientInfoResponse = res;
          this.claimInfoID = this.patientInfoResponse.claimInfoId;
        }
      })
    }
  }

  onMedformSubmit(formData: any) {
    console.log("dfhbd", formData)
    this.submitted2 = true;
    if (this.medicalForm.invalid) {
      //alert('form invalid');
      console.log(this.medicalForm.value);
    }
    else {
      //alert("form valid and submitted")
     if(this.claimInfoID != null){
      this.claimInfoID = this.patientInfoResponse.claimInfoId;
     }
      let medicalparam = {
        "claimId" : this.claimInfoID,
        "dateOfFirstDiagnosis" : this.medicalForm.value.Dateoffirstdiagnosis,
        "claimStageId" : this.claimStageId,
        "doctorName" : this.medicalForm.value.Nameofthetreatingdoctor,
        "doctorQualification" : this.medicalForm.value.Qualificationofthetreatingdoctor,
        "doctorRegistrationNumber": this.medicalForm.value.DrResgistrationnumber,
        "pastChronicIllness" : parseInt(this.medicalForm.value.Pasthistoryofchronicillness),
        "diagnosisId" : parseInt(this.medicalForm.value.Provisionaldiagnosis),
        "procedureId" : parseInt(this.medicalForm.value.Procedures),
        "specialityId" : parseInt(this.medicalForm.value.Speciality),
        "treatmentTypeId" : parseInt(this.medicalForm.value.TreatmentType)
      }
 
      this.api.post('healspan/claim/createorupdatemedicalinfo',medicalparam).subscribe((res) =>{
        console.log("medicalSave response",res);
        if(res.responseStatus == "SUCCESS"){
        this.medicalInfoResponse = res;       
        this.GetSequentialquestion();
        this.IsSaveSequentialQue = true;
        }else{
          this.IsSaveSequentialQue = false;
        }
      })
    }
    // this.GetSequentialquestion();
    // this.IsSaveSequentialQue = true;
  }

  SaveSequentialQue(){
    let ruleengineres = {
      "medicalInfoId": this.medicalInfoResponse.medicalInfoId, 
      "sequentialQuestion": this.Questions,
      "documentList": this.doclist
    }
  //   [
  //     {
  //         "question": "Who are you ?",
  //         "answer": "Sagar"
  //     },
  //     {
  //         "question": "Are you married?",
  //         "answer": "No"
  //     },
  //     {
  //         "question": "Are you graduate?",
  //         "answer": "Yes"
  //     }
  // ],
    this.api.post('healspan/claim/savequestionnairesanddocument',ruleengineres).subscribe((ruleres) =>{
      console.log("ruleres",ruleres);
      this.ruleInfoResponse = ruleres;
      this.doclist =[];
      for (var obj in ruleres.documentId) {
        if (ruleres.documentId.hasOwnProperty(obj)) {  
          //----loop--------------------
            let element  ={"docid": ruleres.documentId[obj],"docname" : obj}
            this.doclist.push(element);
        }
      }
      console.log("DocumentIds",this.doclist);
    })
  }

  OnInsuarancecontinue(formData: any) {
    console.log("dwefw", formData)
    this.submitted3 = true;
    if (this.InsuaranceForm.invalid) {
     // alert('Form invalid');
      console.log(this.InsuaranceForm.value);
    }

    else {
      //alert("form valid")
      if(this.claimInfoID != null){
        this.claimInfoID = this.patientInfoResponse.claimInfoId;
       }
      let Insuranceparam = {
        "claimId" : this.claimInfoID,
        "claimStageId" : this.claimStageId,
        "tpaNumber" : this.InsuaranceForm.value.TPAnumber,
        "policyHolderName" : this.InsuaranceForm.value.PolicyHolder,
        "policyNumber" : this.InsuaranceForm.value.PolicyNumber,
        "isGroupPolicy" : this.InsuaranceForm.value.IsGroupPolicy,
        "groupCompany" : this.InsuaranceForm.value.Groupcompany,
        "claimIDPreAuthNumber" : null,
        "initialApprovalAmount" : null,
        "approvedEnhancementsAmount" : null,
        "approvedAmountAtDischarge" : null,
        "tpaId" : this.InsuaranceForm.value.TPAID,
        "insuranceCompanyId" : this.InsuaranceForm.value.InsuranceCompany,
        "relationshipId" : this.InsuaranceForm.value.RelationOPH
      }

      this.api.post('healspan/claim/createorupdateinsuranceinfo',Insuranceparam).subscribe((res) =>{
        console.log("InsuranceSave response",res)
      })

    }
  }

  FinalSubmit(){
    let param ={   
        "claimId":this.claimInfoID,
        "stageId": this.claimStageId,
        "statusId":3
    
    }
    this.api.post('healspan/claim/updateclaimstatus',param).subscribe((res) =>{
      console.log("updateclaimstatus response",res)
    })
  }
 
  //-----Start File Upload Logic ------------------------
  fileChange(event: any,i:any, docid: any) {
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
    
        this.http.post('http://3.109.1.145:8109/healspan/claim/upload',body).subscribe((res:any) =>{
          //alert(JSON.stringify(res));
          let input = document.getElementById('status_' + i) as HTMLInputElement | undefined;
          input!.innerText = file.name;
          this.spinnerservice.hide();
        });
    
      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }

    }

  }

  OnDownload(docid:any){
    window.open(environment.baseUrl+'healspan/claim/download/'+docid);
  }

  //currently not using this method
  uploadAndProgressSingle(id: any,file:any) {
    this.progress = 1;
    let inputDocId = 113;
    // healspan/claim/upload
    let body = new FormData();
    body.append('file', file),
    body.append('inputDocId', '113'),

    this.http.post('http://3.109.1.145:8109/healspan/claim/upload', body).subscribe((res:any) =>{
      alert(JSON.stringify(res));
    });

    this.http
      .post("https://file.io", this.file_data, {
        reportProgress: true,
        observe: "events"
      })
    //this.http.post('http://3.109.1.145:8109/healspan/claim/upload', body)
      .pipe(
        map((event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.progress = Math.round((100 / event.total) * event.loaded);

          } else if (event.type == HttpEventType.Response) {
            console.log(event.body)
            this.progress = null;
            this.filestatus = "uploaded succesfully";
            let input = document.getElementById('status_' + id) as HTMLInputElement | undefined;
            input!.innerText = event.body.name;
          }
        }),
        catchError((err: any) => {
          this.progress = null;
          this.filestatus = "";
          alert(err.message);
          return throwError(err.message);
        })
      )
      .toPromise();
  }
  //-----End File Upload Logic --------------------------


  //-----------------Bind all dropdown
  bindDropdown() {
    this.api.getService('healspan/claim/admin/masters').subscribe((data: any) => {
      this.masterData = data;
      this.insuaranceCompanyDetail = data["insurance_company_mst"];
      this.roomsDetail = data["room_category_mst"];
      this.TPADetail = data["tpa_mst"];
      this.OtherCosts = data["other_costs_mst"];
      this.procedureDetail = data["procedure_mst"];
      this.specialityDetail = data["speciality_mst"];
      this.hospitalDetail = data["hospital_mst"];
      this.chronicillnessDetail = data["chronic_illness_mst"];
      this.DiagnosisDetail = data["diagnosis_mst"];
      this.RPADetail = data["relationship_mst"];
      this.GenderDetail = data["gender_mst"];
      this.claimStageMaster = data["claim_stage_mst"];
      this.treatmentTypeDetails= data["treatment_type_mst"];
      let claim = this.claimStageMaster.filter((x:any) =>x.name ==  this.ActiveStage);
      this.claimStageId = claim[0].id;
      //alert(claim[0].id+claim[0].name)
      
    })
  }

  //---------Start Binding Values on selection to Next medical Form
  OnGenderSelect(event: any) {
    //let Gender = event.target.options[event.target.options.selectedIndex].text;
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
    this.medicalForm.controls['Ages'].setValue(age)
  }

  calculateDiff(){
    let DateOfAdmission = new Date(this.ClaimForm.get("DateOfAdmission")?.value);
    let DateOfDischarge = new Date(this.ClaimForm.get("DateOfDischarge")?.value);
    let costperday = this.ClaimForm.get("CostPD")?.value;

    let days = Math.floor((DateOfDischarge.getTime() - DateOfAdmission.getTime()) / 1000 / 60 / 60 / 24);
    let totalcost : number = days * costperday;
    this.ClaimForm.controls["totalRC"].setValue(totalcost);    //alert(days);
    //return days;
  }

  // Binding Values on selection to Next Form----end

  // --------------------------------------------------------------------------------------------------

  // costSelect(event: any) {
  //   console.log("event1", event.value)
  //   this.othercostarray = event.value.map(function (items: any) {
  //     return { items }
  //   })
  //   this.othercostheader = [];
  //   for (let i = 0; i < event.value.length; i++) {
  //     const cstvar = this.OtherCosts.filter((x: any) => x.id == event.value[i]);
  //     //
  //     this.othercostheader.push({
  //       "id": cstvar[0].id,
  //       "costType": cstvar[0].costType,
  //     });

  //   }
  //   console.log("OtherCosts", this.othercostheader);

  // }


  Ondiagnosis(event: any){
    this.diagnosis = event.target.options[event.target.options.selectedIndex].text;
  }

  onprocedureSelect(event: any) {
    this.procedure = event.target.options[event.target.options.selectedIndex].text;
    //let procedureee = event.target.options[event.target.options.selectedIndex].text;
    this.medicalForm.controls['Procedures'].setValue(event.target.value)
  }

  OntreatmentType(event:any){
    this.treatmentType = event.target.options[event.target.options.selectedIndex].text;
  }

  OnGender(event:any){
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

  GetSequentialquestion(){
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

    if(this.ActiveStage == "Initial Authorisation"){
      this.ActiveStage = "Initial"
    }
      let bodyparam ={  
      "diagnosis": this.diagnosis,
      "claimStage": this.ActiveStage,
      "treatmentType":this.treatmentType,
      "gender":this.gender,
      "age":this.ClaimForm.get("Age")?.value,
      "procedure": this.procedure,
      "duration":this.medicalForm.get("Duration")?.value,
      "claimValue":this.medicalForm.get("Claim")?.value
    }

    this.GenerateRuleEngineModel(bodyparam)
  }

  GenerateRuleEngineModel(bodyparam:any){

    this.api.postService(environment.ruleBaseUrl, bodyparam).subscribe(res => {
    console.log(res); 
    let data: any = [];
    this.doclist = [];
    data.push(res)
              if (data[0].operation == "Question") {
                //console.log(this.countObectKeys(apiresponse));
                  var object: any = {};
                 if(data[0].question != null){
                      //----loop for answer---------------------
                          //------Declare and split options ,push value to array---------------
                          let options:any = [];
                          var substring = data[0].options.split("|");
                          //console.log(substring)
    
                          substring.forEach((element:any) => {
                            let optionsres = {"label" : element,"value":element}
                            options.push(optionsres);
                          });
                          object["rlabel"]= data[0].question;
                          object["roptions"] = options;
                          object["value"] = "",
                          object["type"] = "select",

                          // object["question"] = data[0].question;
                          // object["answer"] = options
                          this.Questions =[];
                          this.Questions.push(object);   
                          
                         
                  }
                  this.BuildRuleForm();

              }else{
                if(data[0].document !=  null){
                      var docsubstring = data[0].document.split("|");
                      docsubstring.forEach((element:any) => {
                        //let optionsres = {element}
                        this.doclist.push(element);
                      });
                 }
                 let admission =[
                  'Report supporting the diagnosis',
                  'Etiology of ailment/Consultation papers',
                  'Patient address proof (Pref. Aadhar)',
                  'Insured PAN Card',
                  'Claim Form (Part A)'

                ];
               
                admission.forEach((element:any) => {
                  //let optionsres = {element}
                  this.doclist.push(element);
                });
                //alert(JSON.stringify(this.doclist));
                  

              }
  
      
    })
  }
 
  BuildRuleForm(){
    //this.questioncostheader = [];
    this.questioncostheader.push({
      label: this.Questions[0].rlabel,
      value: "",
      type: "select",
      options:this.Questions[0].roptions,
    });
    console.log("OtherCosts", this.questioncostheader);
  }

  OnQuestionSelect(event:any){
    //alert(event.target.value)
    if(this.answerparam == ""){
      this.answerparam = event.target.value;
    }else{
      this.answerparam = this.answerparam +'|'+ event.target.value;
    }
    let bodyparam ={
      "diagnosis": "Maternity",
      "treatmentType":"Medical/Surgical management",
      "procedure":"FTND/LSCS",
      "duration":">24 hours",
      "answer":this.answerparam
    }

    this.GenerateRuleEngineModel(bodyparam)
  }

  getreceiveothercost(event:any){
    //alert(event.target.value)
  }
}



