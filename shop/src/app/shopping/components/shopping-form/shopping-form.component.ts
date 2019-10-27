import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.css']
})
export class ShoppingFormComponent implements OnInit, OnDestroy {
  
  @Input('cart') cart: ShoppingCart;
  shipping: any = {}; 
  userSubscription: Subscription;
  userId: string;
  constructor(private router: Router,
              private authService: AuthService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key])
  }

}
