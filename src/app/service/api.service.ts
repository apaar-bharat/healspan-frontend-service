import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
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
  
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.baseUrl}${path}`, { params })
  }
  
  getService(path: string):Observable<any> {
    // console.log('service call----->',path);
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
  }

 

  // post(path: string, body: Object = {},params: HttpParams = new HttpParams()): Observable<any> {
  //   return this.http.post(
  //     `${environment.baseUrl}${path}`,
  //     JSON.stringify(body),{params}
  //   ).pipe(catchError(this.formatErrors));
  // }

  delete(path:string,params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}${path}`,{params}
    ).pipe(catchError(this.formatErrors));
  }
}
