import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorLogin=false;
  images=["../../../../assets/work1.svg","../../../../assets/work.svg","../../../../assets/work2.svg"];
  text=["Fully trained workers","Friendly environment","100% secure contracts"];
  number=0;
  logo=this.images[0];
  info=this.text[0];
  hide = true;

  loginForm :UntypedFormGroup= this.builder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(public builder: UntypedFormBuilder, public authService: LoginService, public router: Router) {

  }

  get email() { return this.loginForm.controls['email'];}
  get password() { return this.loginForm.controls['password'];}

  rightChange(){
    this.number++;
    if(this.number>this.images.length-1)this.number=0;
    this.logo=this.images[this.number];
    this.info=this.text[this.number];
  }

  leftChange(){
    this.number--;
    if(this.number<0)this.number=this.images.length-1;
    this.logo=this.images[this.number];
    this.info=this.text[this.number];
  }

  getCurrentUserType(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      /*console.log(`current user:' ${currentUserString}`)*/
      let currentUser = (JSON.parse(currentUserString));
      return currentUser.roles[0];
    }else return null
  }

  /*login(){
    const User={
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authService.signIn(User).subscribe(
      {
        next: (data:any) => {
          localStorage.setItem('accessToken', JSON.stringify(data.body.token));
          localStorage.setItem('currentUser', JSON.stringify(data.body));
          console.log(`${localStorage.getItem('accessToken')}`);
          console.log(data.body.tok);
        },
        error: () => {
          document.getElementById('errorLogin')!.style.display='block'
          document.getElementById('errorLogin')!.innerHTML="Incorrect email or password";
        },
        complete: () => {
          this.loginForm.reset();
          if(this.getCurrentUserType()=='ROLE_EMPLOYEE'){
            this.router.navigate(['homeemployee']).then();
          }
          else{
            this.router.navigate(['home']).then();
          }
        },
      }
    );
  }*/
  login(){
    const User={
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authService.signIn(User).subscribe((response: any) =>{
      localStorage.setItem('accessToken', JSON.stringify(response.token));
      localStorage.setItem('currentUser', JSON.stringify(response));
      this.loginForm.reset();
      /*console.log(`${localStorage.getItem('accessToken')}`);*/
      if(this.getCurrentUserType()=='ROLE_EMPLOYEE'){
        this.router.navigate(['homeemployee']).then();
      }
      else{
        this.router.navigate(['home']).then();
      }
    });
  }
}
