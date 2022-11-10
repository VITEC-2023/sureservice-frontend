import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request/services/request.service';

@Component({
  selector: 'app-employeework',
  templateUrl: './employeework.component.html',
  styleUrls: ['./employeework.component.css']
})
export class EmployeeworkComponent implements OnInit {

  informationRequest:Array<any>=[]
  displayedColumns: string[] = ['id','description'];

  constructor(private newService: RequestService) { }

  ngOnInit(): void {
    this.getData()
  }

  getCurrentemployeeId(){
    let currentItemData= localStorage.getItem('employeeId')
    if(currentItemData){
      let itemData = (JSON.parse(currentItemData));
      return itemData;
    }else return null
  }

  getData(){
    this.newService.getConfirmedRequest(true,this.getCurrentemployeeId(),true).subscribe ((response: any) =>{
      this.informationRequest=response;
    })
  }
}
