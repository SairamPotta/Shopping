import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.css']
})
export class CheckoutSummaryComponent implements OnInit {

  @Input('cart') cart: ShoppingCart; 
  constructor() { }

  ngOnInit() {
  }

}
