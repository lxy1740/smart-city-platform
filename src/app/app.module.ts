import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GridsterModule } from 'angular-gridster2';
import { MaterialModule } from './material.module';

import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CookieModule } from 'ngx-cookie';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DeviceComponent } from './home/device/device.component';
import { UserComponent } from './home/user/user.component';
import { MonitorComponent } from './home/monitor/monitor.component';
import { ApplicationComponent } from './home/application/application.component';
import { EnergyComponent } from './home/energy/energy.component';


import { AppRoutingModule } from './app-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';


import { AuthGuard } from './guard/auth-guard.service';
import { AuthService } from './guard/auth.service';
import { WindowRef } from './windowserver';
import { DialogService } from './service/dialog.service';
import { BeiduAPIService } from './service/servers/baiduApi';
import { BeiduMAPService } from './service/servers/baiduMap';
import { MonitorService } from './service/monitor.service';
import { MessageService } from './service/message.service';
import { MessService } from './service/mess.service';
import { UrlService } from './service/url.service';

import { PageNotFoundComponent } from './not-found.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    DeviceComponent,
    UserComponent,
    MonitorComponent,
    ApplicationComponent,
    EnergyComponent


  ],
  imports: [
    NgbModule.forRoot(),
    HttpModule,
    CookieModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    GridsterModule,
    MaterialModule

  ],
  exports: [
  ],
  providers: [AuthGuard, AuthService, WindowRef, BeiduAPIService, BeiduMAPService, MonitorService,
    MessService, MessageService, UrlService],
  bootstrap: [AppComponent]
})
export class AppModule {
 // Diagnostic only: inspect router configuration
  // constructor(router: Router) {
  //   console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  // }
 }
