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
      this.healspandata = data["healspanlist"]
      this.hospitalData = data["hospitallist"]
      this.ClosedData = data["closeslist"]
      console.log("spa",this.spaData);
    })

  
  }

}
