import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, retry, throwError} from "rxjs";
import {Api} from "../../API/api";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  api = new Api()
  urlRequest='requests'

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
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError('Something happened with request, please try again later');
  }

  getAll() {
    return this.http.get(this.api.bakendLink()+this.urlRequest, this.httpOptions)
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

  updateRequest(id: number, item: object){
    return this.http.put(`${this.api.bakendLink()+this.urlRequest}/${id}`,item,this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getCurrentToken(){
    let currentTokenString= localStorage.getItem('accessToken')
    if(currentTokenString){
      let currentToken = (JSON.parse(currentTokenString));
      return currentToken;
    }else return null
  }

}
