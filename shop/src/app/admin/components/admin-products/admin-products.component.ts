import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';

import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  products: Product[];
  filteredProducts: any[];
  subscribe: Subscription;
  displayedColumns: string[] = ['title', 'price', 'edit'];
  dataSource: any;
  

  constructor(private productServie: ProductService) {
    this.subscribe = this.productServie.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )).subscribe((products: any) => {
        this.dataSource = new MatTableDataSource<Product>(products);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (data, header) => data[header];
      });
   }

   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   ngOnDestroy() {
     this.subscribe.unsubscribe();
   }

  ngOnInit() {
  }

  ngOnChanges() {
    // this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // if(this.dataSource) {
    //   this.dataSource.paginator = this.paginator;
    //   console.log(this.dataSource);
    //   this.dataSource.sort = this.sort;
    //   // this.dataSource.sortingDataAccessor = (data, header) => data[header];
    // }
  }

}
