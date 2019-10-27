import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { map, switchMap } from 'rxjs/operators';
import { CategoryService } from '../shared/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../shared/models/product';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscribe: Subscription;
  category: string;
  cart: any;
  subscription: Subscription;
  searchKey;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService) {
    this.getProducts();
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  getProducts() {
    this.subscribe = this.productService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )).pipe(switchMap((products: any) => {
        this.products = products;
        return this.route.queryParamMap;
      })).subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      })
  }

  async ngOnInit() {
    this.subscribe = (await this.cartService.getCart()).subscribe(cart => {
      this.cart = new ShoppingCart(cart.key, cart.itemsMap);
    });
  }

  getResponse(event) {
    this.searchKey = event;
  }

}
