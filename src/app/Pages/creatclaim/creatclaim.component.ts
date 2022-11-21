import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


// declare function($: any);
declare function verificationForm():any;
//declare function phoneNoselect():any;
declare function nice_Select():any;

@Component({
  selector: 'app-creatclaim',
  templateUrl: './creatclaim.component.html',
  styleUrls: ['./creatclaim.component.css']
})
export class CreatclaimComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    verificationForm();
    //phoneNoselect();
    nice_Select();
  }

  
}
