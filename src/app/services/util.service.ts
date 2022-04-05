import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public url = 1;

  getUrl(){
    switch(this.url) { 
      case 1: { 
         return "http://localhost:8000/api/"
         break; 
      } 

      default: { 
         return "http://localhost:8000/api/"
         break; 
      } 
   } 
  }
}
