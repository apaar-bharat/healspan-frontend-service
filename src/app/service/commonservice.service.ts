import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  constructor(private router: Router) { }

  redirecttoactivedashboard(){
    let activeDashboard =  localStorage.getItem("usertype");
    if(activeDashboard== '2'){
      this.router.navigate(['hdashboard'])

    }else{
      this.router.navigate(['rdashboard'])
    }
  }
}
