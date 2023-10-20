import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { SharedMaterialModule } from './shared-material.module';
import { ViewHeaderComponent } from './components/view-header/view-header.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedMaterialModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedMaterialModule,
        TableComponent,
        ViewHeaderComponent
    ],
    declarations: [
      TableComponent,
      ViewHeaderComponent
    ]
})
export class SharedModule
{
}
