import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input() category: string;
  @Output() searchResponse = new EventEmitter<any>();

  constructor(private categoryService: CategoryService) {
    this.getCategories();
   }

  getCategories() {
    this.categories$ = this.categoryService.getAll().snapshotChanges().pipe(map(
      changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    ));
  }

  ngOnInit() {
  }

  SeacrhProducts(productKey) {
    this.searchResponse.emit(productKey);
  }

}
