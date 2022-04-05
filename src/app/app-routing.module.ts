import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddOrderComponent } from './add-order/add-order.component'; 
import { OrderComponent } from './order/order.component';
const routes: Routes = [
  { path: 'add-orders', component: AddOrderComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
