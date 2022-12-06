import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  redirect(){
    let activeDashboard=sessionStorage.getItem("usertype");
    if(activeDashboard=='huser'){
      // alert("huser");
      this.router.navigate(['hdashboard'])

    }else{
      // alert("ruser");
      this.router.navigate(['rdashboard'])
    }
  }
}
