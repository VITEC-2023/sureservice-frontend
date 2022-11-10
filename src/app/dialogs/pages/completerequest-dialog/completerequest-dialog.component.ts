import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request/services/request.service';

@Component({
  selector: 'app-completerequest-dialog',
  templateUrl: './completerequest-dialog.component.html',
  styleUrls: ['./completerequest-dialog.component.css']
})
export class CompleterequestDialogComponent implements OnInit {

  done=false
  request:any

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.getRequest()
  }

  getCurrentRequestId(){
    let currentRequestId= localStorage.getItem('RequestId')
    if(currentRequestId){
      let RequestId = (JSON.parse(currentRequestId));
      return RequestId;
    }else return null
  }

  getRequest(){
    this.requestService.getRequestById(this.getCurrentRequestId()).subscribe( (response: any) => {
      this.request=response
    })
  }

  updateRequest() {
    this.request.done=true
    this.requestService.updateRequestById(this.getCurrentRequestId(),this.request).subscribe( (response: any) => {
      this.done=true
    })
  }
  
  reload(){
    window.location.reload()
  }

}
