import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, retry, catchError, Observable } from 'rxjs';
import {Api} from "../../API/api";

@Injectable({
  providedIn: 'root'
})
export class ConfigureregisterService {

  api = new Api()
  urlClients = 'clients'
  urlEmployees = 'employees'
  
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.getCurrentToken()
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

  getCurrentToken(){
    let currentTokenString= localStorage.getItem('accessToken')
    if(currentTokenString){
      let currentToken = (JSON.parse(currentTokenString));
      return currentToken;
    }else return null
  }

  createClient(item: object,id: any):Observable<object> {
    return this.http
      .post(`${this.api.bakendLink()+this.urlClients}/${id}`, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  createEmployee(item: object,userId: any,serviceId: any):Observable<object> {
    return this.http.post(`${this.api.bakendLink()+this.urlEmployees}/${userId}/${serviceId}`, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
