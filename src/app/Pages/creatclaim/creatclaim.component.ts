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
  dropdownSettings = {};
  dropdownList: any;
  selectedItems: any
  patientSave: any = {};
  medicalSave: any = {};
  InsuaranceSave: any = {};

 
  constructor(private fb: FormBuilder, private api: ApiService, private http: HttpClient,
    private httpClient: HttpClient, private route: ActivatedRoute) {
    this.minDateToFinish.subscribe((r: any) => {
      this.minDate = new Date(r);
    })
  }

  ngOnInit(): void {
    let stagename = this.route.snapshot.params['stagename'];
    this.ActiveStage = stagename
    nice_Select();
    verificationForm();
    this.todaysdate = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2) + "  " + (new Date().getHours()) + ":" + (new Date().getMinutes());
    console.log(this.todaysdate)

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

    this.bindDropdown();
    this.GetDocList();

    this.date = new Date().toISOString().slice(0, 10) + "  " + (new Date().getHours()) + ":" + (new Date().getMinutes());;
    console.log("helo", this.date)
    this.dropdownSettings = {

      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: 'Chọn All',
      unSelectAllText: 'Hủy chọn',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: 'Tìm kiếm',
      noDataAvailablePlaceholderText: 'Không có dữ liệu',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false

    };

    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];

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

        ClaimId: "",
        LoggedInuserId: 101,
        RoleId: 1,
        StageID: "1",
        StatusID: "1",
        PatientInfo: {
          FirstName: this.ClaimForm.value.Fname,
          MiddleName: this.ClaimForm.value.Mname,
          LastName: this.ClaimForm.value.Lname,
          PatientMobileNo: this.ClaimForm.value.MobileNo,
          PatientHospitalUHID: this.ClaimForm.value.PHUHID,
          Gender: this.ClaimForm.value.Gender,
          DateOfBirth: this.ClaimForm.value.DOB,
          Age: this.ClaimForm.value.Age,
          Stage: this.ClaimForm.value.Stage,
          DateOfAdmission: this.ClaimForm.value.DateOfAdmission,
          EstimatedDateOfDischarge: this.ClaimForm.value.DateOfDischarge,
          RoomCategoryID: this.ClaimForm.value.RoomCategory,
          CostPerDay: this.ClaimForm.value.CostPD,
          TotalRoomCost: this.ClaimForm.value.totalRC,
          OtherCosts: [
            { name: this.ClaimForm.value.OtherC, estimatedcost: this.ClaimForm.value.OtherCE, },

          ],
          ProcedureID: "1",
          InitalCostEstimate: "",
          EnhancementEstimate: "",
          DateOfDischarge: "",
          FinalBillAmount: "",
          ClaimedAmount: "",
          BillNumber: "",
          HospitalD: this.ClaimForm.value.HospitalName,
          AilmentID: "1",
          TotalBillAmount: this.ClaimForm.value.TotalBillAmount,
          ClaimAmount: this.ClaimForm.value.ClaimAmount,

        },
      }

      // this.claimsave["PatientInfo"].FirstName = this.ClaimForm.value.Fname;
      // this.claimsave["PatientInfo"].MiddleName = this.ClaimForm.value.Mname;
      // this.claimsave["PatientInfo"].LastName = this.ClaimForm.value.Lname;
      // this.claimsave["PatientInfo"].PatientMobileNo = this.ClaimForm.value.MobileNo;
      // this.claimsave["PatientInfo"].PatientHospitalUHID = this.ClaimForm.value.PHUHID;
      // this.claimsave["PatientInfo"].Gender = this.ClaimForm.value.Gender;
      // this.claimsave["PatientInfo"].DateOfBirth = this.ClaimForm.value.DOB;
      // this.claimsave["PatientInfo"].Age = this.ClaimForm.value.Age;
      // this.claimsave["PatientInfo"].Stage = this.ClaimForm.value.Stage;
      // this.claimsave["PatientInfo"].DateOfAdmission = this.ClaimForm.value.DateOfAdmission;
      // this.claimsave["PatientInfo"].EstimatedDateOfDischarge = this.ClaimForm.value.DateOfDischarge;
      // this.claimsave["PatientInfo"].RoomCategoryID = this.ClaimForm.value.RoomCategory;
      // this.claimsave["PatientInfo"].TotalRoomCost = this.ClaimForm.value.totalRC;
      // this.claimsave["PatientInfo"].OtherCosts.push({ "name": this.ClaimForm.value.OtherC, "estimatedcost": this.ClaimForm.value.OtherCE },);
      // this.claimsave["PatientInfo"].ProcedureID = this.ClaimForm.value.Procedure;
      // this.claimsave["PatientInfo"].InitalCostEstimate = this.ClaimForm.value.InitialCE;
      // // this.claimsave["PatientInfo"].EnhancementEstimate = this.ClaimForm.value.totalRC;
      // // this.claimsave["PatientInfo"].DateOfDischarge = this.ClaimForm.value.totalRC;
      // // this.claimsave["PatientInfo"].FinalBillAmount = this.ClaimForm.value.totalRC;
      // // this.claimsave["PatientInfo"].BillNumber = this.ClaimForm.value.totalRC;
      // this.claimsave["PatientInfo"].HospitalD = this.ClaimForm.value.HospitalName;
      // this.claimsave["PatientInfo"].ClaimedAmount = this.ClaimForm.value.ClaimAmount;


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
        ProcedureID: this.medicalForm.value.Procedures,
        SequentialQuestions: [
          {
            Question: this.medicalForm.value.Procedures,
            Answer: this.medicalForm.value.Procedures,
          },
          {
            Question: this.medicalForm.value.Procedures,
            Answer: this.medicalForm.value.Procedures,
          }
        ],
        TreatmentType: this.medicalForm.value.TreatmentType,
        ProvisionalDiagnosisID: this.medicalForm.value.Provisionaldiagnosis,
        SpecialityID: this.medicalForm.value.Speciality,
        DateOfFirstDiagnosis: this.medicalForm.value.Dateoffirstdiagnosis,
        PastHistoryOfChronicillness: [
          { ChronicillnessName: this.medicalForm.value.Pasthistoryofchronicillness, },

        ],
        NameoftheTreatingDoctor: this.medicalForm.value.Nameofthetreatingdoctor,
        DrResgistrationNumber: this.medicalForm.value.DrResgistrationnumber,
        QualificationOfTheTreatingDoctor: this.medicalForm.value.Qualificationofthetreatingdoctor,
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
        InsuranceCompanyID: this.InsuaranceForm.value.InsuranceCompany,
        TPAID: this.InsuaranceForm.value.TPA,
        TPAIDNo: this.InsuaranceForm.value.TPAID,
        RelationOfPatientWithPolicyHolderID: this.InsuaranceForm.value.RelationOPH,
        PolicyHolderName: this.InsuaranceForm.value.PolicyHolder,
        PolicyNumber: this.InsuaranceForm.value.PolicyNumber,
        GroupPolicy: this.InsuaranceForm.value.GroupPolicy,
        // Company/Corporate:,
        // ClaimID/PreauthNo:,
        // InitialApprovalAmount:this.InsuaranceForm.value.DrResgistrationnumber,
        // ApprovedEnhancementsAmount:this.InsuaranceForm.value.DrResgistrationnumber,
        // ApprovedAmount(AtDischarge):    

      }
      console.log("med", this.InsuaranceSave)
    }


    // this.claimsave["InsuranceInfo"].InsuranceCompanyID = this.ClaimForm.value.InsuranceCompany;
    // this.claimsave["InsuranceInfo"].TPAID = this.ClaimForm.value.TPA;
    // this.claimsave["InsuranceInfo"].TPAIDNo = this.ClaimForm.value.TPAID;
    // this.claimsave["InsuranceInfo"].RelationOfPatientWithPolicyHolderID = this.ClaimForm.value.RelationOPH;
    // this.claimsave["InsuranceInfo"].PolicyHolderName = this.ClaimForm.value.PolicyHolder;
    // this.claimsave["InsuranceInfo"].PolicyNumber = this.ClaimForm.value.PolicyNumber;
    // this.claimsave["InsuranceInfo"].GroupPolicy = this.ClaimForm.value.GroupPolicy;
    // this.claimsave["InsuranceInfo"]["Company/Corporate"] = this.ClaimForm.value.Company;
    // this.claimsave["InsuranceInfo"].ClaimID/PreauthNo = this.ClaimForm.value.Stage;
    // this.claimsave["InsuranceInfo"].InitialApprovalAmount = this.ClaimForm.value.DateOfAdmission;
    // this.claimsave["InsuranceInfo"].ApprovedEnhancementsAmount = this.ClaimForm.value.DateOfAdmission;
    // this.claimsave["InsuranceInfo"].InitialApprovalAmount = this.ClaimForm.value.DateOfAdmission;
    // this.claimsave["InsuranceInfo"].ApprovedAmount(AtDischarge) = this.ClaimForm.value.DateOfAdmission;


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
      this.RPADetail = data["Relation of patient with policy holder"]





      // console.log("sdsd", this.insuaranceCompanyDetail);
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
      this.DiagnosisDetail = data["diagnosis_master"]
    })

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



