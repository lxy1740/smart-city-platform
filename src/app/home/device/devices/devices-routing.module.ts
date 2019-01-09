import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../../guard/auth-guard.service';
import { DevicesComponent } from './devices.component';
import { InstallLogComponent } from './install-log/install-log.component';
import { LineLogComponent } from './line-log/line-log.component';
import { DeviceChildComponent } from './device-child/device-child.component';
import { RealTimeComponent } from './real-time/real-time.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [

  {
        path: '',
        component: DevicesComponent,
        canActivate: [AuthGuard], // 登录权限
        children: [
          {
            path: '',
            children: [
              { path: '', redirectTo: 'devices', pathMatch: 'full' },
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
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
  declarations: []
})
export class DevicesRoutingModule { }
