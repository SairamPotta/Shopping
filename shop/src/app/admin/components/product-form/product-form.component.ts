import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { map, take } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product: any = {};
  id;

  constructor(
    private router: Router,
    private acRoute: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) {
    this.categories$ = categoryService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    )

    this.id = this.acRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);
    }
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  remove() {
    if(!confirm('Are you sure to delete this product ?')) return;

    this.productService.remove(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
