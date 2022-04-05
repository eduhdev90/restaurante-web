import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { OrdersService } from '../services/orders.service';
import { ProductsService } from '../services/products.service';
import { OrderItensService} from '../services/order-itens.service'
declare var $: any;

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  providers: [MessageService]
})
export class AddOrderComponent implements OnInit {

  public formOrder:any =  FormGroup ;
  public products:any = [];
  public orderItens:any = [];
  selectedProduct1:any ;
  resp:any ;
  display:boolean = false;
  total:any = 0;
  receivied:any = 0;
  change:any = 0;
  selectedProducts1:any = [];
  loading: boolean = true;


  constructor(
    private formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private orderItensService: OrderItensService
  ) { }

  ngOnInit(): void {
    this.createFormOrder();
    this.getAllProducts();
   
  }


   

    onRowSelect(event: any) {
      this.display = true;
      // this.messageService.add({severity:'info', summary:'Product Selected', detail: event.data.name});
      console.log(this.selectedProduct1)
      $("#qtd").val(0);
      $("#exampleModal").modal('show');
    }
    

    onRowUnselect(event: any) {
      for (var key in this.orderItens) {
        if (this.orderItens[key].product_id == event.data.id) {
          this.orderItens.splice(key, 1);
          this.messageService.add({severity:'info', summary:'Product Unselected',  detail: event.data.name});
        }
      }
    
    }

    clear(table:any) {
      table.clear();
  }
  
    setItemQtd(event: any){

      this.selectedProduct1.qtd = event.target.value;
      console.log(this.selectedProduct1)
    }

    cancel(){

      for (var key in this.orderItens) {
        if (this.orderItens[key].product_id == this.selectedProduct1.id) {
          this.orderItens.splice(key, 1);
        }
      }

      console.log(this.orderItens);
      $("#exampleModal").modal('hide');
    }

    confirm(){
      let item = {"product_id":this.selectedProduct1.id,"qtd": this.selectedProduct1.qtd}
      this.orderItens.push(item);
      console.log(this.orderItens);
      this.total = this.total + (this.selectedProduct1.price * this.selectedProduct1.qtd)

      this.messageService.add({severity:'info', summary:'Produto inserido',  detail: this.selectedProduct1.qtd +"-" +this.selectedProduct1.name});
      $("#exampleModal").modal('hide');
      // this.selectedProduct1 = null; 
    }
    
    calChange(){
      this.receivied = this.formOrder.value.received;
      this.change = this.receivied - this.total;
      this.formOrder.value.total = this.total;
      this.formOrder.value.change = this.change;
      console.log(this.formOrder.value)
    }


  // FORMS
  createFormOrder() {
    this.formOrder = this.formBuilder.group({
      client_name: "",
      total: [0, Validators.required],
      received: [0, Validators.required],
      change: [0, Validators.required],
      status: [1, Validators.required],
    });
    console.log(this.formOrder.value)
  }

  // GETS

  getAllProducts(){
      this.productsService.getAll().subscribe(
        res => {
          console.log(res);
            this.products = res;
            this.loading = false;
        }
      )
  }

  // POSTS

  addOrder(){
    this.ordersService.add(this.formOrder.value).subscribe(
      res => {
        console.log(res);
        this.resp = res;
      },err =>{
        this.messageService.add({severity:'danger', summary:'Erro ao inserir Produto',  detail: err});
      },() =>{
        for (var key in this.orderItens) {
          this.orderItens[key].order_id = this.resp.id ;
        }
        this.addOrderItens()
      }
    )
  }

  addOrderItens(){
    this.orderItensService.addInLot(this.orderItens).subscribe(
      res =>{
        console.log(res);
      },err => {
        console.log(err)
      },() => {
        console.log("finalizado");
        this.orderItens = [];
        this.createFormOrder();
        this.messageService.add({severity:'info', summary:'Pedido cirado',  detail: "Aguarde o preparo"});
      }
    )
  }

}
