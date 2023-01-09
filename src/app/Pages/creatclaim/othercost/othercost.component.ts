import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-othercost',
  templateUrl: './othercost.component.html',
  styleUrls: ['./othercost.component.css']
})
export class OthercostComponent implements OnInit {
  displayedColumns = ['name', 'value'];
  dataSource = new MatTableDataSource<Element>();
  OtherCostData:any = [];
  ELEMENT_DATA: Element[] = [];
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }
  @Output() OtherCostItemEvent = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<OthercostComponent>,
    private dataservice:DataService, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    //this.OtherCostData = this.data;
    //this.ELEMENT_DATA.push(this.data["data"]);
    this.ELEMENT_DATA = this.data["data"];

    this.dataSource =  new MatTableDataSource(this.ELEMENT_DATA);
    // this.OtherCostData = this.dataSource;
    // alert(JSON.stringify(this.OtherCostData));
  }

  numericOnly(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  }



  onClose(response: boolean) {
    // this.intervalPart.unsubscribe();
  
    this.OtherCostData = this.dataSource.data;
    console.log("OtherCostData",this.OtherCostData);

    this.dataservice.updateothercostd_data(this.OtherCostData);

    //localStorage.setItem("OtherCostData",this.OtherCostData);
    //this.OtherCostItemEvent.emit(this.dataSource.data);
    this.dialogRef.close(response);

  }
}

export interface Element {
  
  id: number;
  name: string;
  value:number
  //value:number;

}

// const ELEMENT_DATA: Element[] = [
//   {id:1,name: 'OT Charges',value: 0},
//   {id:2,name: 'Medicine',value: 0}
// ];