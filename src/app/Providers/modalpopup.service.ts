import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalpopupService {

  constructor(private dialog: MatDialog) { }
  openPopup<T>(component: any, data: any): MatDialogRef<any> {
    return this.dialog.open(component, {
      width: '550px',
      data: data,
      //disableClose: false
    });
  }

  closePopup(dialogRef: MatDialogRef<any>) {
    dialogRef.close('closed forcefully');
  }
}
