import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { async } from '@angular/core/testing';
import { ApiService } from 'src/app/service/api.service';
import { HttpHeaders, HttpClient, HttpParams, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { error } from 'console';
import { map } from "rxjs/operators"
import { FileuploadService } from 'src/app/service/fileupload.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
// declare function($: any);
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
  admissiondata: any;
  constructor(private fb: FormBuilder, private api: ApiService, private http: HttpClient,
    private FileUploadService: FileuploadService, private httpClient: HttpClient,) {
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
  progress = 0;
  message = '';
  currentFile!: File;
  fileInfos?: Observable<any>;
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

  showAge: any;
  ngOnInit(): void {

    this.todaysdate = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2);
    console.log("kkkk", this.todaysdate)

    this.fileInfos = this.FileUploadService.getFiles();
    verificationForm();
    // //phoneNoselect();
    nice_Select();

    this.ClaimForm = this.fb.group({

      Fname: [null, Validators.required],
      Mname: [null, Validators.required],
      Lname: ['', Validators.required],
      MobileNo: ['', Validators.required,],
      PHUHID: ['',],
      Gender: ['', Validators.required],
      DOB: ['',],
      Age: ['', Validators.required],
      Stage: ['',],
      patientprimaryInsured: [true, ],
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
      TreatmentType: ["",Validators.required],
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
      InsuranceCompany: ['',],
      TPA: ['',],
      TPAID: ['',],
      PolicyHolder: ['',],
      RelationOPH: ['',],
      PolicyNumber: ['',],
      GroupPolicy: ['',],
      GroupPolicy2: ['',],

    })

    this.DocumentsForm = this.fb.group({
      file1: [''],
      file2: [''],
      file3: [''],
      file4: [''],
      file5: [''],
    })



    this.date = new Date().toISOString().slice(0, 10);
    this.httpClient.get("assets/data/picklist.json").subscribe((data: any) => {

      this.GenderDetail = data["GenderName"];
      this.procedureDetail = data["procedure"];
      this.OtherCosts = data["Other costs"]
      this.roomsDetail = data["Room category"]
      console.log("sdsd", this.GenderDetail);
    })
  }

  changeDate() {
    this.dateSent = new Date(this.dateSent).getFullYear() + '-' + ('0' + new Date(this.dateSent).getMonth()).slice(-2) + '-' + ('0' + new Date(this.dateSent).getDate()).slice(-2);
    this.dateReceived = this.dateSent
  }


  async BindDropdown() {
    // this.api.get('/posts').subscribe(
    //   {
    //     next: (data) => {
    //       this.ailmentList = data
    //       console.log(this.ailmentList, "wds")
    //     },
    //     error: (e) => console.error(e),
    //   }
    // );


  }





  get f() { return this.ClaimForm.controls; }

  get M() { return this.medicalForm.controls; }

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

    // const servicesData = {

    //   "serviceID": 18,
    //   "stateID": 0,
    //   "customerID": 0,
    //   "productID": 0,
    // }
    // this.api.post('/AdditionalService/ServiesCharges_List', servicesData).subscribe(
    //   {
    //     next: (data:any) => {
    //       this.claimformData = data ;
    //       console.log("fdfc",data)
    //     },
    //     error: (e) => console.error(e),
    //   }
    // );
    // this.api.post('/SaveProduct',servicesData).subscribe(
    //   (data:any)=>{
    //     console.log("fdfc",data)
    //     }       

    // );



  }

  OnClaimselect(event: any) {
    let Claimvalue = event.target.options[event.target.options.selectedIndex].text;

    this.httpClient.get("assets/data/admission.json").subscribe((data: any) => {
      this.admissiondata = data["Admission"];
      console.log("data", data);
      let Speciality = this.medicalForm.get("Speciality")?.value;
      let TreatmentType = this.medicalForm.get("TreatmentType")?.value;
      let Genders = this.medicalForm.get("Genders")?.value;
      let Ages = this.medicalForm.get("Ages")?.value;
      let Duration = this.medicalForm.get("Duration")?.value;
      let Claim = this.medicalForm.get("Claim")?.value;



      this.restest = this.admissiondata.filter((element: any) => (element.Speciality == String(Speciality) && element.TreatmentType == String(TreatmentType) && element.Gender == String(Genders) && element.Age == String(Ages) && element.Durationofstay == String(Duration) && element.Claimvalue == String(Claimvalue)));
      // let res = this.admissiondata.filter((element: any) => (element.Speciality == Speciality && element.TreatmentType == TreatmentType && element.Gender == Genders && element.Age == Ages && element.Durationofstay == Duration && element.Claimvalue == Claimvalue));
      if (this.restest.length > 0) {
        alert(this.restest[0].Screen);
        if (this.restest[0].Screen == "\"This claim is not admissible\"") {
          alert("This claim is not admissible,may be denied by TPA")
        } else if (this.restest[0].Q1Options) {
          this.httpClient.get("assets/data/doclist.json").subscribe((data: any) => {
            //alert(data["list"]);
            this.doclist = data["list"];
            this.doclist1 = JSON.stringify(data["list"]);
          })
          this.IsTypeOfAccident = true;

          // if (restest[0].Question2) {
          //   this.IspassengerType = true
          // } else {
          //   this.IspassengerType = false
          // }

          // if (restest[0].Question3) {
          //   this.IsTypeOfVehicle = true
          // } else {
          //   this.IsTypeOfVehicle = false
          // }
        }
      }
      //(element.Speciality==Speciality&& element.TreatmentType==TreatmentType&&element.Gender==Genders&&element.Age==Ages&&element.Durationofstay==Duration&&element.Claimvalue==Claimvalue));

      // });
      console.log(this.restest);

      // if(Speciality == "General Medicine" && TreatmentType=="Medical management"  && Genders == "Any" &&  Ages == "Any" && Duration == "Less than 24 hours" && Claimvalue=="Any")
      // {
      //   alert("This claim is not admissible, may be denied by TPA")
      // }

    })
  }

  OnTypeofAccident(event: any) {
    let toa = this.medicalForm.get("TypeOfAccident")?.value;
    if (toa == this.restest[0].Q1Options) {
      this.IspassengerType = true
    } else {
      this.IspassengerType = true
    }

  }

  OnPassengerType(event: any) {

    let poa = this.medicalForm.get("passengerType")?.value;
    if (poa == this.restest[0].Q2Options) {
      this.IsTypeOfVehicle = true
    } else {
      this.IsTypeOfVehicle = true
    }

  }

  OnInsuarancecontinue() {
    console.log("dwefw")
    this.submitted3 = true;
    if (this.InsuaranceForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.log(this.InsuaranceForm.value);
    }

    else {
      alert("form invalid")
    }
  }
  // Questions Call ---end 


  ageCalculator() {
    if (this.ClaimForm.value.DOB) {
      const convertAge = new Date(this.ClaimForm.value.DOB);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }

    let datee = this.ClaimForm.get("Age")?.value;
   
    this.medicalForm.controls['Ages'].setValue(datee)
  }

  // ----------------------------------------------------------------------------------------------

  // Binding Values on selection to Next Form----Start
  OnGenderSelect(event: any) {

    let Gender = this.ClaimForm.get("Gender")?.value;
    this.medicalForm.controls['Genders'].setValue(Gender)
  }

 

  OnAilmentselect(event: any) {
    let Ailment = this.ClaimForm.get("Ailment")?.value;
    this.medicalForm.controls['Ailments'].setValue(Ailment)
  }

  onprocedureSelect(event: any){
    let procedureee = this.ClaimForm.get("Procedure")?.value;
    this.medicalForm.controls['Procedures'].setValue(procedureee)
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

  // Document Upload ----Start

  selectFile(event: any) {

    // if (event.target.files.length > 0) {
    //   const image = event.target.files[0];
    //   this.DocumentsForm.get('file1')?.setValue(image);
    // }

    this.selectedFiles = event.target.files;
  }



  upload() {

    // const formData = new FormData();
    // formData.append('file1', this.DocumentsForm.get('file1')?.value);

    // this.http.post("http://localhost:4200/uploadFile", formData, {
    //   reportProgress: true,
    //   observe: 'events'
    // }).subscribe(res => {
    //   window.open(`http://localhost:4200${res}`, "_blank")

    // },
    // )

    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.FileUploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.FileUploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            // this.currentFile = undefined;
          });

      }

      // this.selectedFiles = undefined;
    }
  }

  // Document Upload ----End









}



