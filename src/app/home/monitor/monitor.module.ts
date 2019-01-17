import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MonitorComponent } from './monitor.component';
import { MonitorRoutingModule } from './monitor-routing.module';


@NgModule({
    imports: [
        CommonModule,
        MonitorRoutingModule,

    ],
    declarations: [MonitorComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class MonitorModule { }
