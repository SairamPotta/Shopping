import { Component, Input } from '@angular/core';

import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppUser } from '../../models/app-user';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  appUser: AppUser;

  constructor(private cartService: ShoppingCartService, private _router: Router, private auth: AuthService) {
    this.auth.AppUser$.subscribe(appUser => this.appUser= appUser);
   }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  editProduct(product) {
    this._router.navigate(['/admin/products', product.key]);
  }
}
