import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { ThemonitorComponent } from './themonitor.component';

@NgModule({
  imports: [
    CommonModule,
    MonitorRoutingModule
  ],
  declarations: [
    ThemonitorComponent
  ]
})
export class MonitorModule { }
