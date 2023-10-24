import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { SharedMaterialModule } from './shared-material.module';
import { ViewHeaderComponent } from './components/view-header/view-header.component';
import { FormFilterComponent } from './components/form-filter/form-filter.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedMaterialModule,
        NgxSpinnerModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedMaterialModule,
        TableComponent,
        ViewHeaderComponent,
        FormFilterComponent,
    ],
    declarations: [
        TableComponent,
        ViewHeaderComponent,
        FormFilterComponent,
    ]
})
export class SharedModule {
}
