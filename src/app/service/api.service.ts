import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const httpOptions= {
  headers: new HttpHeaders({
 'Content-Type':'application/json',
//  'Access-Control-Allow-Origin': '*',
  // 'Authorization': `Bearer ${localStorage.getItem("jwttoken")}`
  // 'Authorization': 'Bearer ' + localStorage.getItem("token")
 })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private formatErrors(error: any) {
    return  throwError(() => error);
  }


  constructor(private http: HttpClient) { }
  

  
  getService(path: string):Observable<any> {
    return this.http.get(`${environment.baseUrl}${path}`, httpOptions).pipe(timeout(150000));
  }

  put(path: string, body: Object = {},params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}${path}`,
      JSON.stringify(body),{params}
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  postService(url: string, request: any){
    return this.http.post(url,request,httpOptions).pipe(timeout(150000));
  }

  loginpostService(url: string, request: any){
    const loginhttpOptions= {
      headers: new HttpHeaders({
     'Content-Type':'application/json'
     })
    };
    
    return this.http.post(url,request,loginhttpOptions).pipe(timeout(150000));
    // return this.http.post(url,request,loginhttpOptions).pipe(
    //   catchError(error => {
    //       let errorMsg: string;
    //       if (error.error instanceof ErrorEvent) {
    //           //this.errorMsg = `Error: ${error.error.message}`;
    //       } else {
    //           //this.errorMsg = this.getServerErrorMessage(error);
    //       }

    //       return throwError(()=>errorMsg);
    //   })
    // );
  }


  delete(path:string,params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}${path}`,{params}
    ).pipe(catchError(this.formatErrors));
  }



  getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}
}
