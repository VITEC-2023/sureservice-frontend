import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { Request } from 'src/app/model/request';

interface Card {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  itemData : Request= new Request();
  floatLabelControl = new UntypedFormControl('visa')
  selected = new UntypedFormControl(1)
  cards: Card[] = [
    {value: 'visa', viewValue: 'Visa'},
    {value: 'master', viewValue: 'MasterCard'},
    {value: 'bcp', viewValue: 'Banco de Crédito BCP'},
    {value: 'yape', viewValue: 'Yape'},
    {value: 'plin', viewValue: 'Plin'},
  ];
  showNext:boolean=false
  showDialog:boolean=false

  paymentForm :UntypedFormGroup= this.builder.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    lastname: ['', [Validators.required, Validators.minLength(6)]],
    dni: ['', {validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(8),Validators.minLength(8)], updateOn: 'change'}],
    numberCard: ['', {validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(16),Validators.minLength(16)], updateOn: 'change'}],
    csv: ['', {validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(3),Validators.minLength(3)], updateOn: 'change'}],
    date: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(6)]],
    type: this.floatLabelControl,
  });

  constructor(public builder: UntypedFormBuilder, private newPaymentService: PaymentService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.getRequest();
  }

  get name() { return this.paymentForm.controls['name'];}
  get lastname() { return this.paymentForm.controls['lastname'];}
  get dni() { return this.paymentForm.controls['dni'];}
  get numberCard() { return this.paymentForm.controls['numberCard'];}
  get csv() { return this.paymentForm.controls['csv'];}
  get date() { return this.paymentForm.controls['date'];}
  get address() { return this.paymentForm.controls['address'];}

  getRequest() {
    this.newPaymentService.getByRequestById(this.route.snapshot.paramMap.get('id')).subscribe( (response: any) => {
      this.itemData = response;
    })
  }

  updateRequest(){
    this.itemData.paid=true;
    this.newPaymentService.updateRequest(this.itemData.id,this.itemData).subscribe( (response: any) => {
    })
    this.router.navigate(['home']).then();
  }

}
