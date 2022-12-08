import { Component, OnInit } from '@angular/core';
import { CommonserviceService } from 'src/app/service/commonservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private commonservice:CommonserviceService) { }

  ngOnInit(): void {
  }

  redirect(){
    this.commonservice.redirecttoactivedashboard();
  }

}
