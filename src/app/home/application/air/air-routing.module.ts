import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../guard/auth-guard.service';
import { AirComponent } from './air.component';
import { AirHomeComponent } from './air-home/air-home.component';
import { TheairreportComponent } from './theairreport/theairreport.component';

const routes: Routes = [

    {
      path: '',
        component: AirComponent,
        canActivate: [AuthGuard], // 登录权限
        children: [
          {
            path: '',
            children: [
              { path: '', redirectTo: 'cover', pathMatch: 'full' },
              { path: 'air-home', component: AirHomeComponent },
              { path: 'theairreport', component: TheairreportComponent }
            ]
          }
        ]
    }

  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AirRoutingModule { }
