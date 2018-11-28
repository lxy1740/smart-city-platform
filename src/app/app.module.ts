import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CookieModule } from 'ngx-cookie';

import { ServiceModule } from './service/service.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './guard/auth-guard.service';
import { AuthService } from './guard/auth.service';
import { WindowRef } from './windowserver';

import { PageNotFoundComponent } from './not-found.component';

import { HttpClientModule } from '@angular/common/http'; // HTTP_INTERCEPTORS,
import { JwtModule } from '@auth0/angular-jwt';
import { httpInterceptorProviders } from './interceptor/index';

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    CookieModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServiceModule,
    SharedModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })

  ],
  exports: [],
  providers: [
    AuthGuard, AuthService, WindowRef, httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
 // Diagnostic only: inspect router configuration
  // constructor(router: Router) {
  //   console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  // }
 }
