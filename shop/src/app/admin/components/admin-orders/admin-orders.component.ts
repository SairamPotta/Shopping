import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {

  orders$;
  constructor(orderService: OrderService) {
    this.orders$ = orderService.getOrders().snapshotChanges().pipe(map(
      changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    ));
  }

}
