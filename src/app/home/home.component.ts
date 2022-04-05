import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { OrdersService } from '../services/orders.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[MessageService]
})
export class HomeComponent implements OnInit {


  public lastOrders: any = [];
  public sendOrders: any = [];
  
  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getOpen();
    this.getSend();
  }

  getOpen(){
    this.ordersService.getOpen().subscribe(
      res => {
        console.log(res);
        this.lastOrders = res;
      },err =>{
        console.error(err)
      },() =>{
        console.log('FINALIZADA')
      }
    )
  }

  getSend(){
    this.ordersService.getSend().subscribe(
      res => {
        console.log(res);
        this.sendOrders = res;
      },err =>{
        console.error(err)
      },() =>{
        console.log('FINALIZADA')
      }
    )
  }

  finaly(id:any){
    var order_id = id;
    this.ordersService.finaly(order_id).subscribe(
      res =>{
        console.log(res);
      },err=>{
        console.log(err);
      }, () => {
        console.log("finalizada");
        this.messageService.add({severity:'info', summary:'Pedido finalizado',  detail: "Pedido " + order_id});
        this.getOpen();
        this.getSend();
      }
    )
  }
}
