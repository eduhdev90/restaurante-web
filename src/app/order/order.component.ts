import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { OrdersService } from '../services/orders.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [MessageService]
})
export class OrderComponent implements OnInit {

  public lastOrders: any = [];
  
  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getOpen();


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

  finaly(id:any){
    var order_id = id;
    this.ordersService.send(order_id).subscribe(
      res =>{
        console.log(res);
      },err=>{
        console.log(err);
      }, () => {
        console.log("finalizada");
        this.messageService.add({severity:'info', summary:'Pedido pronto para retirada',  detail: "Pedido " + order_id});
        this.getOpen();
      }
    )
  }

}
