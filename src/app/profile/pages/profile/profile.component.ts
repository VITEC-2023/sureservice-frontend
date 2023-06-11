import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import {Router} from "@angular/router";
import { Client } from '../../../model/client';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  edit=false;
  client:Client= new Client();
  itemData: Client = new Client();

  profileForm :UntypedFormGroup= this.builder.group({
    number: ['', {validators: [Validators.pattern('^[0-9]*$'), Validators.maxLength(9),Validators.minLength(9)], updateOn: 'change'}],
    altnumber: ['', {validators: [Validators.pattern('^[0-9]*$'), Validators.maxLength(5),Validators.minLength(5)], updateOn: 'change'}],
    description: ['', {validators: [Validators.maxLength(1000)], updateOn: 'change'}],
    adress: ['', {validators: [Validators.maxLength(500)], updateOn: 'change'}],
    urlToImage: ['', {validators: Validators.maxLength(500)}],
    name: ['', {validators: [Validators.maxLength(30),Validators.minLength(6)], updateOn: 'change'}]
  });

  constructor(public builder: UntypedFormBuilder, private newProfileService: ProfileService, public router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProfiles();
  }

  openSnackBar(){
    this._snackBar.open("Perfil actualizado correctamente", "Cerrar");
  }

  get urlToImage() { return this.profileForm.get('urlToImage');}

  get number() { return this.profileForm.get('number');}

  get altnumber() { return this.profileForm.get('altnumber'); }

  get description() { return this.profileForm.get('description'); }

  get adress() { return this.profileForm.get('adress'); }

  get name() { return this.profileForm.get('name');}

  getCurrentUserId(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      let currentUser = (JSON.parse(currentUserString));
      return currentUser.id;
    }else return null
  }

  getProfiles() {
    this.newProfileService.getClient(this.getCurrentUserId()).subscribe( (response: any) => {
      this.client = response;
    })
  }

  UpdateProfile() {
    this.itemData = this.client
    this.itemData.id = this.client.id;
    this.itemData.age = this.client.age;

    if(this.profileForm.value.name==""){
      this.itemData.name = this.client.name;
    }else{
      this.itemData.name = this.profileForm.value.name;
    }

    if(this.profileForm.value.number==""){
      this.itemData.phone = this.client.phone;
    }else{
      this.itemData.phone = this.profileForm.value.number;
    }

    if(this.profileForm.value.altnumber==""){
      this.itemData.altphone = this.client.altphone;
    }else{
      this.itemData.altphone = this.profileForm.value.altnumber;
    }

    if(this.profileForm.value.adress==""){
      this.itemData.address = this.client.address;
    }else{
      this.itemData.address = this.profileForm.value.adress;
    }

    if(this.profileForm.value.description==""){
      this.itemData.description = this.client.description;
    }else{
      this.itemData.description = this.profileForm.value.description;
    }

    if(this.profileForm.value.urlToImage==""){
      this.itemData.urlToImage = this.client.urlToImage;
    }else{
      this.itemData.urlToImage = this.profileForm.value.urlToImage;
    }

    this.newProfileService.updateProfile(this.itemData.id,this.itemData).subscribe( (response: any) => {
    })
    this.itemData = new Client();
    this.edit=!this.edit
    this.openSnackBar()
  }
}
