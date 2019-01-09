import { NgModule } from '@angular/core';
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DevicerRoutingModule } from './device-routing.module';
import { DeviceComponent } from './device.component';
import { PositionComponent } from './position/position.component';
import { ProductComponent } from './product/product.component';
import { DevicesComponent } from './devices/devices.component';
import { AdministrationComponent } from './administration/administration.component';
import { RoadComponent } from './road/road.component';
import { InstallComponent } from './install/install.component';
// import { InstallLogComponent } from './devices/install-log/install-log.component';
// import { LineLogComponent } from './devices/line-log/line-log.component';
// import { DeviceChildComponent } from './devices/device-child/device-child.component';
// import { RealTimeComponent } from './devices/real-time/real-time.component';
// import { HistoryComponent } from './devices/history/history.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        DevicerRoutingModule,
        NgbModule.forRoot(),
    ],
    declarations: [
        DeviceComponent,
        PositionComponent,
        ProductComponent,
        DevicesComponent,
        AdministrationComponent,
        RoadComponent,
        InstallComponent,
        // InstallLogComponent,
        // LineLogComponent,
        // DeviceChildComponent,
        // RealTimeComponent,
        // HistoryComponent

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class DeviceModule { }
