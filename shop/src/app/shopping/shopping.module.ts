import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './components/check-out/checkout.component';
import { CheckoutSummaryComponent } from './components/checkout-summary/checkout-summary.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingFormComponent } from './components/shopping-form/shopping-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutSummaryComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShoppingCartComponent,
    ShoppingFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    MaterialModule
  ]
})
export class ShoppingModule { }
