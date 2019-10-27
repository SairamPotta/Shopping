import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { AppUser } from '../shared/models/app-user';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit{

  appUser: AppUser;
  shoppingCartCount: number;
  cart$: Observable<ShoppingCart>

  constructor(private auth: AuthService, 
              private cartService: ShoppingCartService) {
  }
              
  async ngOnInit() {
    this.auth.AppUser$.subscribe(appUser => this.appUser= appUser);
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();    
  }

}
