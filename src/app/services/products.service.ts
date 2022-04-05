import {  Injectable} from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import 'rxjs';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private api_url: any;

  constructor(
    private utilService: UtilService,
    private http: HttpClient
  ) { 
    this.api_url = utilService.getUrl();
  }

  getAll() {
    return this.http.get(this.api_url + 'products');
  } 
}
