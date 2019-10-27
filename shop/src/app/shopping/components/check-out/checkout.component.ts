import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart';


@Component({
  selector: 'app-check-out',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart$: Observable<ShoppingCart>; 

  constructor (private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }
}
