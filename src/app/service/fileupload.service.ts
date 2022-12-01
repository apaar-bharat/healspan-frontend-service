import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import {  HttpRequest} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})


export class FileuploadService {

  apiurl = "dfddfdf";
  constructor(private http: HttpClient) { }


  // upload(formData: any) {
  //   return this.http.post(`${this.apiurl}`, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   }).pipe();
  // }

  // private getEventMessage(event: HttpEvent<any>, formData) {
  //   switch (event.type) {
  //     case HttpEventType.UploadProgress:
  //       return this.fileUploadProgress(event);

  //   }
  // }





  // different code
  // addUser( profileImage: File): Observable<any> {
  //   var formData: any = new FormData();

  //   formData.append('avatar', profileImage);
  //   return this.http
  //     .post('http://localhost:4000/api/create-user', formData, {
  //       reportProgress: true,
  //       observe: 'events',
  //     })
  //     .pipe(catchError(this.errorMgmt));
  // }


  // errorMgmt(error: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(() => {
  //     return errorMessage;
  //   });
  // }



 
  private baseUrl = 'http://192.168.15.20:8080';

 

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

}
