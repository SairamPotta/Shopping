import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/'+ cartId).snapshotChanges().pipe(map(
      x => {
        let val: any = x.payload.val();
        const key: string = x.payload.key;
        val = val ? val.items : null;
        return new ShoppingCart(key, val);
      }
    ));
  }

  addToCart(product: Product) {
    this.updateCart(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateCart(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-cart/'+ cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    })
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-cart/'+ cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateCart(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key)

    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      const val: any = item.payload.val();
      const quantity = ((val ? val.quantity : 0) || 0) + change;
      if(quantity === 0) item$.remove();
      else item$.update({ product: product, quantity: quantity });
    });
  }
}
