import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompleterequestDialogComponent } from 'src/app/dialogs/pages/completerequest-dialog/completerequest-dialog.component';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  done = false
  requestNotDone:Array<any> = []
  requestDone:Array<any> = []

  constructor(public requestService: RequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getByEmployeeId()
  }

  getCurrentUserId(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      let currentUser = (JSON.parse(currentUserString));
      return currentUser.id;
    }else return null
  }

  getAllConfirmedRequests(id: number){
    this.requestService.getConfirmedRequest(false,id,true).subscribe ((response: any) =>{
      this.requestNotDone=response;
    })
    this.requestService.getConfirmedRequest(true,id,true).subscribe ((response: any) =>{
      this.requestDone=response;
    })
  }

  getByEmployeeId(){
    this.requestService.getByEmployeeId(this.getCurrentUserId()).subscribe( (response: any) => {
      this.getAllConfirmedRequests(response.id)
    })
  }

  openDialog(id:number) {
    localStorage.setItem('RequestId', JSON.stringify(id));
    const dialogRef = this.dialog.open(CompleterequestDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
