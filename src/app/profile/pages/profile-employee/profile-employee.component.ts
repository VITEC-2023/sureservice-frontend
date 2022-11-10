import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import {ActivatedRoute, Router} from "@angular/router";
import { Employee } from '../../../model/employee';
import { Client } from '../../../model/client';
import {MatDialog} from '@angular/material/dialog';
import { AddrequestDialogComponent } from 'src/app/dialogs/pages/addrequest-dialog/addrequest-dialog.component';
import { Service } from '../../../model/service';
import { EmployeeworkComponent } from 'src/app/dialogs/pages/employeework/employeework.component';

@Component({
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.component.html',
  styleUrls: ['./profile-employee.component.css']
})
export class ProfileEmployeeComponent implements OnInit {

  employee:Employee= new Employee();
  client: Client = new Client();
  requests:Array<any> = [];
  service: Service = new Service();

  constructor(private route: ActivatedRoute, private newProfileEService: ProfileService, public router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProfiles();
    this.getAllRequests();
    this.getCurrentUser();
  }

  getProfiles() {
    this.newProfileEService.getByEmployeeId(this.route.snapshot.paramMap.get('id')).subscribe( (response: any) => {
      this.employee = response;
    })
  }

  getAllRequests() {
    this.newProfileEService.getAllRequest().subscribe( (response: any) => {
      this.requests = response;
    })
  }

  getIfRequestAlreadyCreated(){
    let currentRequest= localStorage.getItem('requestAlready')
    if(currentRequest){
      let currentUser = (JSON.parse(currentRequest));
      return currentUser;
    }else return null
  }

  getCurrentUserId(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      let currentUser = (JSON.parse(currentUserString));
      return currentUser.id;
    }else return null
  }

  getCurrentUser(){
    this.newProfileEService.getClient(this.getCurrentUserId()).subscribe( (response: any) => {
      this.client= response;
    })
  }

  getCurrentRole(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      //console.log(`current user:' ${currentUserString}`)
      let currentUser = (JSON.parse(currentUserString));
      //console.log(currentUser)
      return currentUser.roles[0];
    }else return null
  }

  addNewRequest() {
    this.newProfileEService.getClient(this.getCurrentUserId()).subscribe( (response: any) => {
      this.newProfileEService.getByEmployeeId(this.route.snapshot.paramMap.get('id')).subscribe( (result: any) => {
        const request = {
          title: `Servicio de ${result.service.name}`,
          description: "",
          urlToImage: result.service.urlToImage,
          price: '0',
          paid: false,
        }
        localStorage.setItem('requestData', JSON.stringify(request));
        localStorage.setItem('clientId',JSON.stringify(response.id))
        localStorage.setItem('employeeId',JSON.stringify(result.id))
        const dialogRef = this.dialog.open(AddrequestDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
        });
      })
    })
  }

  return(){
    localStorage.removeItem('requestAlready');
  }

  openInformationDialog(id:number) {
    localStorage.setItem('employeeId', JSON.stringify(id));
    const dialogRef = this.dialog.open(EmployeeworkComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
