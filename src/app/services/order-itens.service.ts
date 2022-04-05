import {  Injectable} from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import 'rxjs';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class OrderItensService {

  private api_url: any;

  constructor(
    private utilService: UtilService,
    private http: HttpClient
  ) { 
    this.api_url = utilService.getUrl();
  }

  addInLot(data:any) {
    console.log(data)
    return this.http.post(this.api_url + 'ordersitens/lot',data);
  } 
}
