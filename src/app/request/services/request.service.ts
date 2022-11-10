import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Api } from 'src/app/API/api';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  api = new Api()
  urlRequest='requests'
  urlEmployee='employees'
  
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

  getConfirmedRequest(confirm:boolean,employeeId: number, paid:boolean){
    return this.http.get(`${this.api.bakendLink()+this.urlRequest}/done/${confirm}/${employeeId}/${paid}`, this.httpOptions)
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

  getRequestById(id: number){
    return this.http.get(`${this.api.bakendLink()+this.urlRequest}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
    )
  }

  updateRequestById(id: any, item: Object){
    return this.http.put(`${this.api.bakendLink()+this.urlRequest}/${id}`,item,this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
