import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { HttpHeaders, HttpClient, HttpParams, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { catchError, map } from "rxjs/operators"
import { Subject, throwError } from 'rxjs';
import { ActivatedRoute, Route } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

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
 
  patientSave: any = {};
  medicalSave: any = {};
  InsuaranceSave: any = {};
  othercostarray: Array<number> = [];
  othercostheader: any;
  claimdata:any=[];
  constructor(private fb: FormBuilder, private api: ApiService, private http: HttpClient,
    private httpClient: HttpClient, private route: ActivatedRoute,private dataservice : DataService) {
    this.minDateToFinish.subscribe((r: any) => {
      this.minDate = new Date(r);
    })
  }

  ngOnInit(): void {
    let stagename = this.route.snapshot.params['stagename'];
    this.dataservice.currentclaimdetails_data.subscribe((res:any) =>{
        this.claimdata = res ;
        if(this.claimdata.length != 0){
          this.AssignFormControlValues(this.claimdata)
        }
         
    });
    //console.log("claim currentclaimdetails_data" ,this.claimdata)
   


    this.ActiveStage = stagename
    nice_Select();
    verificationForm();
    this.DefineFormControls();
    this.todaysdate = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2) + "  " + (new Date().getHours()) + ":" + (new Date().getMinutes());
    console.log(this.todaysdate)  
    this.bindDropdown();
    this.GetDocList();
    this.date = new Date().toISOString().slice(0, 10);
  }

  DefineFormControls(){
    this.ClaimForm = this.fb.group({

      Fname: [null, Validators.required],
      Mname: [null, Validators.required],
      Lname: ['', Validators.required],
      MobileNo: [['', Validators.required, Validators.maxLength(10)]],
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
      Diagnosis: ["",],
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

  }

  AssignFormControlValues(data:any){
  
    let patientInformationList = data.claimDetailsForStageList[0].patientInformationList;
    let patientMedicalInfoList = data.claimDetailsForStageList[0].patientMedicalInfoList;
    let patientInsuranceInfoList = data.claimDetailsForStageList[0].patientInsuranceInfoList;
    //alert(JSON.stringify(claimDetailsForStageList));

    this.ClaimForm.controls["Fname"].setValue(patientInformationList[0].firstName)
  }
  
  get f() { return this.ClaimForm.controls; }
  get M() { return this.medicalForm.controls; }
  get I() { return this.InsuaranceForm.controls; }

  changeDate() {
    this.dateSent = new Date(this.dateSent).getFullYear() + '-' + ('0' + new Date(this.dateSent).getMonth()).slice(-2) + '-' + ('0' + new Date(this.dateSent).getDate()).slice(-2);
    this.dateReceived = this.dateSent
  }


  OnPatientSubmit(formData: any) {
    console.log("", formData)
    this.submitted = true;


    if (this.ClaimForm.invalid) {
      alert('form invalid');

    }
    else {
      alert("form valid")
      this.patientSave = {

        userId: 2,
        claimDetailsForStageRequestDto: {
          claimStageId: 1,
          statusId: 1,
          claimedAmount: 25000,
          patientInformationDto: {
            statusId: 1,
            firstName: this.ClaimForm.value.Fname,
            middleName: this.ClaimForm.value.Mname,
            lastName: this.ClaimForm.value.Lname,
            mobileNumber: this.ClaimForm.value.MobileNo,
            uhidNumber: this.ClaimForm.value.PHUHID,
            gender: this.ClaimForm.value.Gender,
            dateOfBirth: this.ClaimForm.value.DOB,
            age: this.ClaimForm.value.Age,
            dateOfAdmission: this.ClaimForm.value.DateOfAdmission,
            dateOfDischarge: this.ClaimForm.value.DateOfDischarge,
            costPerDay: this.ClaimForm.value.CostPD,
            estimatedCost: this.ClaimForm.value.InitialCE,
            finalBillAmount: this.ClaimForm.value.TotalBillAmount,
            claimAmount: this.ClaimForm.value.ClaimAmount,
            billNumber: "",
            roomId: this.ClaimForm.value.RoomCategory,
            medicalProcedureId: "",
            patientOtherCostList: [{
              otherCostId: this.ClaimForm.value.OtherC,
              estimatedCost: this.ClaimForm.value.OtherCE,
            },
            {
              otherCostId: this.ClaimForm.value.OtherC,
              estimatedCost: this.ClaimForm.value.OtherCE,
            }],
            primaryInsured: this.ClaimForm.value.patientprimaryInsured,
          }
        }
      }
      console.log("qq", this.patientSave)

    }
  }


  onMedformSubmit(formData: any) {
    console.log("dfhbd", formData)
    this.submitted2 = true;
    if (this.medicalForm.invalid) {
      alert('form invalid');
      console.table(this.medicalForm.value);
    }
    else {
      alert("form valid and submitted")

      this.medicalSave = {
        userId: 2,
        claimId: 32,
        claimDetailsStageId: 12,
        patientMedicalInfoDto: {
          treatmentType: this.medicalForm.value.TreatmentType,
          firstDiagnosisDate: this.medicalForm.value.Dateoffirstdiagnosis,
          doctorName: this.medicalForm.value.Nameofthetreatingdoctor,
          doctorRegNumber: this.medicalForm.value.DrResgistrationnumber,
          docQualification: this.medicalForm.value.Qualificationofthetreatingdoctor,
          medicalProcedureId: this.medicalForm.value.Procedures,
          statusId: 1,
          diagnosisId: this.medicalForm.value.Diagnosis,
          diagnosisSpecialityId: this.medicalForm.value.Provisionaldiagnosis,
          sequentialQuestionsList: [],
          patientChronicIllnessList: [{
            chronicIllnessI: this.medicalForm.value.Pasthistoryofchronicillness,
          },
          {
            chronicIllnessId: this.medicalForm.value.Pasthistoryofchronicillness,
          }]
        }
      }


      console.log("med", this.medicalSave)
      // this.claimsave["MedicalInfo"].ProcedureID = this.ClaimForm.value.Fname;
      // this.claimsave["MedicalInfo"].SequentialQuestions.push({ "Question": this.ClaimForm.value.OtherC, "Answer": this.ClaimForm.value.OtherCE }, { "Question": this.ClaimForm.value.OtherC, "Answer": this.ClaimForm.value.OtherCE });
      // this.claimsave["MedicalInfo"].TreatmentType = this.ClaimForm.value.TreatmentType;
      // this.claimsave["MedicalInfo"].ProvisionalDiagnosisID = this.ClaimForm.value.Provisionaldiagnosis;
      // this.claimsave["MedicalInfo"].SpecialityID = this.ClaimForm.value.Speciality;
      // this.claimsave["MedicalInfo"].DateOfFirstDiagnosis = this.ClaimForm.value.Dateoffirstdiagnosis;
      // this.claimsave["MedicalInfo"].PastHistoryOfChronicillness.push({ ChronicillnessName: this.medicalForm.value.Pasthistoryofchronicillness },)
      // this.claimsave["MedicalInfo"].NameoftheTreatingDoctor = this.ClaimForm.value.Nameofthetreatingdoctor;
      // this.claimsave["MedicalInfo"].DrResgistrationNumber = this.ClaimForm.value.DrResgistrationnumber;
      // this.claimsave["MedicalInfo"].QualificationOfTheTreatingDoctor = this.ClaimForm.value.Qualificationofthetreatingdoctor;
      // console.log(this.claimsave)
      // console.log(this.medicalSave)

    }
  }

  OnInsuarancecontinue(formData: any) {
    console.log("dwefw", formData)
    this.submitted3 = true;
    if (this.InsuaranceForm.invalid) {
      alert('Form invalid');
      console.log(this.InsuaranceForm.value);
    }

    else {
      alert("form valid")
      this.InsuaranceSave = {

        userId: 2,
        claimId: 31,
        claimDetailsStageId: 11,
        patientInsuranceInfoDto: {
          tpaNumber: this.InsuaranceForm.value.TPAID,
          policyHolderName: this.InsuaranceForm.value.PolicyHolder,
          policyNumber: this.InsuaranceForm.value.PolicyNumber,
          groupCompanyName:  this.InsuaranceForm.value.GroupPolicy2,
          tpaClaimId: this.InsuaranceForm.value.TPA,
          initialApprovedAmount: 6000.0,
          enhancementApprovedAmount: 12000.0,
          dischargeApprovedAmount: 10000.0,
          statusId: 1,
          insuranceCompanyId: this.InsuaranceForm.value.InsuranceCompany,
          tpaId: 1,
          relationshipId: this.InsuaranceForm.value.RelationOPH,
          groupPolicy: this.InsuaranceForm.value.GroupPolicy,
        }

      }

    }
    console.log("ins", this.InsuaranceSave)
  }

  GetDocList() {

    this.api.getService("assets/data/doclist.json").subscribe((data: any) => {

      this.doclist = [];
      if (this.ActiveStage == "Inital") {
        this.doclist = data["Admission"];
        this.doclist1 = JSON.stringify(data["Admission"]);

      } else if (this.ActiveStage == "Discharge") {
        data["Admission"].forEach((element: any) => {
          this.doclist.push(element)
        });
        data["Discharge"].forEach((element: any) => {
          this.doclist.push(element)
        });
        console.log(this.doclist);

      } else if (this.ActiveStage == "FinalClaim") {
        data["Admission"].forEach((element: any) => {
          this.doclist.push(element)
        });
        data["Discharge"].forEach((element: any) => {
          this.doclist.push(element)
        });
        data["FinalClaim"].forEach((element: any) => {
          this.doclist.push(element)
        });
        console.log(this.doclist);
      }
    })

  }

  // ----For Sequential question-------------------
  OnClaimselect(event: any) {
    let Claimvalue = event.target.options[event.target.options.selectedIndex].text;

    this.api.getService("assets/data/admission.json").subscribe((data: any) => {
      this.admissiondata = data["Admission"];
      console.log("data", data);
      let Speciality = this.medicalForm.get("Speciality")?.value;
      let TreatmentType = this.medicalForm.get("TreatmentType")?.value;
      let Genders = this.medicalForm.get("Genders")?.value;
      let Ages = this.medicalForm.get("Ages")?.value;
      let Duration = this.medicalForm.get("Duration")?.value;
      let Claim = this.medicalForm.get("Claim")?.value;

      let restest = this.admissiondata.filter((element: any) => (element.Speciality == String(Speciality) && element.TreatmentType == String(TreatmentType) && element.Gender == String(Genders) && element.Age == String(Ages) && element.Durationofstay == String(Duration) && element.Claimvalue == String(Claimvalue)));
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

  OnTypeofAccident(event: any) {
    console.log(event.target.value);
  }

  OnPassengerType(event: any) {
  }

  //-----Start File Upload Logic ------------------------
  fileChange(event: any, id: any) {
    this.currentupload = id;
    alert('progress_' + id);
    const fileList: FileList = event.target.files;
    //check whether file is selected or not
    if (fileList.length > 0) {

      const file = fileList[0];
      //get file information such as name, size and type
      console.log('finfo', file.name, file.size, file.type);
      //max file size is 4 mb
      if ((file.size / 1048576) <= 50) {
        let formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('tz', new Date().toISOString())
        this.file_data = formData
        console.log(this.file_data);
        this.uploadAndProgressSingle(id);
      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }

    }

  }

  uploadAndProgressSingle(id: any) {
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

    this.api.getService("assets/data/picklist.json").subscribe((data: any) => {
      this.GenderDetail = data["GenderName"];
    })

    this.api.getService("assets/data/Masters.json").subscribe((data: any) => {
      this.insuaranceCompanyDetail = data["insurance_company_master"];
      this.roomsDetail = data["room_master"];
      this.TPADetail = data["tpa_master"];
      this.OtherCosts = data["other_cost_master"];
      this.procedureDetail = data["medical_procedure_master"];
      this.specialityDetail = data["diagnosis_speciality_master"];
      this.hospitalDetail = data["hospital_master"];
      this.chronicillnessDetail = data["cronic_illness_master"];
      this.DiagnosisDetail = data["diagnosis_master"];
      this.RPADetail = data["relationship_master"]

    })
    console.log("jj", this.RPADetail)
  }

  //---------Start Binding Values on selection to Next medical Form
  OnGenderSelect(event: any) {
    let Gender = this.ClaimForm.get("Gender")?.value;
    this.medicalForm.controls['Genders'].setValue(Gender)
  }
  // OnAilmentselect(event: any) {
  //   let Ailment = this.ClaimForm.get("Ailment")?.value;
  //   this.medicalForm.controls['Ailments'].setValue(Ailment)
  // }
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

  costSelect(event: any) {
    //this.othercostarray=[];
    console.log("event1", event.value)
    //console.log("event2",event.target.options[event.target.options.selectedIndex].text); 
    // if(event.value.length>0){
    //   // this.othercostarray.push(Number(event.value));
    //   console.log("event",event.value.toISOString())     
    // }
    this.othercostarray = event.value.map(function (items: any) {
      return { items }
    })
    this.othercostheader = [];
    //console.log("event3",this.othercostarray) ; 
    for (let i = 0; i < event.value.length; i++) {
      const cstvar = this.OtherCosts.filter((x: any) => x.id == event.value[i]);
      //
      this.othercostheader.push({
        "id": cstvar[0].id,
        "costType": cstvar[0].costType,
      });

    }
    console.log("OtherCosts", this.othercostheader);

  }




  onprocedureSelect(event: any) {
    //let procedureee = this.ClaimForm.get("Procedure")?.value;
    let procedureee = event.target.options[event.target.options.selectedIndex].text;
    this.medicalForm.controls['Procedures'].setValue(procedureee)
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


  

}



