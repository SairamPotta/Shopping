import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orders$;

  constructor(orderService: OrderService, authService: AuthService) {
    this.orders$ = authService.user$.pipe(switchMap(user => {
      return orderService.getOrderByUser(user.uid).snapshotChanges()
        .pipe(map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()}))));
    }));
  }
}
