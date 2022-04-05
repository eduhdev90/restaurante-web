import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {


  public now: Date = new Date();

  constructor() {
      setInterval(() => {
        this.now = new Date();
      }, 1);
  }

  ngOnInit(): void {
  }

}
