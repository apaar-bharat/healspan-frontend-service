import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const httpOptions= {
  headers: new HttpHeaders({
 'Content-Type':'application/json',
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
  
  getService(url: string):Observable<any> {
    console.log('service call----->',url);
    return this.http.get(url, httpOptions).pipe(timeout(150000));;
  }

  put(path: string, body: Object = {},params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}${path}`,
      JSON.stringify(body),{params}
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: FormData): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
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
