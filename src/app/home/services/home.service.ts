import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Api} from "../../API/api";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

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

  getCurrentUser(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      //console.log(`current user:' ${currentUserString}`)
      let currentUser = (JSON.parse(currentUserString));
      //console.log(currentUser)
      return currentUser;
    }else return null
  }

  getAll() {
    return this.http.get(this.api.bakendLink()+this.urlRequest, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getById(id: any) {
    if(this.getCurrentUser().roles[0]=='ROLE_EMPLOYEE'){
      return this.http.get(`${this.api.bakendLink()+this.urlRequest}/employees/${id}`, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
    else{
      return this.http.get(`${this.api.bakendLink()+this.urlRequest}/clients/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
    }
  }

  getByEmployeeId(id: any) {
    return this.http.get(`${this.api.bakendLink()+this.urlEmployee}/users/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getByClientId(id: any) {
    return this.http.get(`${this.api.bakendLink()+this.urlClient}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteById(id: any) {
    return this.http.delete(`${this.api.bakendLink()+this.urlRequest}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateRequest(id: number, item: object){
    return this.http.put(`${this.api.bakendLink()+this.urlRequest}/${id}`,item,this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getByRequestById(id: any) {
    return this.http.get(this.api.bakendLink()+this.urlRequest+"/"+id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAllRequestByConfirmation(confirmation: boolean ,id: number){
    return this.http.get(`${this.api.bakendLink()+this.urlRequest}/confirmation/${confirmation}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getAllRequestByPaid(paid: boolean ,id: number){
    if(this.getCurrentUser().roles[0]=='ROLE_EMPLOYEE'){
      return this.http.get(`${this.api.bakendLink()+this.urlRequest}/paid/${paid}/employees/${id}`, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
    else{
      return this.http.get(`${this.api.bakendLink()+this.urlRequest}/paid/${paid}/clients/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
    }
  }
}
