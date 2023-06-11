import { Component } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public router: Router) {

  }

  getCurrentUserEmail(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      //console.log(`current user:' ${currentUserString}`)
      let currentUser = (JSON.parse(currentUserString));
      //console.log(currentUser)
      return currentUser.roles[0];
    }else return null
  }

  signOut(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('requestAlready');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']).then();
    console.log('Singout')
  }

  deleteRequest(){
    localStorage.removeItem('requestAlready');
  }


  title = 'SureService';
}
