import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Api} from "../../API/api";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  api = new Api()
  url = 'users'

  url2= 'users/auth'
  urlEmployee= 'employees'
  urlClient= 'clients'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(`Ann error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError( ()  => new Error('Something happened with request, please try again later'));
  }

  signUp(user: object){
    return this.http
      .post(`${this.api.bakendLink()+this.url}/auth/sign-up`, user)
      .pipe(retry(2), catchError(this.handleError));
  }

  signIn(user: object){
    return this.http
      .post(`${this.api.bakendLink()+this.url}/auth/sign-in`, user)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAll() {
    return this.http.get(this.api.bakendLink()+this.url, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  register(object: any){
    return this.http.post(this.api.bakendLink()+this.url2+'/sign-up',object,this.httpOptions)
    .pipe(
      retry(2), catchError(this.handleError)
    );
  }

  createClient(item: object,id: any):Observable<object> {
    return this.http.post(this.api.bakendLink()+this.urlClient+'/'+id, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
  }

  createEmployee(item: object,userId: any,serviceId: any):Observable<object> {
    return this.http.post(this.api.bakendLink()+this.urlEmployee+'/'+userId+'/'+serviceId, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
