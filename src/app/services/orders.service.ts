import {  Injectable} from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import 'rxjs';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private api_url: any;

  constructor(
    private utilService: UtilService,
    private http: HttpClient
  ) { 
    this.api_url = utilService.getUrl();
  }

  add(data:any) {
    console.log(data)
    return this.http.post(this.api_url + 'orders',data);
  } 

  send(order_id:any) {
    console.log(order_id)
    return this.http.get(this.api_url + 'orders/send/'+order_id);
  } 

  finaly(order_id:any) {
    console.log(order_id)
    return this.http.get(this.api_url + 'orders/finaly/'+order_id);
  } 

  getOpen() {
    return this.http.get(this.api_url + 'orders');
  } 

  getSend() {
    return this.http.get(this.api_url + 'orders/send');
  } 
}
