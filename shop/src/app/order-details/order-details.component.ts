import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../shared/services/order.service';
import { take } from 'rxjs/operators';
import { Order } from '../shared/models/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId: string;
  orderInfo: Order;
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if(this.orderId)
      this.orderService.get(this.orderId).valueChanges()
        .pipe(take(1))
        .subscribe((order: any) => this.orderInfo = order);
  }

}
