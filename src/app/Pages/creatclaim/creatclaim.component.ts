import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { HttpHeaders, HttpClient, HttpParams, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { catchError, map } from "rxjs/operators"
import { Subject, throwError } from 'rxjs';
import { ActivatedRoute, Route } from '@angular/router';
declare function verificationForm(): any;
//declare function phoneNoselect():any;
declare function nice_Select(): any;
@Component({
  selector: 'app-creatclaim',
  templateUrl: './creatclaim.component.html',
  styleUrls: ['./creatclaim.component.css']
})
export class CreatclaimComponent implements OnInit {

  
  IsTypeOfAccident: boolean = false; IspassengerType: boolean = false; 
  IsTypeOfVehicle: boolean = false; IsImpantUsed: boolean = false;
  admissiondata: any;mobilenumber!: number;

  constructor(private fb: FormBuilder, private api: ApiService, private http: HttpClient,
     private httpClient: HttpClient,private route:ActivatedRoute) {
    this.minDateToFinish.subscribe((r: any) => {
      this.minDate = new Date(r);
    })
  }
  ClaimForm!: FormGroup; submitted = false; submitted2 = false; submitted3 = false; isEditable = false; ailmentList: any
  InsuaranceForm!: FormGroup;
  medicalForm!: FormGroup;
  DocumentsForm!: FormGroup;
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
  OtherCosts: any;
  roomsDetail: any;
  insuaranceCompanyDetail:any;
  RPADetail:any;
  TPADetail:any;

  showAge: any

  file_data:any='';percentDone:any; 
  filestatus:any;currentupload:any;
  ActiveStage :any;
  progress :any =0;

  ngOnInit(): void {
    let stagename = this.route.snapshot.params['stagename'];
    this.ActiveStage = stagename;
    this.mobilenumber=0;
    verificationForm();
    nice_Select();
    this.todaysdate = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2);
    console.log(this.todaysdate)
   
    this.ClaimForm = this.fb.group({

      Fname: [null, Validators.required],
      Mname: [null, Validators.required],
      Lname: ['', Validators.required],
      MobileNo: [['', Validators.required,  Validators.maxLength(10)]],
      PHUHID: ['',],
      Gender: ['', Validators.required],
      DOB: ['',],
      Age: ['', Validators.required],
      Stage: [this.ActiveStage,],
      patientprimaryInsured: [true, Validators.required],
      HospitalName: ['', Validators.required],
      DateOfAdmission: ['',],
      DateOfDischarge: ['',],
      RoomCategory: ['',],
      CostPD: ['', Validators.required],
      totalRC: ['',],
      OtherC: ['',],
      OtherCE: ['',],
      Procedure: ['',],
      InitialCE: ['',],
      Ailment: ['', Validators.required],
      TotalBillAmount: ['', Validators.required],
      ClaimAmount: ['', Validators.required],
    })

    this.medicalForm = this.fb.group({
      Procedures: ["",],
      TreatmentType: ["",],
      Provisionaldiagnosis: ["",],
      Speciality: ["",],
      Dateoffirstdiagnosis: ["",],
      Pasthistoryofchronicillness: ["",],
      Nameofthetreatingdoctor: ["",],
      DrResgistrationnumber: ["",],
      Qualificationofthetreatingdoctor: ["",],
      Ailments: ["",],
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
      TPA: ['', Validators.required],
      TPAID: ['', Validators.required],
      PolicyHolder: ['', Validators.required],
      RelationOPH: ['', Validators.required],
      PolicyNumber: ['', Validators.required],
      GroupPolicy: ['', Validators.required],
      GroupPolicy2: ['', Validators.required],
    })

    this.DocumentsForm = this.fb.group({
      file1: [''],
      file2: [''],
      file3: [''],
      file4: [''],
      file5: [''],
    })

    this.bindDropdown();
    this.GetDocList();

    this.date = new Date().toISOString().slice(0, 10);
   
  }
  
  get f() { return this.ClaimForm.controls; }
  get M() { return this.medicalForm.controls; }

  get I() { return this.InsuaranceForm.controls; }

  changeDate() {
    this.dateSent = new Date(this.dateSent).getFullYear() + '-' + ('0' + new Date(this.dateSent).getMonth()).slice(-2) + '-' + ('0' + new Date(this.dateSent).getDate()).slice(-2);
    this.dateReceived = this.dateSent
  }


  Oncontinue(formData: any) {
    console.log("", formData)
    this.submitted = true;
    if (this.ClaimForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.ClaimForm.value);
    }
    else {
      alert("form invalid")
    }
  }

  GetDocList(){
    
      this.api.getService("assets/data/doclist.json").subscribe((data:any) => {
        this.doclist = [];
        if(this.ActiveStage == "Inital"){
           this.doclist = data["Admission"];
           this.doclist1 = JSON.stringify(data["Admission"]);
           
         }else if(this.ActiveStage == "Discharge"){
            data["Admission"].forEach((element:any) => {
              this.doclist.push(element)
            });
            data["Discharge"].forEach((element:any) => {
              this.doclist.push(element)
            });
            console.log(this.doclist);

         }else if(this.ActiveStage == "FinalClaim"){
          data["Admission"].forEach((element:any) => {
            this.doclist.push(element)
          });
          data["Discharge"].forEach((element:any) => {
            this.doclist.push(element)
          });
          data["FinalClaim"].forEach((element:any) => {
            this.doclist.push(element)
          });
          console.log(this.doclist);
       }
      })
    
  }

  // ----For Sequential question-------------------
  OnClaimselect(event: any) {
    let Claimvalue = event.target.options[event.target.options.selectedIndex].text;
    var patientage = "Any";
    this.api.getService("assets/data/admission.json").subscribe((data: any) => {
      this.admissiondata = data["Admission"];
      console.log("data", data);
      let Speciality = this.medicalForm.get("Speciality")?.value;
      let TreatmentType = this.medicalForm.get("TreatmentType")?.value;
      let Genders = this.medicalForm.get("Genders")?.value;
      let Agevalue = this.medicalForm.get("Ages")?.value;
   
      if(Agevalue > 40){
        patientage = '>40'
      }else {
        patientage = '<40'
      }
      let Duration = this.medicalForm.get("Duration")?.value;
      let Claim = this.medicalForm.get("Claim")?.value;

      let restest = this.admissiondata.filter((element: any) => (element.Speciality == String(Speciality)&& element.TreatmentType == String(TreatmentType)&& element.Gender == String(Genders)&& element.Age == String(patientage)&& element.Durationofstay == String(Duration)&& element.Claimvalue == String(Claimvalue)) );
      // let res = this.admissiondata.filter((element: any) => (element.Speciality == Speciality && element.TreatmentType == TreatmentType && element.Gender == Genders && element.Age == Ages && element.Durationofstay == Duration && element.Claimvalue == Claimvalue));
      if (restest.length > 0) {
        alert(restest[0].Screen);
        if (restest[0].Screen == "\"This claim is not admissible\"") {
          alert("This claim is not admissible,may be denied by TPA")
        } else if (restest[0].Question1) {    
          this.IsTypeOfAccident = true;
        }
      }
      //(element.Speciality==Speciality&& element.TreatmentType==TreatmentType&&element.Gender==Genders&&element.Age==Ages&&element.Durationofstay==Duration&&element.Claimvalue==Claimvalue));

      // });
      console.log(restest);
    })
  }


  OnInsuarancecontinue() {
    console.log("dwefw")
    this.submitted2 = true;
    if (this.InsuaranceForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.log(this.InsuaranceForm.value);
    }

    else {
      alert("form invalid")
    }
  }


 //-----Start File Upload Logic ------------------------
  fileChange(event:any,id:any) {
    this.currentupload = id;
    alert('progress_'+id);
    const fileList: FileList = event.target.files;
    //check whether file is selected or not
    if (fileList.length > 0) {

        const file = fileList[0];
        //get file information such as name, size and type
        console.log('finfo',file.name,file.size,file.type);
        //max file size is 4 mb
        if((file.size/1048576)<=50)
        {
          let formData = new FormData();
          formData.append('file', file, file.name);
          formData.append('tz',new Date().toISOString())
          this.file_data=formData
          console.log(this.file_data);
          this.uploadAndProgressSingle(id);
        }else{
          //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
        }
        
    }

  }

  uploadAndProgressSingle(id:any){   
    this.progress = 1; 
    this.http
      .post("https://file.io", this.file_data, {
        reportProgress: true,
        observe: "events"
      })
      .pipe(
        map((event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.progress = Math.round((100 / event.total) * event.loaded);

          } else if (event.type == HttpEventType.Response) {
            console.log(event.body)
            this.progress = null;
            this.filestatus = "uploaded succesfully";
            let input  = document.getElementById('status_'+id) as HTMLInputElement | undefined;
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

    this.api.getService("assets/data/picklist.json").subscribe((data: any) => {

      this.GenderDetail = data["GenderName"];
      this.procedureDetail = data["procedure"];
      this.OtherCosts = data["Other costs"];
      this.roomsDetail = data["Room category"];
      this.insuaranceCompanyDetail= data["Insurance company"]
      this.TPADetail= data["TPA"]
      this.RPADetail= data["Relation of patient with policy holder"]
      //console.log("sdsd", this.GenderDetail);
    })
  }

  //---------Start Binding Values on selection to Next medical Form
  OnGenderSelect(event: any) {
    let Gender = this.ClaimForm.get("Gender")?.value;
    this.medicalForm.controls['Genders'].setValue(Gender)
  }
  OnAilmentselect(event: any) {
    let Ailment = this.ClaimForm.get("Ailment")?.value;
    this.medicalForm.controls['Ailments'].setValue(Ailment)
  }
 // -------------End Binding Values on selection to Next medical Form

  ageCalculator() {
    if (this.ClaimForm.value.DOB) {
      const convertAge = new Date(this.ClaimForm.value.DOB);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
    let datee = this.ClaimForm.get("Age")?.value;
    this.medicalForm.controls['Ages'].setValue(datee)
  }


  // Binding Values on selection to Next Form----end

  // --------------------------------------------------------------------------------------------------



  onMedformSubmit(formData:any) {
    console.log("dfhbd")
    this.submitted2 = true;
    if (this.medicalForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.medicalForm.value);
    }
    else {
      alert("form invalid")
    }
  }


  onprocedureSelect(event: any){
    let procedureee = this.ClaimForm.get("Procedure")?.value;
    this.medicalForm.controls['Procedures'].setValue(procedureee)
  }


  OnDurationSelect(event:any){
    this.medicalForm.controls['Claim'].setValue("");
    this.IsImpantUsed = false;
    this.IspassengerType = false;
    this.IsTypeOfVehicle = false;
    this.IsTypeOfAccident = false;
  }

  OnSpecialitySelect(event:any){
    this.medicalForm.controls['Claim'].setValue("");
    this.medicalForm.controls['Duration'].setValue("");
    this.IsImpantUsed = false;
    this.IspassengerType = false;
    this.IsTypeOfVehicle = false;
    this.IsTypeOfAccident = false;
  }

  OnTreatmentSelect(event:any){
    this.medicalForm.controls['Claim'].setValue("");
    this.medicalForm.controls['Duration'].setValue("");
    this.medicalForm.controls['Speciality'].setValue("");
    this.IsImpantUsed = false;
    this.IspassengerType = false;
    this.IsTypeOfVehicle = false;
    this.IsTypeOfAccident = false;
  }

  
  OnPassengerType(event: any) {
    this.IsTypeOfVehicle = true;
  }

  OnTypeofAccident(event: any) {
    console.log(event.target.value);
    if(event.target.value == "Hit & Run"){
      this.IsImpantUsed = true;
      this.IspassengerType = false;
      this.IsTypeOfVehicle = false;
    }else{
      this.IsImpantUsed = false;
      this.IspassengerType = true;
    }
   
  }
}



