import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../guard/auth-guard.service';

const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'homepage', pathMatch: 'full' },
            { path: 'monitor', loadChildren: './monitor/monitor.module#MonitorModule' },
            { path: 'device', loadChildren: './device/device.module#DeviceModule' },
            { path: 'user', loadChildren: './user/user.module#UserModule' },
            { path: 'application', loadChildren: './application/application.module#ApplicationModule' },
            { path: 'airreport', loadChildren: './airreport/airreport.module#AirreportModule' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'homepage', loadChildren: './homepage/homepage.module#HomepageModule' },
            { path: 'led', loadChildren: './led-test/led.module#LedModule' },
            { path: 'strategy', loadChildren: './strategy/strategy.module#StrategyModule' },
            { path: 'issuedata', loadChildren: './issuedata/issuedata.module#IssuedataModule' },
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: home.routes.ts
@time: 2018 / 7 / 2 17: 18

*/

