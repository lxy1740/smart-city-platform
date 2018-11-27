import { NgModule } from '@angular/core';
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { AdminComponent } from './admin/admin.component';
import { RightComponent } from './right/right.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    SharedModule
  ],
  declarations: [AdminComponent, RightComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
]
})
export class UserModule { }