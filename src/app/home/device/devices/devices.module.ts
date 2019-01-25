import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesRoutingModule } from './devices-routing.module';
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DevicesComponent } from './devices.component';
import { InstallLogComponent } from './install-log/install-log.component';
import { LineLogComponent } from './line-log/line-log.component';
import { HistoryComponent } from './history/history.component';
import { DeviceHomeComponent } from './device-home/device-home.component';
import { RealDataComponent } from './real-data/real-data.component';
import { HistoryDataComponent } from './history-data/history-data.component';
@NgModule({
  imports: [
    CommonModule,
    DevicesRoutingModule,
    FormsModule,
    SharedModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    DevicesComponent,
    InstallLogComponent,
    LineLogComponent,
    HistoryComponent,
    DeviceHomeComponent,
    RealDataComponent,
    HistoryDataComponent

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class DevicesModule { }
