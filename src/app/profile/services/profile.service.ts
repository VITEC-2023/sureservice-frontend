import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Api} from "../../API/api";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  api = new Api()
  urlClient='clients'
  urlEmployee='employees'
  urlRequest='requests'


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.getCurrentUser().token
    })
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(`Ann error occurred: ${error.error.message}`);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError('Something happened with request, please try again later');
  }

  getAll() {
    return this.http.get(this.api.bakendLink()+this.urlClient, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getCurrentUser(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      //console.log(`current user:' ${currentUserString}`)
      let currentUser = (JSON.parse(currentUserString));
      //console.log(currentUser)
      return currentUser;
    }else return null
  }

  getClient(id: any){
    return this.http.get(`${this.api.bakendLink()+this.urlClient}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getByEmployeeId(id: any) {
    return this.http.get(`${this.api.bakendLink()+this.urlEmployee}/users/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  createRequest(clientId:any,employeeId:any,item: object):Observable<object> {
    return this.http.post(`${this.api.bakendLink()+this.urlRequest}/${clientId}/${employeeId}`,item,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAllRequest() {
    return this.http.get(this.api.bakendLink()+this.urlRequest, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateProfile(id: number, item: object){
    if(this.getCurrentUser().roles[0]=='ROLE_EMPLOYEE'){
      return this.http.put(`${this.api.bakendLink()+this.urlEmployee}/${id}`,item,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
    }
    else{
      return this.http.put(`${this.api.bakendLink()+this.urlClient}/${id}`,item,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
    }
  }

}
