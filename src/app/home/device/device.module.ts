import { NgModule } from '@angular/core';
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { PositionComponent } from './position/position.component';
import { ClassComponent } from './class/class.component';
import { ProductComponent } from './product/product.component';

import { FormsModule } from '@angular/forms';




@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        NgbModule
    ],
    declarations: [
        PositionComponent,
        ClassComponent,
        ProductComponent,

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class DeviceModule { }
