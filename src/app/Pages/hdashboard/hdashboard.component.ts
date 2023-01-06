import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { FilterPipe } from 'src/app/Shared/Pipes/filter.pipe';
@Component({
  selector: 'app-hdashboard',
  templateUrl: './hdashboard.component.html',
  styleUrls: ['./hdashboard.component.css']
})
export class HdashboardComponent implements OnInit {
  statusDetail: any;
  aprrovalDataList:any;
  pendingDataList:any;
  currentuserdata:any;
  LoggedInId:any;
  @ViewChild('modalChoice3') modalChoice3 :any;
  searchText:any="";
  constructor(private router: Router,private apiservice:ApiService,
    private dataservice : DataService) { }

  ngOnInit(): void {

   this.dataservice.currentuser_data.subscribe((res) =>{
    console.log("currentuserdata" + res);
    this.currentuserdata = res
   })

  this.GetData();
 
  }


  GetData(){
    let LoggedInId = localStorage.getItem("LoggedInId");
    this.apiservice.getService("healspan/claim/retrieveallclaimsofloggedinuser/"+LoggedInId).subscribe((data:any) =>{
    console.log("usersData",data)
      if(data["loggedInUserClaimData"]!= null){
      this.statusDetail = data["claimStageCount"];
      this.aprrovalDataList = data["loggedInUserClaimData"].filter((x:any)=>x.status == "Approved");
      this.pendingDataList = data["loggedInUserClaimData"].filter((x:any)=>x.status != "Approved");
      }
      
    },(err: HttpErrorResponse) => {
      console.log("HttpErrorResponse" + err.status);
      //alert("Something Went Wrong -" + err.status)       
    })
  }


  GotoClaim(stage:any,claimStageLinkId:number){
     //claimID:number new chnages use claimstagelinkid instad
      let url = '/createclaim/'+stage;
      this.apiservice.getService("healspan/claim/retrieveclaim/"+claimStageLinkId).subscribe((data: any) => {
        this.dataservice.updateclaimdetails_data(data);
        //this.router.navigate([url]);
        this.router.navigate(['viewclaim']);

      },(err: HttpErrorResponse) => {
        console.log("HttpErrorResponse" + err.status);
        //alert("Something Went Wrong -" + err.status)       
      })
  }

  Gotoroutes(path:any){
    const boxes = Array.from(
      document.getElementsByClassName('modal-backdrop') as HTMLCollectionOf<HTMLElement>,
    );
    
    boxes.forEach(box => {
      box.style.visibility = 'hidden';
      box.style.zIndex = '-999';
    });
    
    this.modalChoice3.nativeElement.click();
    // const boxes1 = Array.from(
    //   document.getElementsByClassName('show') as HTMLCollectionOf<HTMLElement>,
    // );
    
    // boxes1.forEach(box => {
    //   box.style.display = 'none';
    // });
    let currentUrl = '/createclaim/'+path;
    this.router.navigate([currentUrl]); 
  //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
  //     this.router.navigate([currentUrl]);
  //  });
    

  }


}
