import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonserviceService } from 'src/app/service/commonservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,private commonservice:CommonserviceService) { }

  ngOnInit(): void {
  }


  redirect(){
    this.commonservice.redirecttoactivedashboard();
  }
}
