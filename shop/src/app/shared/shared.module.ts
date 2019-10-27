import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { SortingPipe } from './pipe/sorting.pipe';
import { MaterialModule } from '../material.module';
import { FilterPipe } from './pipe/filter.pipe';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    SortingPipe,
    FilterPipe
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    SortingPipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
