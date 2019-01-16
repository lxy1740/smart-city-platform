import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule, MatCheckboxModule, MatSliderModule, MatSlideToggleModule} from '@angular/material';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { CoverComponent } from './cover/cover.component';
import { CalamityComponent } from './calamity/calamity.component';

import { LightComponent } from './light/light.component';
import { SecurityComponent } from './security/security.component';
import { TrafficComponent } from './traffic/traffic.component';
import { WaterComponent } from './water/water.component';
// import { AirComponent } from './air/air.component';
import { ElectricalComponent } from './electrical/electrical.component';
// import { LedComponent } from './led/led.component';
import { ThemonitorComponent } from './themonitor/themonitor.component';
import { AirModule } from './air/air.module';
import { LedModule } from './led/led.module';
import { LightModule } from './light/light.module';
import { MonitorModule } from './themonitor/monitor.module';
// import { AirHomeComponent } from './air/air-home/air-home.component';
// import { TheairreportComponent } from './air/theairreport/theairreport.component';


@NgModule({
    imports: [CommonModule, FormsModule, NgbModule, ApplicationRoutingModule,
        MatButtonModule, MatCheckboxModule, MatSliderModule, MatSlideToggleModule,
        AirModule, LedModule, LightModule, MonitorModule
    ],
    declarations: [
        ApplicationComponent,
        CoverComponent, CalamityComponent,
         // LightComponent,
        SecurityComponent,
        TrafficComponent, WaterComponent, // AirComponent,
        ElectricalComponent, // LedComponent,
        // ThemonitorComponent
],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class ApplicationModule { }
