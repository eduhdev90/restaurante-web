import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public dockItems: MenuItem[] = [];
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.dockItems = [
      {
          label: 'Relizar Pedido',
          tooltipOptions: {
              tooltipLabel: "Relizar Pedido",
              tooltipPosition: 'top',
              positionTop: -15,
              positionLeft: 15
          },
          icon: "assets/images/icons8-add-48.png",
          command: () => {
            this.route.navigate(['/add-orders']); 
        }

      },
      {
        label: 'Pedidos',
        tooltipOptions: {
            tooltipLabel: "Ver Pedidos",
            tooltipPosition: 'top',
            positionTop: -15,
            positionLeft: 15
        },
        icon: "assets/images/icons8-list-64.png",
        command: () => {
          this.route.navigate(['/orders']); 
      }

    },
      {
        label: 'Pedidos Para retirada',
        tooltipOptions: {
            tooltipLabel: "Pedidos para retirada",
            tooltipPosition: 'top',
            positionTop: -15,
            positionLeft: 15
        },
        icon: "assets/images/icons8-product-64.png",
        command: () => {
          this.route.navigate(['/home']); 
      }

    },

  ];
  }

}
