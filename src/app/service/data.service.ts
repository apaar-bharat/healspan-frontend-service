import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private claimdetails_data = new BehaviorSubject([]);
  currentclaimdetails_data = this.claimdetails_data.asObservable();

  private user_data = new BehaviorSubject([]);
  currentuser_data = this.user_data.asObservable();

  private othercostdata = new BehaviorSubject([]);
  currentothercost_data = this.othercostdata.asObservable();

  constructor() { }

  updateclaimdetails_data(data: any) {
    this.claimdetails_data.next(data)
  }

  updatecurrentuser_data(data: any) {
    this.user_data.next(data)
  }

  updateothercostd_data(data: any) {
    this.othercostdata.next(data)
  }

}
