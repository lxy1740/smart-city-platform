import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth-guard.service';
import { DeviceComponent } from './device.component';
import { PositionComponent } from './position/position.component';
import { DevicesComponent } from './devices/devices.component';
import { ProductComponent } from './product/product.component';
import { AdministrationComponent } from './administration/administration.component';
import { RoadComponent } from './road/road.component';
import { InstallComponent } from './install/install.component';

import { InstallLogComponent } from './devices/install-log/install-log.component';
import { LineLogComponent } from './devices/line-log/line-log.component';
import { DeviceChildComponent } from './devices/device-child/device-child.component';
import { RealTimeComponent } from './devices/real-time/real-time.component';
import { HistoryComponent } from './devices/history/history.component';

const routes: Routes = [

  {
        path: '',
        component: DeviceComponent,
        canActivate: [AuthGuard], // 登录权限
        children: [
          {
            path: '',
            children: [
              { path: '', redirectTo: 'position', pathMatch: 'full' },
              { path: 'position', component: PositionComponent },
              { path: 'devices', component: DevicesComponent },
              { path: 'product', component: ProductComponent },
              { path: 'administration', component: AdministrationComponent},
              { path: 'road', component: RoadComponent },
              { path: 'install', component: InstallComponent },
              { path: 'install-log', component: InstallLogComponent },
              { path: 'line-log', component: LineLogComponent },
              { path: 'device-child', component: DeviceChildComponent},
              { path: 'real-time', component: RealTimeComponent },
              { path: 'history', component: HistoryComponent },
            ]
          }
        ]

    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicerRoutingModule { }
