import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule, MatCheckboxModule, MatSliderModule, MatSlideToggleModule} from '@angular/material';
import { AirComponent } from './air.component';
import { AirHomeComponent } from './air-home/air-home.component';
import { TheairreportComponent } from './theairreport/theairreport.component';

@NgModule({
    imports: [CommonModule,
              FormsModule,
              NgbModule,
              MatButtonModule,
              MatCheckboxModule,
              MatSliderModule,
              MatSlideToggleModule
    ],
    declarations: [
        AirComponent,
        AirHomeComponent,
        TheairreportComponent
],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class AirModule {}
