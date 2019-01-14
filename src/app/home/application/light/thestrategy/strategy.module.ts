import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatStepperModule, MatInputModule, MatCardModule, MatSliderModule, MatSlideToggleModule } from '@angular/material';


import { SharedModule } from '../../../../shared/shared.module';

import { ThestrategyRoutingModule } from './strategy-routing.module';
import { ThestrategyComponent } from './thestrategy.component';


@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule, ReactiveFormsModule,
        SharedModule,
        MatStepperModule, MatButtonModule, MatInputModule, MatCardModule,
        MatSliderModule, MatSlideToggleModule,
        ThestrategyRoutingModule
    ],
    declarations: [ThestrategyComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class ThestrategyModule { }
