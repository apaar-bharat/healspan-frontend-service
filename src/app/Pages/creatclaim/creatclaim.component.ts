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


  constructor(private fb: FormBuilder, private api: ApiService, private http: HttpClient,
    private FileUploadService: FileuploadService) { }
  ClaimForm!: FormGroup; submitted = false; submitted2 = false; isEditable = false; ailmentList: any
  InsuaranceForm!: FormGroup;
  medicalForm!: FormGroup;
  DocumentsForm!: FormGroup;
  userId: number = 0;
  title: string = "";
  body: string = "";
  claimformData: Array<any> = [];
  isLinear = false;
  barWidth: string = "0%";

  selectedFiles!: FileList;
  progress = 0;
  message = '';
  currentFile!: File;
  fileInfos?: Observable<any>;


  ngOnInit(): void {
    this.fileInfos = this.FileUploadService.getFiles();
    verificationForm();
    // //phoneNoselect();
    nice_Select();

    this.ClaimForm = this.fb.group({

      Fname: [null, Validators.required],
      Mname: [null, Validators.required],
      Lname: ['', Validators.required],
      Gender: ['', Validators.required],
      DOB: ['',],
      Age: ['', Validators.required],
      Stage: ['', Validators.required],
      patientprimaryInsured: [true, Validators.required],
      HospitalName: ['', Validators.required],
      DateOfAdmission: ['',],
      DateOfDischarge: ['',],
      Ailment: ['', Validators.required],
      TotalBillAmount: ['', Validators.required],
      ClaimAmount: ['', Validators.required],
    })

    this.medicalForm = this.fb.group({
      Ailments: ["",],
      TypeOfAccident: ["",],
      TreatmentType: ["",],
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

    this.BindDropdown()

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

  get I() { return this.InsuaranceForm.controls; }

  Oncontinue() {
    console.log("dfhbd")
    this.submitted = true;
    // if (this.ClaimForm.valid) {
    //   alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    //   console.table(this.ClaimForm.value);
    // }
    // else {
    //   alert("form invalid")
    // }

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
  Onmedicalcontinue() {

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

  OnBack() {

  }

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

   // this.currentFile = this.selectedFiles.item(0);
    this.FileUploadService.upload(this.currentFile).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.FileUploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        //this.currentFile = undefined;
      });
    //this.selectedFiles = undefined;
  }


}

// this.FileUploadService.addUser(

//   this.DocumentsForm.value.file1
// ).subscribe((event1: HttpEvent<any>) => {
//   switch (event1.type) {
//     case HttpEventType.Sent:
//       console.log('Request has been made!');
//       break;
//     case HttpEventType.ResponseHeader:
//       console.log('Response header has been received!');
//       break;
//     case HttpEventType.UploadProgress:
//       this.progress = Math.round(event.loaded / event1.total * 100);
//       console.log(`Uploaded! ${this.progress}%`);
//       break;
//     case HttpEventType.Response:
//       console.log('User successfully created!', event.body);
//       setTimeout(() => {
//         this.progress = 0;
//       }, 1500);
//   }
// })
// }


