import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import {MatDialog} from '@angular/material/dialog';
import { CancelDialogComponent } from 'src/app/dialogs/pages/cancel-dialog/cancel-dialog.component';
import { Employee } from 'src/app/model/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Request } from 'src/app/model/request';

@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.css']
})
export class HomeEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['title','description', 'clientId', 'serviceId', 'paid', 'price', 'buttons'];
  request:Array<any> = [];
  employee: Employee=new Employee();

  priceForm :FormGroup= this.builder.group({
    price: ['', {validators: [Validators.pattern('^[0-9]*$')], updateOn: 'change'}]
  });

  constructor(public builder: FormBuilder, private newHomeService: HomeService, public router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getByEmployeeId()
  }

  get price() { return this.priceForm.controls['price']}

  getCurrentUserId(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      let currentUser = (JSON.parse(currentUserString));
      return currentUser.id;
    }else return null
  }

  getAllRequests(id:any) {
    this.newHomeService.getAllRequestByPaid(false,id).subscribe( (response: any) => {
      this.request = response;
    })
  }

  getByEmployeeId(){
    this.newHomeService.getByEmployeeId(this.getCurrentUserId()).subscribe( (response: any) => {
      this.getAllRequests(response.id)
    })
  }

  openDialog(id:number) {
    localStorage.setItem('RequestId', JSON.stringify(id));
    const dialogRef = this.dialog.open(CancelDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  updatePrice(item: Request){
    if(this.priceForm.value.price==""){
      item.price=0
    }
    else item.price=this.priceForm.value.price
    this.newHomeService.updateRequest(item.id,item).subscribe( (response: any) => {
    })
  }

  changePrice(item: Request){
    item.price=0
    this.newHomeService.updateRequest(item.id,item).subscribe( (response: any) => {
    })
  }

  confirmation(item: Request){
    item.confirmation=true
    this.newHomeService.updateRequest(item.id,item).subscribe( (response: any) => {
    })
  }
}
