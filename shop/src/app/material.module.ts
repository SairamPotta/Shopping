import { NgModule } from '@angular/core';
import { MatSortModule, MatTableModule, MatPaginatorModule, MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule } from '@angular/material';

@NgModule({
    imports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule
    ],
    exports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule
    ]
})

export class MaterialModule {

}
