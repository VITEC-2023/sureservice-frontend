import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { RegisterService } from '../../services/register.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userId = 0;
  floatLabelControl = new UntypedFormControl('employee');
  hide = true;
  hide2 = true;
  id: number = 0;

  registerForm: UntypedFormGroup = this.builder.group({
    name: ['', [Validators.required, Validators.maxLength(10)]],
    lastName: ['', [Validators.required, Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)]
    ],
    confirmPassword: ['', [Validators.required]],
    number: ['', [Validators.required,
    Validators.minLength(7),
    Validators.maxLength(7),
    Validators.pattern(/^9/)
    ]],
    typeUser: ['', Validators.required],
    typeService: ['', Validators.required],
  }, { validator: this.confirmedValidator('password', 'confirmPassword') });

  constructor(public builder: UntypedFormBuilder, public service: RegisterService, public router: Router) {}

  get name() {
    return this.registerForm.controls['name'];
  }
  get lastName() {
    return this.registerForm.controls['lastName'];
  }
  get email() {
    return this.registerForm.controls['email'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }
  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
  get number() {
    return this.registerForm.controls['number'];
  }
  get typeUser() {
    return this.registerForm.controls['typeUser'];
  }
  get typeService() {
    return this.registerForm.controls['typeService'];
  }

  async register() {
    const user = {
      email: this.email.value,
      password: this.password.value,
      roles: [
        this.typeUser.value
      ]
    };
    const employee = {
      name: this.name.value + " " + this.lastName.value,
      age: 0,
      phone: this.number.value.toString(),
      altphone: "-",
      urlToImage: "-",
      description: "-"
    }
    const client = {
      name: this.name.value + " " + this.lastName.value,
      age: 0,
      phone: this.number.value.toString(),
      altphone: "-",
      urlToImage: "-",
      address: "-",
      description: "-"
    }
    console.log(client)
    this.service.register(user).subscribe({
      next: (v: any) => {
        console.log(v.body)
        this.userId = v.body.id
        localStorage.setItem('accessToken', JSON.stringify(v.body.token));
        localStorage.setItem('currentUser', JSON.stringify(v.body));
      },
      error: (e) => console.error(e),
      complete: () => {
        if (this.typeUser.value == 'ROLE_EMPLOYEE') this.service.createEmployee(employee, this.userId, this.typeService.value).subscribe(a => { console.log(a) });
        else this.service.createClient(client, this.userId).subscribe(a => { console.log(a) });
        this.router.navigate(['/home']).then();
      }
    })
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors?.['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  /*addNewuser(){
    var role;
    if (this.registerForm.value.typeUser=="client"){
      role = "ROLE_CLIENT"
    }
    else{
      role = "ROLE_EMPLOYEE"
    }
    const User={
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      roles: [role]
    }
    const UserLogin={
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }
    this.authService.signUp(User).subscribe( (response: any) => {
      console.log('user added');
      this.authService.signIn(UserLogin).subscribe((result: any)=>{
        localStorage.setItem('accessToken', JSON.stringify(result.token));
        localStorage.setItem('currentUser', JSON.stringify(result));
        this.router.navigate(['configure']).then();
      })
    })
  }*/
}


