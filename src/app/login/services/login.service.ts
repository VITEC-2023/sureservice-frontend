import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";
import { Api } from "../../API/api";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api = new Api()
  url = 'users/auth'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`Ann error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  signIn(user: any) {
    return this.http
      .post(`${this.api.bakendLink() + this.url}/sign-in`, user)
      .pipe(retry(2), catchError(this.handleError));
  }

  login(object: any) {
    return this.http.post(this.api.bakendLink() + this.url + '/sign-in', object, this.httpOptions)
      .pipe(
        retry(2), catchError(this.handleError)
      );
  }
}
