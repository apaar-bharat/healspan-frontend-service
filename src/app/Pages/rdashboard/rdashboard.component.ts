import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-rdashboard',
  templateUrl: './rdashboard.component.html',
  styleUrls: ['./rdashboard.component.css']
})
export class RdashboardComponent implements OnInit {
  spaData:any;
  healspandata:any;
  hospitalData:any;
  ClosedData:any;
  constructor(private httpClient: HttpClient,) { }

  ngOnInit(): void {
    this.httpClient.get("assets/data/sla.json").subscribe((data:any) =>{
      // console.log("sdsd",data);
      this.spaData = data["statusdatalist"]
      console.log("spa",this.spaData);
    })

    this.httpClient.get("assets/data/sla.json").subscribe((data:any) =>{
      // console.log("sdsd",data);
      this.healspandata = data["healspanlist"]
      console.log("ere",this.healspandata);
    })

    this.httpClient.get("assets/data/sla.json").subscribe((data:any) =>{
      // console.log("sdsd",data);
      this.hospitalData = data["hospitallist"]
      console.log("trtr",this.hospitalData);
    })
    this.httpClient.get("assets/data/sla.json").subscribe((data:any) =>{
      // console.log("sdsd",data);
      this.ClosedData = data["closeslist"]
      console.log("j,k",this.ClosedData);
    })
  }

}
